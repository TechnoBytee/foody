import tr from "./tr.json";
import en from "./en.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

const messages = { tr, en } as const;
export type Messages = typeof tr;

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.tr;
}
