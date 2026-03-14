"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";

interface SampleProfile {
  firstName: string;
  gender: "Male" | "Female";
  age: number;
  district: string;
  education: string;
  initials: string;
  bgColor: string;
}

const SAMPLE_PROFILES: SampleProfile[] = [
  {
    firstName: "Rahul",
    gender: "Male",
    age: 27,
    district: "Valsad",
    education: "B.E. (Mechanical)",
    initials: "R",
    bgColor: "bg-blue-500",
  },
  {
    firstName: "Priya",
    gender: "Female",
    age: 24,
    district: "Navsari",
    education: "B.Com",
    initials: "P",
    bgColor: "bg-pink-500",
  },
  {
    firstName: "Karan",
    gender: "Male",
    age: 29,
    district: "Surat",
    education: "MBA",
    initials: "K",
    bgColor: "bg-emerald-600",
  },
  {
    firstName: "Nisha",
    gender: "Female",
    age: 25,
    district: "Valsad",
    education: "B.Sc. (Nursing)",
    initials: "N",
    bgColor: "bg-purple-500",
  },
  {
    firstName: "Darshan",
    gender: "Male",
    age: 26,
    district: "Daman",
    education: "Diploma (IT)",
    initials: "D",
    bgColor: "bg-amber-600",
  },
  {
    firstName: "Komal",
    gender: "Female",
    age: 23,
    district: "Dadra & Nagar Haveli",
    education: "B.Ed.",
    initials: "K",
    bgColor: "bg-rose-500",
  },
];

function SampleProfileCard({
  profile,
  t,
}: {
  profile: SampleProfile;
  t: ReturnType<typeof useTranslation>["t"];
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full ${profile.bgColor} flex items-center justify-center`}
        >
          <span className="text-white text-4xl sm:text-5xl font-bold">
            {profile.initials}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">
          {profile.firstName} ****
        </h3>
        <div className="mt-1 space-y-1 text-sm text-gray-600">
          <p>
            {profile.age} {t.common.years} &middot;{" "}
            {profile.gender === "Male" ? t.common.male : t.common.female}
          </p>
          <p>{profile.district}</p>
          <p>{profile.education}</p>
        </div>
      </div>
    </div>
  );
}

export default function SampleProfilesSection() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (loading || user) return null;

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-maroon mb-3">
            {t.home.sampleProfilesTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.home.sampleProfilesSubtitle}
          </p>
        </div>

        <div className="relative">
          {/* Blurred profile cards grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 blur-[6px] select-none pointer-events-none"
            aria-hidden="true"
          >
            {SAMPLE_PROFILES.map((profile, i) => (
              <SampleProfileCard key={i} profile={profile} t={t} />
            ))}
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-10 text-center max-w-md mx-4">
              <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-maroon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-maroon mb-2">
                {t.home.sampleProfilesOverlayTitle}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.home.sampleProfilesOverlayDesc}
              </p>
              <Link
                href="/register"
                className="bg-gold text-maroon px-8 py-3 rounded-lg text-lg font-bold hover:bg-yellow-400 transition shadow-lg shadow-gold/20 inline-block"
              >
                {t.home.sampleProfilesCta}
              </Link>
              <p className="text-xs text-gray-400 mt-3">
                {t.home.sampleProfilesDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
