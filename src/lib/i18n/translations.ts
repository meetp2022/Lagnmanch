import { en } from "./en";
import { gu } from "./gu";

export type Locale = "en" | "gu";

export type TranslationKeys = typeof en;

export const translations: Record<Locale, TranslationKeys> = {
  en,
  gu,
};
