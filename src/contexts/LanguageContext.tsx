import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Language, translations, TranslationKeys } from "@/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const saved = localStorage.getItem("language");
  if (saved === "en" || saved === "fr") return saved;
  
  // Default to English
  return "en";
};

const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split(".");
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return path; // Return the key as fallback
    }
    result = result[key];
  }
  
  return typeof result === "string" ? result : path;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations[language], key);
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
