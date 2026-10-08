import fs from "node:fs";
import path from "node:path";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";
const OUTPUT_DIR = path.join(process.cwd(), "src", "data", "mealdb");

const CATEGORY_MAP = {
  Beef: "et",
  Chicken: "tavuk",
  Dessert: "tatli",
  Lamb: "kuzu",
  Pasta: "makarna",
  Seafood: "deniz",
  Side: "yan-yemek",
  Starter: "baslangic",
  Vegan: "vegan",
  Vegetarian: "vejetaryen",
  Breakfast: "kahvalti",
  Goat: "et",
};

const AREA_TR = {
  Turkish: "Türk",
  Italian: "İtalyan",
  Japanese: "Japon",
  Chinese: "Çin",
  Indian: "Hint",
  French: "Fransız",
  British: "İngiliz",
  American: "Amerikan",
  Mexican: "Meksikalı",
  Spanish: "İspanyol",
  Thai: "Tay",
  Vietnamese: "Vietnam",
  Korean: "Kore",
  Greek: "Yunan",
  Moroccan: "Fas",
  Egyptian: "Mısır",
  Lebanese: "Lübnan",
  Iranian: "İran",
  Iraqi: "Irak",
  Syrian: "Suriye",
  Pakistani: "Pakistan",
  Ethiopian: "Etiyopya",
  Brazilian: "Brezilya",
  Argentine: "Arjantin",
  Peruvian: "Peru",
  Caribbean: "Karip",
  Jamaican: "Jamaika",
  Canadian: "Kanada",
  Australian: "Avustralya",
  Russian: "Rus",
  Polish: "Leh",
  Dutch: "Flemenk",
  German: "Alman",
  Swedish: "İsveççe",
  Norwegian: "Norveççe",
  Danish: "Danimarka",
  Finnish: "Fince",
  Hungarian: "Macar",
  Czech: "Çek",
  Portuguese: "Portekiz",
  Croatian: "Hırvat",
  Malaysian: "Malezya",
  Indonesian: "Endonezya",
  Filipino: "Filipin",
  Singaporean: "Singapur",
  SouthAfrican: "Güney Afrikalı",
  Tunisian: "Tunus",
  Algerian: "Cezayir",
  Kenyan: "Kenya",
  Nigerian: "Nijerya",
  Ghanaian: "Gana",
  Chilean: "Şili",
  Columbian: "Kolombiya",
  Uruguayan: "Uruguay",
  Venezuelan: "Venezuela",
  Cuban: "Küba",
  PuertoRican: "Porto Riko",
  Ukrainian: "Ukrayna",
  Yugoslav: "Yugoslav",
  Afghani: "Afgan",
  Bahraini: "Bahreyn",
  Bangladeshi: "Bangladeş",
  Burmese: "Burma",
  Cambodian: "Kamboçya",
  Dutch: "Flemenk",
  English: "İngiliz",
  Estonian: "Estonya",
  Georgian: "Gürcü",
  Icelandic: "İzlanda",
  Irish: "İrlanda",
  Latvian: "Letonya",
  Lithuanian: "Litvanya",
  Luxembourgish: "Lüksemburg",
  Maltese: "Malta",
  Moldavian: "Moldova",
  Mongolian: "Moğol",
  Nepalese: "Nepal",
  Romanian: "Rumen",
  Serbian: "Sırp",
  Slovak: "Slovak",
  Slovenian: "Slovene",
  Taiwanese: "Tayvan",
  Uzbek: "Özbek",
  Welsh: "Gal",
  Zimbabwean: "Zimbabve",
};

function parseInstructions(instructions) {
  if (!instructions) return [];
  return instructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("*") && !s.startsWith("Meanwhile"));
}

function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const m = measure ? measure.trim() : "";
      ingredients.push(m ? `${m} ${ing.trim()}` : ing.trim());
    }
  }
  return ingredients;
}

