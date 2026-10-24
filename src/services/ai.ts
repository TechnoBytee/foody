import { recipes, Recipe } from "@/data/recipes";
import type { Locale } from "@/i18n";

// AI soyutlama katmanı. API anahtarı eklendiğinde burada gerçek
// OpenAI/Gemini çağrıları yapılacak; şimdilik mock çalışır.

// kullanıcı malzemeyi hangi dilde yazdıysa o dildeki malzemelere bak
export async function suggestRecipes(
  ingredients: string[],
  query = "",
  locale: Locale = "tr"
): Promise<Recipe[]> {
  const terms = [...ingredients, query].join(" ").toLowerCase();
  const words = terms.split(/[\s,]+/).filter((t) => t.length > 2);
  const scored = recipes
    .map((r) => {
      const hits = r.ingredients[locale].filter((ing) =>
        words.some((t) => ing.toLowerCase().includes(t))
      ).length;
      return { r, hits };
    })
    .filter((s) => s.hits > 0 || !terms.trim())
    .sort((a, b) => b.hits - a.hits);
  return scored.slice(0, 6).map((s) => s.r);
}

// İki tarif arasında malzeme benzerliği (Jaccard)
function jaccardSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

// Bir tarifin alternatiflerini bul
// - Malzeme benzerliği >= 0.5 veya aynı cuisine
// - Kendisi hariç, en fazla 6 alternatif
export async function getAlternatives(
  recipe: Recipe,
  locale: Locale = "tr"
): Promise<Recipe[]> {
  const ings = recipe.ingredients[locale].map((s) => s.toLowerCase());
  const cuisineSlug = recipe.cuisine;
  const categories = recipe.categories ?? [];

  const scored = recipes
    .filter((r) => r.id !== recipe.id)
    .map((r) => {
      const otherIngs = r.ingredients[locale].map((s) => s.toLowerCase());
      const similarity = jaccardSimilarity(ings, otherIngs);
      const sameCuisine = r.cuisine === cuisineSlug;
      const sameCategory = categories.some((c) => r.categories?.includes(c));
      return { r, similarity, sameCuisine, sameCategory };
    })
    .filter(
      (s) =>
        s.similarity >= 0.5 ||
        s.sameCuisine ||
        s.sameCategory
    )
    .sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, 6).map((s) => s.r);
}

export async function analyzeImage(_file: File, locale: Locale = "tr"): Promise<string[]> {
  // Şimdilik örnek malzeme listesi döndürür, seçili dile göre
  const sample: Record<Locale, string[]> = {
    tr: ["yumurta", "domates", "biber", "soğan"],
    en: ["eggs", "tomatoes", "peppers", "onion"],
  };
  return new Promise((resolve) => setTimeout(() => resolve(sample[locale]), 1200));
}

export async function askAboutFood(query: string, locale: Locale = "tr"): Promise<string> {
  const results = await suggestRecipes([], query, locale);
  if (results.length === 0) {
    return locale === "tr"
      ? "Maalesef bu tarif için bir önerim yok. Malzemelerinizi yazarsanız yardımcı olabilirim."
      : "Sorry, I do not have a suggestion for that. Tell me your ingredients and I can help.";
  }
  return locale === "tr"
    ? `"${query}" için önerim: ${results[0].name.tr}. Alternatifler: ${results[0].alternatives.join(", ")}.`
    : `My suggestion for "${query}": ${results[0].name.en}. Alternatives: ${results[0].alternatives.join(", ")}.`;
}
