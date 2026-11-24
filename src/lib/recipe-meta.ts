// Tarif kartı ve detay sayfası aynı meta çizgisini kullanır; etiketler sözlükteki
// değerlerden gelir. Kaynakta süre/kalori olmayan ithal tariflerde 0 = bilinmiyor.
type Difficulty = "easy" | "medium" | "hard";
type MetaRecipe = { time: number; calories: number; difficulty: Difficulty };

export type MetaLabels = Record<Difficulty | "min" | "kcal", string>;

export function metaLabels(messages: {
  min: string;
  easy: string;
  medium: string;
  hard: string;
  kcal: string;
}): MetaLabels {
  return {
    min: messages.min,
    easy: messages.easy,
    medium: messages.medium,
    hard: messages.hard,
    kcal: messages.kcal,
  };
}

export function metaParts(recipe: MetaRecipe, labels: MetaLabels): string[] {
  const parts: string[] = [];
  if (recipe.time > 0) parts.push(`${recipe.time} ${labels.min}`);
  if (recipe.time > 0) parts.push(labels[recipe.difficulty]);
  if (recipe.calories > 0) parts.push(`${recipe.calories} ${labels.kcal}`);
  return parts;
}
