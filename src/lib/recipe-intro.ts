import type { Recipe } from "@/data/types";

// Tarif metinlerini elle düzenlemeden, mevcut alanlardan kısa bir giriş üretir.
// Bu, ham veri dosyalarını değiştirmeden her tarife bir anlatım kazandırır.
type Lang = "tr" | "en";

const quantityPrefix: Record<Lang, RegExp> = {
  tr:
    /^\s*(?:[\d¼½¾.,]+\s*)?(?:su bardağı|tatlı kaşığı|çay kaşığı|yemek kaşığı|orta boy|küçük|büyük|yarım|diş|adet|tane|gram|g|kg|ml|litre|bardak|kaşık|avuç|demet|paket|kutu|sap|çubuk|yaprak)\s*/i,
  en:
    /^\s*(?:[\d./]+\s*)?(?:cups?|tablespoons?|teaspoons?|tbsp|tsp|cloves?|grams?|g|kg|ml|litres?|liters?|medium|small|large|pieces?|pinch|sprigs?|of)\s*/i,
};

const difficultyWord: Record<Lang, Record<Recipe["difficulty"], string>> = {
  tr: { easy: "kolay", medium: "orta zorlukta", hard: "zorlu" },
  en: { easy: "easy", medium: "medium-difficulty", hard: "challenging" },
};

function shortIngredient(value: string, lang: Lang): string {
  let text = value.trim().replace(quantityPrefix[lang], "").trim();
  text = text.replace(/\s*\([^)]*\)/g, "").replace(/^(?:of|the)\s+/i, "").replace(/[.,;]+$/, "");
  if (text.length > 32) text = `${text.slice(0, 31).trimEnd()}…`;
  return text;
}

function join(items: string[], lang: Lang): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${lang === "tr" ? "ve" : "and"} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${lang === "tr" ? "ve" : "and"} ${items[items.length - 1]}`;
}

export function getRecipeIntro(recipe: Recipe, lang: Lang): string {
  const seen = new Set<string>();
  const ingredients: string[] = [];
  for (const raw of recipe.ingredients[lang]) {
    const item = shortIngredient(raw, lang);
    if (!item || seen.has(item)) continue;
    seen.add(item);
    ingredients.push(item);
    if (ingredients.length === 3) break;
  }

  const list = join(ingredients, lang);
  const time = recipe.time > 0;
  const level = difficultyWord[lang][recipe.difficulty];

  if (lang === "tr") {
    const parts = [recipe.name.tr];
    if (list) parts.push(`${list} gibi malzemelerle hazırlanır`);
    if (time) {
      parts.push(`yaklaşık ${recipe.time} dakikada tamamlanır`);
      parts.push(`${level} bir tariftir.`);
    }
    const text = parts.join(", ");
    return text.endsWith(".") ? text : `${text}.`;
  }

  if (!time) {
    return list
      ? `${recipe.name.en} is made with ${list}.`
      : `${recipe.name.en} is a recipe from the archive.`;
  }
  const article = recipe.difficulty === "easy" ? "an" : "a";
  let text = `${recipe.name.en} is ${article} ${level} recipe`;
  if (list) text += ` made with ${list}`;
  return `${text}, ready in about ${recipe.time} minutes.`;
}
