import type { Locale } from "@/i18n";

// Fotoğraf analizi istemci tarafında çalışır; tarif verisini import etmez.
// Gerçek model eklendiğinde yalnızca bu fonksiyonun gövdesi değişir.
export async function analyzeImage(_file: File, locale: Locale = "tr"): Promise<string[]> {
  const sample: Record<Locale, string[]> = {
    tr: ["yumurta", "domates", "biber", "soğan"],
    en: ["eggs", "tomatoes", "peppers", "onion"],
  };
  return new Promise((resolve) => setTimeout(() => resolve(sample[locale]), 1200));
}
