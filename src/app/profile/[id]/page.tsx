"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";
import type { Profile } from "@/types/profile";

export default function ProfileDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profiles/${params.id}`);
        if (!res.ok) throw new Error("Profile not found");
        const data = await res.json();
        setProfile(data);
      } catch {
        setError(t.profile.notFoundOrUnavailable);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">{error || t.profile.notFound}</p>
        <Link href="/browse" className="text-maroon font-semibold hover:underline mt-4 inline-block">
          {t.profile.backToBrowse}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/browse" className="text-maroon hover:underline text-sm mb-6 inline-block">
        &larr; {t.profile.backToBrowse}
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Photo */}
          <div className="md:w-1/3 bg-gray-100">
            {profile.photo_url ? (
              <img
                src={profile.photo_url}
                alt={profile.full_name}
                className="w-full h-80 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-80 md:h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-maroon mb-1">{profile.full_name}</h1>
            <p className="text-gray-500 mb-6">
              {profile.age} {t.common.years} &middot; {profile.gender === "Male" ? t.common.male : t.common.female} &middot; {profile.city}
            </p>

            <div className="space-y-6">
              <Section title={t.profile.educationCareer}>
                <Detail label={t.profile.education} value={profile.education} />
                <Detail label={t.profile.fieldOfStudy} value={profile.field_of_study} />
                <Detail label={t.profile.occupation} value={profile.occupation} />
                <Detail label={t.profile.companyBusiness} value={profile.company_or_business} />
                <Detail label={t.profile.annualIncome} value={profile.annual_income} />
              </Section>

              <Section title={t.profile.familyDetails}>
                <Detail label={t.profile.familyBackground} value={profile.family_background} />
                <Detail label={t.profile.nativeVillage} value={profile.native_village} />
                <Detail label={t.profile.fatherOccupation} value={profile.father_occupation} />
                <Detail label={t.profile.motherOccupation} value={profile.mother_occupation} />
                <Detail label={t.profile.siblings} value={profile.siblings_count?.toString()} />
              </Section>

              <Section title={t.profile.partnerPreferences}>
                <Detail
                  label={t.profile.preferredAge}
                  value={
                    profile.preferred_age_min || profile.preferred_age_max
                      ? `${profile.preferred_age_min || "—"} to ${profile.preferred_age_max || "—"} ${t.common.years}`
                      : null
                  }
                />
                <Detail label={t.profile.preferredLocation} value={profile.preferred_location} />
                <Detail label={t.profile.preferredEducation} value={profile.preferred_education} />
              </Section>

              <Section title={t.profile.contactInfo}>
                <Detail label={t.profile.phone} value={profile.phone_number} />
                <Detail label={t.profile.whatsapp} value={profile.whatsapp_number} />
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-maroon border-b border-gray-200 pb-1 mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-xs text-gray-500">{label}</span>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}
