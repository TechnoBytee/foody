import type { Recipe } from "@/data/types";

// İstemciye yalnızca liste kartının gerektirdiği alanlar gönderilir;
// adımlar ve diğer ağır metinler sunucuda kalır.
export type RecipeCardData = {
  id: string;
  name: { tr: string; en: string };
  cuisine: string;
  categories?: string[];
  time: number;
  difficulty: Recipe["difficulty"];
  ingredients: { tr: string[]; en: string[] };
  calories: number;
  image?: string;
  area?: { tr: string; en: string };
  era?: { tr: string; en: string };
  region?: { tr: string; en: string };
  forgotten?: boolean;
};

export function toCardData(recipe: Recipe): RecipeCardData {
  const { id, name, cuisine, categories, time, difficulty, ingredients, calories, image, area, era, region, forgotten } = recipe;
  return { id, name, cuisine, categories, time, difficulty, ingredients, calories, image, area, era, region, forgotten };
}
