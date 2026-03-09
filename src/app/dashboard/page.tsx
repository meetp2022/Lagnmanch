"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useTranslation } from "@/components/LanguageProvider";
import type { Profile } from "@/types/profile";

function DashboardContent() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const updated = searchParams.get("updated");
  const welcome = searchParams.get("welcome");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const res = await fetch("/api/profiles/me");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else if (res.status === 404) {
          setProfile(null);
        } else {
          setError("Failed to load profile");
        }
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">{t.dashboard.loading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-maroon">{t.dashboard.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-gray-600 hover:text-maroon border border-gray-300 px-4 py-2 rounded-lg hover:border-maroon transition"
        >
          {t.dashboard.logout}
        </button>
      </div>

      {/* Welcome message for new users */}
      {welcome && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 text-sm">
          {t.dashboard.welcomeMessage}
        </div>
      )}

      {/* Update success message */}
      {updated && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 text-sm">
          {t.dashboard.updateSuccess}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* No profile yet */}
      {!profile && !error && (
        <div className="bg-white p-10 rounded-xl shadow-sm text-center">
          <div className="w-20 h-20 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-maroon mb-2">{t.dashboard.noProfile}</h2>
          <p className="text-gray-600 mb-6">{t.dashboard.noProfileDesc}</p>
          <Link
            href="/create-profile"
            className="inline-block bg-maroon text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon-dark transition"
          >
            {t.dashboard.createProfile}
          </Link>
        </div>
      )}

      {/* Profile card */}
      {profile && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Status banner */}
          <div className="bg-cream px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[profile.profile_status]}`}>
                {t.dashboard.status[profile.profile_status]}
              </span>
              <span className="text-sm text-gray-500">
                {t.dashboard.createdOn} {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
            <Link
              href="/edit-profile"
              className="inline-flex items-center gap-2 text-sm font-medium text-maroon border border-maroon px-4 py-1.5 rounded-lg hover:bg-maroon hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t.dashboard.editProfile}
            </Link>
          </div>

          {/* Profile info */}
          <div className="p-6">
            <div className="flex items-start gap-6">
              {/* Photo */}
              {profile.photo_url ? (
                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 shrink-0">
                  <img src={profile.photo_url} alt={profile.full_name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-maroon/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-3xl font-bold text-maroon">
                    {profile.full_name.charAt(0)}
                  </span>
                </div>
              )}

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold text-maroon">{profile.full_name}</h2>
                <p className="text-gray-600 mt-1">
                  {profile.age} {t.common.years} · {profile.gender === "Male" ? t.common.male : t.common.female}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {profile.district && `${profile.district} · `}{profile.city} · {profile.current_location}
                </p>
              </div>
            </div>

            {/* Quick details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{t.profile.education}</span>
                <p className="text-gray-800 font-medium">{profile.education}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{t.profile.occupation}</span>
                <p className="text-gray-800 font-medium">{profile.occupation}</p>
              </div>
            </div>

            {/* Status messages */}
            {profile.profile_status === "pending" && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                {t.dashboard.pendingMessage}
              </div>
            )}
            {profile.profile_status === "rejected" && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {t.dashboard.rejectedMessage}
              </div>
            )}
            {profile.profile_status === "approved" && (
              <div className="mt-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                {t.dashboard.approvedMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-400">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
