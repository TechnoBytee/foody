// Tarif kartı ve detay sayfası aynı meta çizgisini kullanır.
// Kaynakta süre/kalori olmayan ithal tariflerde 0 değeri "bilinmiyor" demektir.
type Difficulty = "easy" | "medium" | "hard";
type MetaRecipe = { time: number; calories: number; difficulty: Difficulty };

const difficultyLabels: Record<Difficulty, { tr: string; en: string }> = {
  easy: { tr: "Kolay", en: "Easy" },
  medium: { tr: "Orta", en: "Medium" },
  hard: { tr: "Zor", en: "Hard" },
};

export function metaParts(recipe: MetaRecipe, lang: "tr" | "en"): string[] {
  const parts: string[] = [];
  if (recipe.time > 0) parts.push(`${recipe.time} ${lang === "tr" ? "dk" : "min"}`);
  if (recipe.time > 0) parts.push(difficultyLabels[recipe.difficulty][lang]);
  if (recipe.calories > 0) parts.push(`${recipe.calories} kcal`);
  return parts;
}
