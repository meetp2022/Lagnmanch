"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { AppIcon } from "@/components/LagnaManchLogo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, toggleLanguage, t } = useTranslation();
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="bg-maroon text-white shadow-md sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">

          {/* Logo: mandap icon + brand name */}
          <Link href="/" className="flex items-center gap-2 group">
            <AppIcon size={36} />
            <span className="text-lg md:text-xl font-bold tracking-tight leading-none">
              <span className="text-gold">Lagna</span>Manch
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-gold transition text-sm">{t.nav.home}</Link>
            <Link href="/browse" className="hover:text-gold transition text-sm">{t.nav.browse}</Link>
            <Link href="/about" className="hover:text-gold transition text-sm">{t.nav.about}</Link>
            <Link href="/contact" className="hover:text-gold transition text-sm">{t.nav.contact}</Link>

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

            {/* Auth buttons */}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="hover:text-gold transition text-sm font-medium"
                    >
                      {t.nav.dashboard}
                    </Link>
                    <button
                      onClick={signOut}
                      className="text-sm text-white/70 hover:text-gold transition"
                    >
                      {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hover:text-gold transition text-sm font-medium"
                    >
                      {t.nav.login}
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gold text-maroon px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition text-sm"
                    >
                      {t.nav.register}
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile: language toggle only (nav is handled by BottomNav) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-gold/20 border border-gold/40 rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gold/30 transition min-h-[36px]"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-gold font-bold" : "text-white/60"}>EN</span>
              <span className="text-white/40">|</span>
              <span className={locale === "gu" ? "text-gold font-bold" : "text-white/60"}>ગુજ</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
