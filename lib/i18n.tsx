"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { Language, setLanguage } from "@/store/languageSlice";
import enTranslations from "@/locales/en/translations.json";
import psTranslations from "@/locales/ps/translations.json";
import drTranslations from "@/locales/dr/translations.json";

type Translations = typeof enTranslations;

interface I18nContextType {
  t: (key: string) => string;
  currentLanguage: Language;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  en: enTranslations,
  ps: psTranslations,
  dr: drTranslations,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const [isRTL, setIsRTL] = useState(false);

  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language;
      if (
        stored &&
        ["en", "ps", "dr"].includes(stored) &&
        stored !== currentLanguage
      ) {
        dispatch(setLanguage(stored));
      }
    }
  }, [dispatch, currentLanguage]);

  useEffect(() => {
    // Pashto and Dari are RTL languages
    const rtl = currentLanguage === "ps" || currentLanguage === "dr";
    setIsRTL(rtl);

    // Update document direction
    if (typeof document !== "undefined") {
      document.documentElement.dir = rtl ? "rtl" : "ltr";
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[currentLanguage];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ t, currentLanguage, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