function estimateTime(steps, ingredients) {
  const base = 15;
  const perStep = 5;
  const perIngredient = 2;
  return Math.min(120, base + steps.length * perStep + ingredients.length * perIngredient);
}

function estimateCalories(ingredients) {
  const count = ingredients.length;
  return Math.min(900, 150 + count * 35);
}

function determineDifficulty(steps, ingredients) {
  const score = steps.length + ingredients.length;
  if (score <= 5) return "easy";
  if (score <= 9) return "medium";
  return "hard";
}

function toRecipe(meal, categorySlug) {
  const steps = parseInstructions(meal.strInstructions);
  const ingredients = parseIngredients(meal);
  const time = estimateTime(steps, ingredients);
  const difficulty = determineDifficulty(steps, ingredients);
  const calories = estimateCalories(ingredients);
  const area = meal.strArea || "International";
  const areaTr = AREA_TR[area] || area;

  return {
    id: `mealdb-${meal.idMeal}`,
    name: { tr: meal.strMeal, en: meal.strMeal },
    cuisine: categorySlug,
    time,
    difficulty,
    ingredients,
    steps: { tr: steps, en: steps },
    alternatives: [],
    calories,
    image: meal.strMealThumb || undefined,
    area: { tr: areaTr, en: area },
  };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allRecipes = [];
  const categoryStats = {};

  for (const [mealdbCat, slug] of Object.entries(CATEGORY_MAP)) {
    console.log(`Fetching ${mealdbCat}...`);
    const listData = await fetchJson(`${API_BASE}/filter.php?c=${encodeURIComponent(mealdbCat)}`);
    if (!listData.meals) continue;

    const meals = listData.meals.slice(0, 25);
    const recipes = [];

    for (const summary of meals) {
      try {
        const detail = await fetchJson(`${API_BASE}/lookup.php?i=${summary.idMeal}`);
        if (!detail.meals || !detail.meals[0]) continue;
        const meal = detail.meals[0];
        const recipe = toRecipe(meal, slug);
        recipes.push(recipe);
        allRecipes.push(recipe);
      } catch (e) {
        console.error(`  Failed ${summary.idMeal}: ${e.message}`);
      }
      await new Promise((r) => setTimeout(r, 100));
    }

    categoryStats[mealdbCat] = recipes.length;

    const fileName = slug.replace(/-/g, "_") + ".ts";
    const content = `import type { Recipe } from "../types";

export const ${slug.replace(/-/g, "_")}Recipes: Recipe[] = ${JSON.stringify(recipes, null, 2)};
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
    console.log(`  ${recipes.length} recipes → ${fileName}`);
  }

  const indexContent = `import type { Recipe } from "../types";
import { etRecipes } from "./et";
import { tavukRecipes } from "./tavuk";
import { tatliRecipes } from "./tatli";
import { kuzuRecipes } from "./kuzu";
import { makarnaRecipes } from "./makarna";
import { denizRecipes } from "./deniz";
import { yan_yemekRecipes } from "./yan_yemek";
import { baslangicRecipes } from "./baslangic";
import { veganRecipes } from "./vegan";
import { vejetaryenRecipes } from "./vejetaryen";
import { kahvaltiRecipes } from "./kahvalti";

export const mealdbRecipes: Recipe[] = [
  ...etRecipes,
  ...tavukRecipes,
  ...tatliRecipes,
  ...kuzuRecipes,
  ...makarnaRecipes,
  ...denizRecipes,
  ...yan_yemekRecipes,
  ...baslangicRecipes,
  ...veganRecipes,
  ...vejetaryenRecipes,
  ...kahvaltiRecipes,
];
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), indexContent);

  const statsContent = `# TheMealDB Fetch Stats\n\nTotal: ${allRecipes.length} recipes\n\n${Object.entries(categoryStats).map(([k, v]) => `- ${k}: ${v}`).join("\n")}\n`;
  fs.writeFileSync(path.join(OUTPUT_DIR, "stats.md"), statsContent);

  console.log(`\nDone! ${allRecipes.length} recipes saved.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
