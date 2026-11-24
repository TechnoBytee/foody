import type { Recipe } from "@/data/types";

// Yemek adı araması: malzeme aramasından (src/services/ai.ts) tamamen ayrıdır.
// Malzemelere bakmaz; yalnızca yemek adı ve yemek meta verilerini tarar.
type Lang = "tr" | "en";

const fold: Record<string, string> = {
  ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
  â: "a", î: "i", û: "u",
};

export function normalizeDish(text: string): string {
  return text
    .replace(/[ıİşŞğĞüÜöÖçÇâîû]/g, (c) => fold[c])
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function distance(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const above = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = above;
    }
  }
  return dp[b.length];
}

function metaText(recipe: Recipe, lang: Lang): string {
  return [
    recipe.cuisine,
    ...(recipe.categories ?? []),
    ...(recipe.area ? [recipe.area[lang]] : []),
    ...(recipe.era ? [recipe.era[lang]] : []),
    ...(recipe.region ? [recipe.region[lang]] : []),
  ]
    .map(normalizeDish)
    .join(" ");
}

export function searchDishes(query: string, recipes: Recipe[], lang: Lang): Recipe[] {
  const terms = normalizeDish(query).split(" ").filter((t) => t.length > 1);
  if (terms.length === 0) return [];

  const scored: { recipe: Recipe; score: number }[] = [];
  for (const recipe of recipes) {
    const name = normalizeDish(recipe.name[lang]);
    const meta = metaText(recipe, lang);
    let score = 0;
    for (const term of terms) {
      if (name === term) score += 4;
      else if (name.includes(term)) score += 3;
      else if (meta.includes(term)) score += 1;
    }
    if (score === 0) continue;
    if (name.startsWith(terms.join(" "))) score += 2;
    scored.push({ recipe, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.recipe);
}

export function suggestSimilarDishes(query: string, recipes: Recipe[], lang: Lang): string[] {
  const q = normalizeDish(query);
  if (!q) return [];

  const scored = new Map<string, number>();
  for (const recipe of recipes) {
    const name = recipe.name[lang];
    const normalized = normalizeDish(name);
    let best = 1 - distance(q, normalized) / Math.max(q.length, normalized.length, 1);
    if (normalized.includes(q) || q.includes(normalized)) best = Math.max(best, 0.9);
    for (const word of normalized.split(" ")) {
      if (word.length < 2) continue;
      best = Math.max(best, 1 - distance(q, word) / Math.max(q.length, word.length));
    }
    if (best >= 0.55) scored.set(name, Math.max(scored.get(name) ?? 0, best));
  }
  return [...scored.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);
}
