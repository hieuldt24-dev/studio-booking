"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations, Locale, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("vi"); // default to vi
  const router = useRouter();

  // Load language from localStorage/cookie on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Locale;
    if (savedLang === "vi" || savedLang === "en") {
      setLanguageState(savedLang);
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.startsWith("vi") ? "vi" : "en";
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  // Translation helper function with optional dynamic parameters replacement
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = translations[language];
    let val = dict[key] as string;
    
    if (!val) {
      // Fallback to Vietnamese if key is missing in active locale
      val = translations.vi[key] as string || String(key);
    }

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, String(v));
      });
    }

    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
