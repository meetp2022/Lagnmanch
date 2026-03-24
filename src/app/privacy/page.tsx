"use client";

import { useTranslation } from "@/components/LanguageProvider";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.privacy.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{t.privacy.lastUpdated}</p>

      <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.introTitle}</h2>
          <p>{t.privacy.introDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.collectTitle}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t.privacy.collect1}</li>
            <li>{t.privacy.collect2}</li>
            <li>{t.privacy.collect3}</li>
            <li>{t.privacy.collect4}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.useTitle}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t.privacy.use1}</li>
            <li>{t.privacy.use2}</li>
            <li>{t.privacy.use3}</li>
            <li>{t.privacy.use4}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.sharingTitle}</h2>
          <p>{t.privacy.sharingDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.securityTitle}</h2>
          <p>{t.privacy.securityDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.rightsTitle}</h2>
          <p>{t.privacy.rightsDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.thirdPartyTitle}</h2>
          <p className="mb-3">{t.privacy.thirdPartyDesc}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{t.privacy.thirdParty1}</li>
            <li>{t.privacy.thirdParty2}</li>
            <li>{t.privacy.thirdParty3}</li>
            <li>{t.privacy.thirdParty4}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.cookiesTitle}</h2>
          <p>{t.privacy.cookiesDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.childrenTitle}</h2>
          <p>{t.privacy.childrenDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.retentionTitle}</h2>
          <p>{t.privacy.retentionDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.changesTitle}</h2>
          <p>{t.privacy.changesDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-maroon mb-3">{t.privacy.contactTitle}</h2>
          <p>{t.privacy.contactDesc}</p>
        </section>
      </div>
    </div>
  );
}
