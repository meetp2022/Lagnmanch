"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function SafetyPage() {
  const { t } = useTranslation();

  const tips = [
    { icon: "🔒", title: t.safety.tip1Title, desc: t.safety.tip1Desc },
    { icon: "👤", title: t.safety.tip2Title, desc: t.safety.tip2Desc },
    { icon: "📞", title: t.safety.tip3Title, desc: t.safety.tip3Desc },
    { icon: "🏠", title: t.safety.tip4Title, desc: t.safety.tip4Desc },
    { icon: "💰", title: t.safety.tip5Title, desc: t.safety.tip5Desc },
    { icon: "📸", title: t.safety.tip6Title, desc: t.safety.tip6Desc },
    { icon: "👨‍👩‍👧", title: t.safety.tip7Title, desc: t.safety.tip7Desc },
    { icon: "🚩", title: t.safety.tip8Title, desc: t.safety.tip8Desc },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-2">{t.safety.title}</h1>
      <p className="text-gray-600 mb-8">{t.safety.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {tips.map((tip, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{tip.icon}</span>
              <div>
                <h3 className="font-semibold text-maroon mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report section */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-red-800 mb-3">{t.safety.reportTitle}</h2>
        <p className="text-red-700 mb-4">{t.safety.reportDesc}</p>
        <Link
          href="/report-misuse"
          className="inline-block bg-maroon text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon-dark transition"
        >
          {t.safety.reportButton}
        </Link>
      </div>
    </div>
  );
}
