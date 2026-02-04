import en from "./en.json";
import es from "./es.json";

export type Locale = "en" | "es";
export type Translations = typeof en;

const translations: Record<Locale, Translations> = {
  en,
  es,
};

export const getTranslations = (locale: Locale): Translations => {
  return translations[locale] ?? translations.en;
};
