import en from "@/messages/en.json";
import zhCN from "@/messages/zh-CN.json";
import { getPublicEnv, type AppLocale } from "@/lib/env";
import { isValidLocale } from "@/lib/validators";

export const locales = ["zh-CN", "en"] as const;

const dictionaries = {
  "zh-CN": zhCN,
  en
};

export type Dictionary = typeof zhCN;

export function normalizeLocale(locale?: string): AppLocale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }

  return getPublicEnv().defaultLocale;
}

export function getDictionary(locale?: string): Dictionary {
  return dictionaries[normalizeLocale(locale)];
}
