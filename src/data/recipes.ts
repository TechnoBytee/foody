import type { Cuisine, Recipe } from "./types";
import { ancientRecipes } from "./tarihi";
import { mealdbRecipes } from "./mealdb";
import { nefisRecipes } from "./tarifler";
import { areas } from "./areas";
import { areaSlug } from "@/lib/area-slug";
import { cuisines } from "./cuisines";

export type { Cuisine, Recipe } from "./types";
export { ancientRecipes, mealdbRecipes, nefisRecipes, areas };

export { cuisines } from "./cuisines";

const modernRecipes: Recipe[] = [
  {
    id: "mercimek-corbasi",
    name: { tr: "Mercimek Çorbası", en: "Lentil Soup" },
    cuisine: "turk",
    time: 30,
    difficulty: "easy",
    ingredients: { tr: ["kırmızı mercimek", "soğan", "havuç", "patates", "tereyağı", "salça", "tuz", "kimyon"], en: ["red lentils", "onion", "carrot", "potato", "butter", "tomato paste", "salt", "cumin"] },
    steps: {
      tr: [
        "Soğanı ve havucu doğrayıp tereyağında kavurun.",
        "Salçayı ekleyip kokusu çıkana kadar kavurun.",
        "Mercimek ve doğranmış patatesi ekleyin, suyla örtün.",
        "25 dakika pişirip blender'dan geçirin, baharatları ekleyin.",
      ],
      en: [
        "Sauté onion and carrot in butter.",
        "Add tomato paste and fry briefly.",
        "Add lentils, diced potato and enough water.",
        "Simmer 25 min, blend, season with cumin and salt.",
      ],
    },
    alternatives: ["Ezogelin çorbası", "Domates çorbası", "Tarhana çorbası"],
    calories: 180,
  },
  {
    id: "menemen",
    name: { tr: "Menemen", en: "Menemen" },
    cuisine: "turk",
    time: 20,
    difficulty: "easy",
    ingredients: { tr: ["yumurta", "domates", "biber", "soğan", "tereyağı", "tuz", "kara biber"], en: ["egg", "tomato", "pepper", "onion", "butter", "salt", "black pepper"] },
    steps: {
      tr: [
        "Soğan ve biberi tereyağında kavurun.",
        "Domatesi ekleyip suyunu çekene kadar pişirin.",
        "Yumurtaları kırıp karıştırın, 3-4 dakika pişirin.",
      ],
      en: [
        "Sauté onion and pepper in butter.",
        "Add tomato, cook until softened.",
        "Crack in eggs, stir, cook 3-4 min.",
      ],
    },
    alternatives: ["Çılbır", "Omlet", "Sahanda yumurta"],
    calories: 220,
  },
  {
    id: "kofte",
    name: { tr: "İzmir Köfte", en: "Izmir Meatballs" },
    cuisine: "turk",
    time: 60,
    difficulty: "medium",
    ingredients: { tr: ["kıyma", "soğan", "ekmek", "yumurta", "patates", "domates", "salça", "tuz", "baharat"], en: ["minced meat", "onion", "bread", "egg", "potato", "tomato", "tomato paste", "salt", "spice"] },
    steps: {
      tr: [
        "Köfte malzemelerini yoğurup şekil verin.",
        "Patatesleri kızartın, köfteleri mühürleyin.",
        "Sosu hazırlayıp tepsiye dökün, 180°C fırında 30 dk pişirin.",
      ],
      en: [
        "Knead meatball mix and shape.",
        "Fry potatoes, sear meatballs.",
        "Pour tomato sauce over, bake at 180°C for 30 min.",
      ],
    },
    alternatives: ["Tepsi kebap", "Orman kebabı", "Dalyan köfte"],
    calories: 450,
  },
  {
    id: "bolognese",
    name: { tr: "Bolonez Spagetti", en: "Spaghetti Bolognese" },
    cuisine: "italyan",
    time: 45,
    difficulty: "medium",
    ingredients: { tr: ["kıyma", "spagetti", "domates", "soğan", "sarımsak", "zeytinyağı", "parmesan"], en: ["minced meat", "spaghetti", "tomato", "onion", "garlic", "olive oil", "parmesan"] },
    steps: {
      tr: [
        "Soğan ve sarımsağı zeytinyağında kavurun.",
        "Kıymayı ekleyip kavurun, domatesi ekleyin.",
        "Spagettiyi haşlayın, sosla buluşturun.",
      ],
      en: [
        "Sauté onion and garlic in olive oil.",
        "Brown the mince, add tomato.",
        "Boil spaghetti, toss with sauce.",
      ],
    },
    alternatives: ["Arabiata", "Carbonara", "Mantı (Türk alternatifi)"],
    calories: 520,
  },
  {
    id: "pad-thai",
    name: { tr: "Pad Thai", en: "Pad Thai" },
    cuisine: "uzak-dogu",
    time: 25,
    difficulty: "medium",
    ingredients: { tr: ["pirinç eriştesi", "karides", "yumurta", "fasulye filizi", "lime", "balık sosu", "fıstık"], en: ["rice noodles", "shrimp", "egg", "bean sprouts", "lime", "fish sauce", "peanuts"] },
    steps: {
      tr: [
        "Erişteyi ıslatın.",
        "Karides ve yumurtayı tavada çevirin.",
        "Erişte, sos ve filizleri ekleyip yüksek ateşte karıştırın.",
      ],
      en: [
        "Soak rice noodles.",
        "Stir-fry shrimp and egg.",
        "Add noodles, sauce and bean sprouts, toss on high heat.",
      ],
    },
    alternatives: ["Chow Mein", "Wok Noodle", "Sebzeli erişte"],
    calories: 480,
  },
  {
    id: "yunan-salatasi",
    name: { tr: "Yunan Salatası", en: "Greek Salad" },
    cuisine: "akdeniz",
    time: 10,
    difficulty: "easy",
    ingredients: { tr: ["salatalık", "domates", "feta peyniri", "siyah zeytin", "kırmızı soğan", "zeytinyağı", "kekik"], en: ["cucumber", "tomato", "feta cheese", "black olives", "red onion", "olive oil", "thyme"] },
    steps: {
      tr: ["Sebzeleri iri doğrayın.", "Peynir ve zeytinleri ekleyin.", "Zeytinyağı ve kekikle servis edin."],
      en: ["Chop vegetables roughly.", "Add feta and olives.", "Dress with olive oil and oregano."],
    },
    alternatives: ["Çoban salata", "Caprese", "Ton balıklı salata"],
    calories: 150,
  },
  {
    id: "suffle",
    name: { tr: "Çikolatalı Sufle", en: "Chocolate Soufflé" },
    cuisine: "tatli",
    time: 30,
    difficulty: "hard",
    ingredients: { tr: ["bitter çikolata", "yumurta", "tereyağı", "un", "şeker", "vanilya"], en: ["dark chocolate", "egg", "butter", "flour", "sugar", "vanilla"] },
    steps: {
      tr: [
        "Çikolatayı eritin.",
        "Sarıları şekerle çırpın, çikolatayı ekleyin.",
        "Beyazları kar gibi olana kadar çırpıp spatula ile karıştırın.",
        "200°C fırında 12 dk pişirin.",
      ],
      en: [
        "Melt the chocolate.",
        "Whisk yolks with sugar, fold in chocolate.",
        "Beat whites to soft peaks, fold in gently.",
        "Bake at 200°C for 12 min.",
      ],
    },
    alternatives: ["Fondan (akışkan kek)", "Brownie", "Kazandibi"],
    calories: 380,
  },
  {
    id: "menemen-kahvalti",
    name: { tr: "Kahvaltı Tabağı", en: "Breakfast Plate" },
    cuisine: "kahvalti",
    time: 15,
    difficulty: "easy",
    ingredients: { tr: ["beyaz peynir", "domates", "salatalık", "zeytin", "bal", "kaymak", "ekmek", "çay"], en: ["white cheese", "tomato", "cucumber", "olives", "honey", "clotted cream", "bread", "tea"] },
    steps: {
      tr: ["Peynir, domates ve salatalığı dilimleyin.", "Zeytin, bal ve kaymağı tabağa alın.", "Ekmek ve çay ile servis edin."],
      en: ["Slice cheese, tomato and cucumber.", "Plate olives, honey and clotted cream.", "Serve with bread and tea."],
    },
    alternatives: ["Serpme kahvaltı", "Menemen", "Börek"],
    calories: 320,
  },
];

export const allCuisines: Cuisine[] = cuisines;

export const recipes: Recipe[] = [...modernRecipes, ...ancientRecipes, ...mealdbRecipes, ...nefisRecipes];

export const isAncient = (recipe: Recipe) => Boolean(recipe.era || recipe.history);

export function getRecipe(id: string) {
  return recipes.find((r) => r.id === id);
}

export { areaSlug } from "@/lib/area-slug";

export function recipesByCuisine(slug: string) {
  return recipes.filter(
    (r) => r.cuisine === slug || (r.categories && r.categories.includes(slug))
  );
}

export function recipesByArea(slug: string) {
  return recipes.filter((r) => areaSlug(r.area) === slug);
}

export function recipesByCuisineAndArea(cuisineSlug: string, areaSlugParam: string) {
  return recipes.filter(
    (r) =>
      (r.cuisine === cuisineSlug || (r.categories && r.categories.includes(cuisineSlug))) &&
      areaSlug(r.area) === areaSlugParam
  );
}
