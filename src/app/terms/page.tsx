"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.terms.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{t.terms.lastUpdated}</p>

      <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.acceptanceTitle}</h2>
          <p>{t.terms.acceptanceDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.eligibilityTitle}</h2>
          <p>{t.terms.eligibilityDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.accountTitle}</h2>
          <p>{t.terms.accountDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.conductTitle}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t.terms.conduct1}</li>
            <li>{t.terms.conduct2}</li>
            <li>{t.terms.conduct3}</li>
            <li>{t.terms.conduct4}</li>
            <li>{t.terms.conduct5}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.profileTitle}</h2>
          <p>{t.terms.profileDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.terminationTitle}</h2>
          <p>{t.terms.terminationDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.disclaimerTitle}</h2>
          <p>{t.terms.disclaimerDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.terms.contactTitle}</h2>
          <p>{t.terms.contactDesc}</p>
        </section>
      </div>
    </div>
  );
}
