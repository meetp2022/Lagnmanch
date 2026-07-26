"use client";

import { useEffect, useState, useRef } from "react";
import ProfileCard from "@/components/ProfileCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useTranslation } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import type { Profile } from "@/types/profile";

import { DISTRICT_LIST, DISTRICTS } from "@/lib/locations";


export default function BrowseProfilesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [education, setEducation] = useState("");
  const [income, setIncome] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [recentProfiles, setRecentProfiles] = useState<Profile[]>([]);
  const blockedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/profiles?limit=6&page=1")
      .then((res) => res.json())
      .then((data) => {
        const recent = Array.isArray(data.profiles) ? data.profiles : [];
        setRecentProfiles(recent);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/api/block")
        .then((res) => res.json())
        .then((ids: string[]) => {
          blockedIdsRef.current = new Set(ids);
        })
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    setPage(1);
    setProfiles([]);
    fetchProfiles(1, true);
  }, [gender, city, ageMin, ageMax, education, income]);

  async function fetchProfiles(pageNum: number, reset = false) {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    const params = new URLSearchParams();
    if (gender) params.set("gender", gender);
    if (city && city !== "All") params.set("city", city);
    if (education) params.set("education", education);
    if (income) params.set("income", income);
    if (ageMin) params.set("age_min", ageMin);
    if (ageMax) params.set("age_max", ageMax);
    params.set("page", pageNum.toString());
    params.set("limit", "20");

    try {
      const res = await fetch(`/api/profiles?${params.toString()}`);
      const data = await res.json();
      const newProfiles: Profile[] = Array.isArray(data.profiles) ? data.profiles : (Array.isArray(data) ? data : []);
      const filtered = newProfiles.filter((p) => !blockedIdsRef.current.has(p.user_id));
      setProfiles((prev) => reset ? filtered : [...prev, ...filtered]);
      setHasMore(data.hasMore ?? false);
      setTotal(data.total ?? filtered.length);
    } catch {
      if (reset) setProfiles([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProfiles(nextPage, false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.browse.title}</h1>
      <p className="text-gray-600 mb-8">{t.browse.subtitle}</p>

      {/* Recently Joined */}
      {recentProfiles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{t.browse.recentlyJoined}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {recentProfiles.map((profile) => (
              <div key={profile.id} className="min-w-[200px] max-w-[200px] flex-shrink-0">
                <ProfileCard profile={profile} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.gender}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
            >
              <option value="">{t.browse.all}</option>
              <option value="Male">{t.common.male}</option>
              <option value="Female">{t.common.female}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.district}</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
            >
              <option value="">{t.browse.all}</option>
              {DISTRICT_LIST.filter(d => d !== "Other").map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.ageMin}</label>
            <input
              type="number"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value)}
              placeholder="18"
              min="18"
              max="60"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.ageMax}</label>
            <input
              type="number"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value)}
              placeholder="60"
              min="18"
              max="60"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
            />
          </div>
        </div>

        {/* More Filters toggle */}
        <button
          type="button"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="mt-3 text-sm text-maroon font-medium hover:underline flex items-center gap-1"
        >
          {showMoreFilters ? t.browse.lessFilters : t.browse.moreFilters}
          <span className={`inline-block transition-transform ${showMoreFilters ? "rotate-180" : ""}`}>&#9662;</span>
        </button>

        {showMoreFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.education}</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
              >
                <option value="">{t.browse.all}</option>
                {["10th Pass","12th Pass","Diploma","Graduate","Post Graduate","ITI","B.E./B.Tech","M.E./M.Tech","B.Com","M.Com","BBA","MBA","B.Sc","M.Sc","PhD","Other"].map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.browse.income}</label>
              <select
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-maroon outline-none"
              >
                <option value="">{t.browse.all}</option>
                <option value="Below 2 Lakh">{t.income.below2}</option>
                <option value="2-5 Lakh">{t.income.twoToFive}</option>
                <option value="5-10 Lakh">{t.income.fiveToTen}</option>
                <option value="10-20 Lakh">{t.income.tenToTwenty}</option>
                <option value="20-50 Lakh">{t.income.twentyToFifty}</option>
                <option value="50 Lakh+">{t.income.fiftyPlus}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">{t.browse.noResults}</p>
          <p className="text-gray-400 mt-2">{t.browse.adjustFilters}</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{total} {t.browse.profilesFound}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="bg-maroon text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon-dark transition disabled:opacity-50"
              >
                {loadingMore ? t.browse.loading : t.browse.loadMore}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
