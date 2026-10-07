import { recipes, Recipe } from "@/data/recipes";

// AI soyutlama katmanı. API anahtarı eklendiğinde burada gerçek
// OpenAI/Gemini çağrıları yapılacak; şimdilik mock çalışır.

export async function suggestRecipes(ingredients: string[], query = ""): Promise<Recipe[]> {
  const terms = [...ingredients, query].join(" ").toLowerCase();
  const scored = recipes
    .map((r) => {
      const hits = r.ingredients.filter((ing) =>
        terms.split(/[\s,]+/).some((t) => t.length > 2 && ing.toLowerCase().includes(t))
      ).length;
      return { r, hits };
    })
    .filter((s) => s.hits > 0 || !terms.trim())
    .sort((a, b) => b.hits - a.hits);
  return scored.slice(0, 6).map((s) => s.r);
}

export async function analyzeImage(_file: File): Promise<string[]> {
  // Şimdilik örnek malzeme listesi döndürür
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(["yumurta", "domates", "biber", "soğan"]),
      1200
    )
  );
}

export async function askAboutFood(query: string): Promise<string> {
  const results = await suggestRecipes([], query);
  if (results.length === 0) {
    return "Maalesef bu tarif için bir önerim yok. Malzemelerinizi yazarsanız yardımcı olabilirim.";
  }
  return `"${query}" için önerim: ${results[0].name.tr}. Alternatifler: ${results[0].alternatives.join(", ")}.`;
}
