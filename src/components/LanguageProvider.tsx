"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Locale, type TranslationKeys } from "@/lib/i18n/translations";

type LanguageContextType = {
  locale: Locale;
  toggleLanguage: () => void;
  t: TranslationKeys;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lagnmanch-lang") as Locale | null;
    if (saved && (saved === "en" || saved === "gu")) {
      setLocale(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("lagnmanch-lang", locale);
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "gu" : "en"));
  }, []);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
