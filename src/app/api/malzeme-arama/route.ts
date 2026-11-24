import { suggestRecipes } from "@/services/ai";
import { toCardData } from "@/lib/recipe-card";

export async function POST(req: Request) {
  const body: unknown = await req.json().catch(() => null);
  const raw = body && typeof body === "object" && "ingredients" in body ? body.ingredients : [];
  const ingredients = Array.isArray(raw)
    ? raw.filter((item): item is string => typeof item === "string" && item.length <= 100).slice(0, 20)
    : [];
  const lang =
    body && typeof body === "object" && "locale" in body && body.locale === "en" ? "en" : "tr";
  const matches = await suggestRecipes(ingredients, "", lang);
  return Response.json({ results: matches.map(toCardData) });
}
