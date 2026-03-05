"use client";

import Link from "next/link";
import type { Profile } from "@/types/profile";
import { useTranslation } from "@/components/LanguageProvider";

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
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{profile.full_name}</h3>
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
