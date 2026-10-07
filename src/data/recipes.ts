import type { Cuisine, Recipe } from "./types";
import { ancientCuisines, ancientRecipes } from "./tarihi";

export type { Cuisine, Recipe } from "./types";
export { ancientCuisines, ancientRecipes };

export const cuisines: Cuisine[] = [
  {
    slug: "turk",
    name: { tr: "Türk Mutfağı", en: "Turkish" },
    description: { tr: "Anadolu'nun zengin sofraları", en: "Anatolia's rich tables" },
  },
  {
    slug: "italyan",
    name: { tr: "İtalyan", en: "Italian" },
    description: { tr: "Makarna, pizza ve daha fazlası", en: "Pasta, pizza and more" },
  },
  {
    slug: "uzak-dogu",
    name: { tr: "Uzak Doğu", en: "Far East" },
    description: { tr: "Çin, Japon ve Thai lezzetleri", en: "Chinese, Japanese and Thai flavors" },
  },
  {
    slug: "akdeniz",
    name: { tr: "Akdeniz", en: "Mediterranean" },
    description: { tr: "Zeytinyağlı, taze, hafif", en: "Olive oil, fresh, light" },
  },
  {
    slug: "tatli",
    name: { tr: "Tatlılar", en: "Desserts" },
    description: { tr: "Baklavadan sufle'ye", en: "From baklava to soufflé" },
  },
  {
    slug: "kahvalti",
    name: { tr: "Kahvaltı", en: "Breakfast" },
    description: { tr: "Güne iyi başlayanlar için", en: "For a good start" },
  },
];

const modernRecipes: Recipe[] = [
  {
    id: "mercimek-corbasi",
    name: { tr: "Mercimek Çorbası", en: "Lentil Soup" },
    cuisine: "turk",
    time: 30,
    difficulty: "easy",
    ingredients: ["kırmızı mercimek", "soğan", "havuç", "patates", "tereyağı", "salça", "tuz", "kimyon"],
    steps: {
      tr: [
        "Soğanı ve havucu doğrayıp tereyağında kavurun.",
        "Salçayı ekleyip kokusu çıkana kadar kavurun.",
        "Mercimek ve doğranmış patatesi ekleyin, suyla örtün.",
        "25 dakika pişirip blender'dan geçirin, baharatları ekleyin.",
      ],
      en: [
        "Sauté onion and carrot in butter.",
        "Add paste and fry briefly.",
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
    ingredients: ["yumurta", "domates", "biber", "soğan", "tereyağı", "tuz", "karabiber"],
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
    ingredients: ["kıyma", "soğan", "ekmek", "yumurta", "patates", "domates", "salça", "tuz", "baharat"],
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
    ingredients: ["kıyma", "spagetti", "domates", "soğan", "sarımsak", "zeytinyağı", "parmesan"],
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
    ingredients: ["pirinç eriştesi", "karides", "yumurta", "fasulye filizi", "lime", "balık sosu", "fıstık"],
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
    ingredients: ["salatalık", "domates", "feta peyniri", "siyah zeytin", "kırmızı soğan", "zeytinyağı", "kekik"],
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
    ingredients: ["bitter çikolata", "yumurta", "tereyağı", "un", "şeker", "vanilya"],
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
    ingredients: ["beyaz peynir", "domates", "salatalık", "zeytin", "bal", "kaymak", "ekmek", "çay"],
    steps: {
      tr: ["Peynir, domates ve salatalığı dilimleyin.", "Zeytin, bal ve kaymağı tabağa alın.", "Ekmek ve çay ile servis edin."],
      en: ["Slice cheese, tomato and cucumber.", "Plate olives, honey and clotted cream.", "Serve with bread and tea."],
    },
    alternatives: ["Serpme kahvaltı", "Menemen", "Börek"],
    calories: 320,
  },
];

// Ana sayfadaki güncel mutfak ızgarası sadece modern kategorileri gösterir.
/** Tarihî arşiv kategorileri dahil tüm kategoriler (kategori rotaları bunu kullanır). */
export const allCuisines: Cuisine[] = [...cuisines, ...ancientCuisines];

/** Modern + tarihî tüm tarifler; arama, malzeme eşleştirme ve statik rotalar bunu kullanır. */
export const recipes: Recipe[] = [...modernRecipes, ...ancientRecipes];

export const isAncient = (recipe: Recipe) => Boolean(recipe.era || recipe.history);

export function getRecipe(id: string) {
  return recipes.find((r) => r.id === id);
}

export function recipesByCuisine(slug: string) {
  return recipes.filter((r) => r.cuisine === slug);
}
