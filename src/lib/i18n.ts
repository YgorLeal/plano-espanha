export const locales = ["pt", "es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
