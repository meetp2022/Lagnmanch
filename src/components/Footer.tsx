"use client";

import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-maroon-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">
              <span className="text-gold">Lagna</span>Manch
            </h3>
            <p className="text-gray-300 text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/browse" className="hover:text-gold transition">{t.footer.browseProfiles}</Link></li>
              <li><Link href="/create-profile" className="hover:text-gold transition">{t.footer.createProfile}</Link></li>
              <li><Link href="/about" className="hover:text-gold transition">{t.footer.aboutUs}</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition">{t.footer.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-gold">{t.footer.communityFocus}</h4>
            <p className="text-gray-300 text-sm">
              {t.footer.communityDescription}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
