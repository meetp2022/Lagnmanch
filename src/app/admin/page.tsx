"use client";

import { useState } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import type { Profile, ProfileStatus } from "@/types/profile";

export default function AdminPage() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<ProfileStatus | "all">("pending");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [actionLoading, setActionLoading] = useState("");

  const filterLabels: Record<string, string> = {
    pending: t.admin.pending,
    approved: t.admin.approved,
    rejected: t.admin.rejected,
    all: t.admin.all,
  };

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthenticated(true);
    fetchProfiles("pending");
  }

  async function fetchProfiles(status: ProfileStatus | "all") {
    setLoading(true);
    setFilter(status);
    try {
      const statusParam = status === "all" ? "approved" : status;
      const res = await fetch(`/api/profiles?status=${statusParam}`);
      let data = await res.json();

      if (status === "all") {
        const [pendingRes, rejectedRes] = await Promise.all([
          fetch("/api/profiles?status=pending"),
          fetch("/api/profiles?status=rejected"),
        ]);
        const pending = await pendingRes.json();
        const rejected = await rejectedRes.json();
        data = [
          ...(Array.isArray(pending) ? pending : []),
          ...(Array.isArray(data) ? data : []),
          ...(Array.isArray(rejected) ? rejected : []),
        ];
      }

      setProfiles(Array.isArray(data) ? data : []);
    } catch {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: ProfileStatus) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ profile_status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to update");
        return;
      }

      fetchProfiles(filter);
      if (selectedProfile?.id === id) {
        const updated = await res.json().catch(() => null);
        if (updated) setSelectedProfile(updated);
        else setSelectedProfile(null);
      }
    } finally {
      setActionLoading("");
    }
  }

  async function deleteProfile(id: string) {
    if (!confirm(t.admin.confirmDelete)) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete");
        return;
      }

      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (selectedProfile?.id === id) setSelectedProfile(null);
    } finally {
      setActionLoading("");
    }
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-maroon mb-6 text-center">{t.admin.loginTitle}</h1>
          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.admin.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-maroon outline-none"
            />
            <button
              type="submit"
              className="w-full bg-maroon text-white py-2 rounded-lg font-semibold hover:bg-maroon-dark transition"
            >
              {t.admin.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-maroon">{t.admin.panelTitle}</h1>
        <button
          onClick={() => { setAuthenticated(false); setPassword(""); }}
          className="text-sm text-gray-500 hover:text-maroon"
        >
          {t.admin.logout}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["pending", "approved", "rejected", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => fetchProfiles(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              filter === s
                ? "bg-maroon text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filterLabels[s]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile list */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
            </div>
          ) : profiles.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500">
              {filterLabels[filter]} {t.admin.noProfiles}
            </div>
          ) : (
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                  className={`bg-white rounded-lg p-4 shadow-sm cursor-pointer border-2 transition ${
                    selectedProfile?.id === profile.id
                      ? "border-maroon"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden shrink-0">
                      {profile.photo_url ? (
                        <img src={profile.photo_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">N/A</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{profile.full_name}</p>
                      <p className="text-sm text-gray-500">
                        {profile.age} {t.common.years} &middot; {profile.gender === "Male" ? t.common.male : t.common.female} &middot; {profile.city}
                      </p>
                    </div>
                    <StatusBadge status={profile.profile_status} label={filterLabels[profile.profile_status]} />
                  </div>

                  {/* Quick actions */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    {profile.profile_status !== "approved" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(profile.id, "approved"); }}
                        disabled={actionLoading === profile.id}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        {t.admin.approve}
                      </button>
                    )}
                    {profile.profile_status !== "rejected" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); updateStatus(profile.id, "rejected"); }}
                        disabled={actionLoading === profile.id}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 disabled:opacity-50"
                      >
                        {t.admin.reject}
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }}
                      disabled={actionLoading === profile.id}
                      className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 disabled:opacity-50 ml-auto"
                    >
                      {t.admin.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile detail sidebar */}
        <div className="lg:col-span-1">
          {selectedProfile ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-bold text-maroon mb-4">{t.admin.profileDetails}</h2>
              {selectedProfile.photo_url && (
                <img
                  src={selectedProfile.photo_url}
                  alt={selectedProfile.full_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="space-y-2 text-sm">
                <DetailRow label={t.admin.name} value={selectedProfile.full_name} />
                <DetailRow label={t.admin.gender} value={selectedProfile.gender} />
                <DetailRow label={t.admin.age} value={`${selectedProfile.age} ${t.common.years}`} />
                <DetailRow label={t.admin.dob} value={selectedProfile.date_of_birth} />
                <DetailRow label={t.admin.city} value={selectedProfile.city} />
                <DetailRow label={t.admin.locationLabel} value={selectedProfile.current_location} />
                <DetailRow label={t.admin.education} value={selectedProfile.education} />
                <DetailRow label={t.admin.field} value={selectedProfile.field_of_study} />
                <DetailRow label={t.admin.occupation} value={selectedProfile.occupation} />
                <DetailRow label={t.admin.company} value={selectedProfile.company_or_business} />
                <DetailRow label={t.admin.income} value={selectedProfile.annual_income} />
                <DetailRow label={t.admin.family} value={selectedProfile.family_background} />
                <DetailRow label={t.admin.village} value={selectedProfile.native_village} />
                <DetailRow label={t.admin.father} value={selectedProfile.father_occupation} />
                <DetailRow label={t.admin.mother} value={selectedProfile.mother_occupation} />
                <DetailRow label={t.admin.siblings} value={selectedProfile.siblings_count?.toString()} />
                <DetailRow label={t.admin.phone} value={selectedProfile.phone_number} />
                <DetailRow label={t.admin.whatsapp} value={selectedProfile.whatsapp_number} />
                <DetailRow label={t.admin.prefAge} value={
                  selectedProfile.preferred_age_min || selectedProfile.preferred_age_max
                    ? `${selectedProfile.preferred_age_min || "—"} - ${selectedProfile.preferred_age_max || "—"}`
                    : null
                } />
                <DetailRow label={t.admin.prefLocation} value={selectedProfile.preferred_location} />
                <DetailRow label={t.admin.prefEducation} value={selectedProfile.preferred_education} />
                <DetailRow label={t.admin.status} value={filterLabels[selectedProfile.profile_status]} />
                <DetailRow label={t.admin.created} value={new Date(selectedProfile.created_at).toLocaleDateString()} />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
              {t.admin.selectProfile}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }: { status: ProfileStatus; label: string }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {label}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-24 shrink-0">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
