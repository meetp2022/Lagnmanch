"use client";

import Link from "next/link";
import type { Profile } from "@/types/profile";
import { useTranslation } from "@/components/LanguageProvider";

const AVATAR_COLORS = [
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
  "from-cyan-400 to-blue-600",
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const { t } = useTranslation();

  return (
    <Link
      href={`/profile/${profile.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
    >
      <div className="aspect-[3/4] bg-gray-100 relative">
        {profile.photo_url ? (
          <img
            src={profile.photo_url}
            alt={profile.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${getAvatarColor(profile.full_name)}`}>
            <span className="text-5xl font-bold text-white/90">
              {profile.full_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-1">
          {profile.full_name}
          {profile.profile_status === "approved" && (
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          )}
        </h3>
        <div className="mt-1 space-y-1 text-sm text-gray-600">
          <p>{profile.age} {t.common.years} &middot; {profile.gender === "Male" ? t.common.male : t.common.female}</p>
          <p>{profile.city}</p>
          <p>{profile.education}</p>
          {profile.occupation && (
            <p className="text-maroon font-medium">{profile.occupation}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
