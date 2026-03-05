"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function HomePage() {
  const { t } = useTranslation();

  const steps = [
    { step: "1", title: t.home.step1Title, desc: t.home.step1Desc },
    { step: "2", title: t.home.step2Title, desc: t.home.step2Desc },
    { step: "3", title: t.home.step3Title, desc: t.home.step3Desc },
    { step: "4", title: t.home.step4Title, desc: t.home.step4Desc },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-maroon text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gold">Lagn</span>Manch
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-2">
            {t.home.subtitle}
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {t.home.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-profile"
              className="bg-gold text-maroon px-8 py-3 rounded-lg text-lg font-bold hover:bg-yellow-400 transition"
            >
              {t.home.createProfile}
            </Link>
            <Link
              href="/browse"
              className="border-2 border-gold text-gold px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gold hover:text-maroon transition"
            >
              {t.home.browseProfiles}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-maroon mb-10">
            {t.home.whyChoose}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-maroon mb-3">
                {t.home.communityFocused}
              </h3>
              <p className="text-gray-600">
                {t.home.communityFocusedDesc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-maroon mb-3">
                {t.home.verifiedProfiles}
              </h3>
              <p className="text-gray-600">
                {t.home.verifiedProfilesDesc}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-maroon mb-3">
                {t.home.familyFriendly}
              </h3>
              <p className="text-gray-600">
                {t.home.familyFriendlyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-maroon mb-10">{t.home.howItWorks}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item) => (
              <div key={item.step} className="p-6">
                <div className="w-12 h-12 bg-maroon text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-maroon text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {t.home.ctaTitle}
          </h2>
          <p className="text-gray-300 mb-8">
            {t.home.ctaDescription}
          </p>
          <Link
            href="/create-profile"
            className="bg-gold text-maroon px-8 py-3 rounded-lg text-lg font-bold hover:bg-yellow-400 transition inline-block"
          >
            {t.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
