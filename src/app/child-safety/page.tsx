import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Safety Standards | LagnaManch",
  description:
    "LagnaManch child safety standards and policies against child sexual abuse and exploitation (CSAE).",
};

export default function ChildSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-maroon mb-2">
        Child Safety Standards
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        LagnaManch — Standards Against Child Sexual Abuse and Exploitation
        (CSAE)
      </p>

      <div className="space-y-8">
        {/* Zero Tolerance Policy */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Zero Tolerance Policy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            LagnaManch maintains a strict zero-tolerance policy towards child
            sexual abuse and exploitation (CSAE) in any form. Our platform is
            designed exclusively for adults aged 18 and above who are seeking
            matrimonial matches within the Kodi Patel community.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Any content, behavior, or activity that exploits or endangers minors
            is strictly prohibited and will result in immediate account
            termination and reporting to the appropriate authorities.
          </p>
        </section>

        {/* Age Requirement */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Age Requirement
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                All users must be <strong>18 years of age or older</strong> to
                register and use LagnaManch.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Date of birth is required during registration and is verified as
                part of our profile review process.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Accounts found to belong to individuals under 18 will be
                immediately suspended and deleted.
              </span>
            </li>
          </ul>
        </section>

        {/* Content Moderation */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Content Moderation
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Every profile submitted to LagnaManch undergoes manual review by our
            admin team before being published. This includes:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Verification of age eligibility (must be 18+)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Review of all profile photos and personal information
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Rejection of profiles containing inappropriate or harmful
                content
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Ongoing monitoring for policy violations after approval
              </span>
            </li>
          </ul>
        </section>

        {/* Prohibited Content */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Prohibited Content and Behavior
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            The following are strictly prohibited on LagnaManch:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <span>
                Any child sexual abuse material (CSAM) or content that sexualizes minors
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <span>
                Grooming behavior or attempts to contact minors
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <span>
                Sextortion, trafficking, or any form of exploitation involving
                minors
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <span>
                Sharing or soliciting images or information of minors for
                exploitative purposes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <span>
                Any content that promotes, glorifies, or facilitates child abuse
              </span>
            </li>
          </ul>
        </section>

        {/* Reporting */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Reporting Concerns
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you encounter any content or behavior on LagnaManch that you
            believe may involve the exploitation of a minor, please report it
            immediately through any of the following channels:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">1.</span>
              <span>
                <strong>In-app reporting:</strong> Use our{" "}
                <a
                  href="/report-misuse"
                  className="text-maroon underline hover:text-maroon/80"
                >
                  Report Misuse
                </a>{" "}
                page to submit a detailed report.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">2.</span>
              <span>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:lagnamanch@gmail.com"
                  className="text-maroon underline hover:text-maroon/80"
                >
                  lagnamanch@gmail.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">3.</span>
              <span>
                <strong>National authorities:</strong> We encourage reporting to
                NCMEC (CyberTipline), local law enforcement, or your national
                child protection agency.
              </span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            All reports are treated with the highest priority and
            confidentiality. We aim to respond to CSAE-related reports within 24
            hours.
          </p>
        </section>

        {/* Enforcement */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-maroon mb-4">
            Enforcement Actions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Upon identifying a violation of our child safety standards,
            LagnaManch will:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Immediately suspend and permanently ban the offending account
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Remove all offending content from the platform
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Report the incident to the relevant law enforcement authorities
                and child protection organizations (e.g., NCMEC CyberTipline)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-maroon font-bold mt-0.5">•</span>
              <span>
                Preserve relevant evidence for law enforcement as required by
                applicable law
              </span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-3">
            Report Child Safety Concerns
          </h2>
          <p className="text-red-700 mb-4">
            If you suspect any child exploitation or abuse, report it
            immediately. Your report could protect a child.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/report-misuse"
              className="inline-block bg-maroon text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon/90 transition"
            >
              Report on LagnaManch
            </a>
            <a
              href="mailto:lagnamanch@gmail.com"
              className="inline-block bg-white text-maroon border border-maroon px-6 py-2.5 rounded-lg font-semibold hover:bg-maroon/5 transition"
            >
              Email Us
            </a>
          </div>
        </section>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        Last updated: March 2026
      </p>
    </div>
  );
}
