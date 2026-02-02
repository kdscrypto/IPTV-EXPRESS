import { en, TranslationKeys } from "./translations/en";
import { fr } from "./translations/fr";

export type Language = "en" | "fr";

export const translations: Record<Language, TranslationKeys> = {
  en,
  fr,
};

export type { TranslationKeys };
