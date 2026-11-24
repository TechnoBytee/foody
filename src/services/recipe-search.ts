import type { Recipe } from "@/data/types";

// Yemek adı araması: malzeme aramasından (src/services/ai.ts) tamamen ayrıdır.
// Malzemelere bakmaz; yalnızca yemek adı ve yemek meta verilerini tarar.
type Lang = "tr" | "en";

const MAX_QUERY = 80;

const ALIASES: Record<string, string[]> = {
  mercimek: ["lentil"], lentil: ["mercimek"],
  corba: ["soup", "corbasi"], corbasi: ["soup", "corba"], soup: ["corba", "corbasi"],
  yumurta: ["egg"], egg: ["yumurta"],
  domates: ["tomato"], tomato: ["domates"],
  sogan: ["onion"], onion: ["sogan"],
  pilav: ["rice", "pilaf"], rice: ["pilav"], pilaf: ["pilav"],
  tavuk: ["chicken"], chicken: ["tavuk"],
  balik: ["fish"], fish: ["balik"],
  et: ["meat"], meat: ["et"],
  un: ["flour"], flour: ["un"],
  seker: ["sugar"], sugar: ["seker"],
  tuz: ["salt"], salt: ["tuz"],
  su: ["water"], water: ["su"],
};

const fold: Record<string, string> = {
  ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
  â: "a", Â: "a", î: "i", Î: "i", û: "u", Û: "u",
};

export function normalizeDish(text: string): string {
  return text
    .replace(/[ıİşŞğĞüÜöÖçÇâÂîÎûÛ]/g, (c) => fold[c])
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

function termVariants(term: string): string[] {
  return [term, ...(ALIASES[term] ?? [])];
}

export function searchDishes(query: string, recipes: Recipe[], lang: Lang, limit = 8): Recipe[] {
  const terms = normalizeDish(query).slice(0, MAX_QUERY).split(" ").filter((t) => t.length > 1);
  if (terms.length === 0) return [];
  const normalizedQuery = normalizeDish(query).slice(0, MAX_QUERY);

  const scored: { recipe: Recipe; score: number; matches: number }[] = [];
  for (const recipe of recipes) {
    const name = normalizeDish(recipe.name[lang]);
    const meta = metaText(recipe, lang);
    let score = 0;
    let matches = 0;
    // Her sorgu terimi için en iyi eşleşme: AND mantığı, alias ile zayıf eşleşme yetmez.
    for (const term of terms) {
      let best = 0;
      for (const variant of termVariants(term)) {
        const hit = name === variant ? 4 : name.includes(variant) ? 3 : meta.includes(variant) ? 1 : 0;
        best = Math.max(best, hit);
      }
      if (best > 0) {
        matches++;
        score += best;
      }
    }
    if (matches < terms.length) continue;
    if (name.startsWith(normalizedQuery)) score += 2;
    scored.push({ recipe, score, matches });
  }
  return scored
    .sort((a, b) => b.score - a.score || b.matches - a.matches)
    .slice(0, limit)
    .map((s) => s.recipe);
}

export function suggestSimilarDishes(query: string, recipes: Recipe[], lang: Lang): string[] {
  const q = normalizeDish(query).slice(0, MAX_QUERY);
  if (!q) return [];

  const byId = new Map<string, { name: string; score: number }>();
  for (const recipe of recipes) {
    const name = recipe.name[lang];
    const normalized = normalizeDish(name);
    let best = 1 - distance(q, normalized) / Math.max(q.length, normalized.length, 1);
    if (normalized.includes(q) || q.includes(normalized)) best = Math.max(best, 0.9);
    for (const word of normalized.split(" ")) {
      if (word.length < 2) continue;
      best = Math.max(best, 1 - distance(q, word) / Math.max(q.length, word.length));
    }
    if (best < 0.55) continue;
    const previous = byId.get(recipe.id);
    if (!previous || best > previous.score) byId.set(recipe.id, { name, score: best });
  }

  const seenNames = new Set<string>();
  return [...byId.values()]
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.name)
    .filter((name) => {
      if (seenNames.has(name)) return false;
      seenNames.add(name);
      return true;
    })
    .slice(0, 5);
}
