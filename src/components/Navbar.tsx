"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/components/LanguageProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, toggleLanguage, t } = useTranslation();

  return (
    <nav className="bg-maroon text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-gold">Lagn</span>Manch
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-gold transition">{t.nav.home}</Link>
            <Link href="/browse" className="hover:text-gold transition">{t.nav.browse}</Link>
            <Link href="/about" className="hover:text-gold transition">{t.nav.about}</Link>
            <Link href="/contact" className="hover:text-gold transition">{t.nav.contact}</Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-gold/20 border border-gold/40 rounded-full px-3 py-1 text-sm font-medium hover:bg-gold/30 transition"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-gold font-bold" : "text-white/60"}>EN</span>
              <span className="text-white/40">|</span>
              <span className={locale === "gu" ? "text-gold font-bold" : "text-white/60"}>ગુજ</span>
            </button>

            <Link
              href="/create-profile"
              className="bg-gold text-maroon px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              {t.nav.createProfile}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-gold/20 border border-gold/40 rounded-full px-2.5 py-1 text-xs font-medium hover:bg-gold/30 transition"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-gold font-bold" : "text-white/60"}>EN</span>
              <span className="text-white/40">|</span>
              <span className={locale === "gu" ? "text-gold font-bold" : "text-white/60"}>ગુજ</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2"
              aria-label={t.nav.toggleMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-gold">{t.nav.home}</Link>
            <Link href="/browse" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-gold">{t.nav.browse}</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-gold">{t.nav.about}</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-gold">{t.nav.contact}</Link>
            <Link
              href="/create-profile"
              onClick={() => setMenuOpen(false)}
              className="block bg-gold text-maroon px-4 py-2 rounded-lg font-semibold text-center hover:bg-yellow-400"
            >
              {t.nav.createProfile}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
