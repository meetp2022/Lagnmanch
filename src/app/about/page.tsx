"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-6">{t.about.title}</h1>

      <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
        <p>{t.about.intro}</p>
        <p>{t.about.tradition}</p>

        <h2 className="text-xl font-semibold text-maroon pt-4">{t.about.valuesTitle}</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>{t.about.value1Label}</strong> {t.about.value1}</li>
          <li><strong>{t.about.value2Label}</strong> {t.about.value2}</li>
          <li><strong>{t.about.value3Label}</strong> {t.about.value3}</li>
          <li><strong>{t.about.value4Label}</strong> {t.about.value4}</li>
        </ul>

        <h2 className="text-xl font-semibold text-maroon pt-4">{t.about.reachTitle}</h2>
        <p>{t.about.reach}</p>

        <div className="pt-6 text-center">
          <Link
            href="/create-profile"
            className="bg-maroon text-white px-8 py-3 rounded-lg font-semibold hover:bg-maroon-dark transition inline-block"
          >
            {t.about.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
