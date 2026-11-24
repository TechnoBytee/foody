import { recipes } from "@/data/recipes";
import { searchDishes, suggestSimilarDishes } from "@/services/recipe-search";
import { toCardData } from "@/lib/recipe-card";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("q") ?? "").slice(0, 80);
  const lang = searchParams.get("locale") === "en" ? "en" : "tr";
  const matches = searchDishes(query, recipes, lang);
  return Response.json({
    results: matches.map(toCardData),
    suggestions: matches.length === 0 ? suggestSimilarDishes(query, recipes, lang) : [],
  });
}
