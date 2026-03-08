"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { useTranslation } from "@/components/LanguageProvider";
import type { Profile } from "@/types/profile";

import { DISTRICT_LIST, DISTRICTS } from "@/lib/locations";


export default function BrowseProfilesPage() {
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, [gender, city, ageMin, ageMax]);

  async function fetchProfiles() {
    setLoading(true);
    const params = new URLSearchParams();
    if (gender) params.set("gender", gender);
    if (city && city !== "All") params.set("city", city);
    if (ageMin) params.set("age_min", ageMin);
    if (ageMax) params.set("age_max", ageMax);

    try {
      const res = await fetch(`/api/profiles?${params.toString()}`);
      const data = await res.json();
      setProfiles(Array.isArray(data) ? data : []);
    } catch {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.browse.title}</h1>
      <p className="text-gray-600 mb-8">{t.browse.subtitle}</p>

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
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">{t.browse.loading}</p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">{t.browse.noResults}</p>
          <p className="text-gray-400 mt-2">{t.browse.adjustFilters}</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{profiles.length} {t.browse.profilesFound}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
