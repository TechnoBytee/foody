import type { Cuisine } from "./types";
import { nefisCategories } from "./tarifler/categories";

// İstemci tarafında yalnızca kategori listesi gerekir; tarif verisi burada yoktur.
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
  {
    slug: "et",
    name: { tr: "Et Yemekleri", en: "Meat Dishes" },
    description: { tr: "Dana, kuzu ve keçi yemekleri", en: "Beef, lamb and goat dishes" },
  },
  {
    slug: "tavuk",
    name: { tr: "Tavuk Yemekleri", en: "Chicken Dishes" },
    description: { tr: "Tavukla hazırlanan lezzetler", en: "Dishes made with chicken" },
  },
  {
    slug: "kuzu",
    name: { tr: "Kuzu Yemekleri", en: "Lamb Dishes" },
    description: { tr: "Kuzu eti ile hazırlanan yemekler", en: "Dishes prepared with lamb" },
  },
  {
    slug: "makarna",
    name: { tr: "Makarna", en: "Pasta" },
    description: { tr: "Spagetti, lasagne ve daha fazlası", en: "Spaghetti, lasagna and more" },
  },
  {
    slug: "deniz",
    name: { tr: "Deniz Ürünleri", en: "Seafood" },
    description: { tr: "Balık ve deniz mahsulleri", en: "Fish and seafood" },
  },
  {
    slug: "yan-yemek",
    name: { tr: "Yan Yemekler", en: "Side Dishes" },
    description: { tr: "Pilav, salata ve eşlikçiler", en: "Rice, salads and companions" },
  },
  {
    slug: "baslangic",
    name: { tr: "Başlangıçlar", en: "Starters" },
    description: { tr: "Meze, çorba ve ön yemekler", en: "Mezze, soups and appetizers" },
  },
  {
    slug: "vegan",
    name: { tr: "Vegan", en: "Vegan" },
    description: { tr: "Bitki bazlı, hayvansal içermeyen", en: "Plant-based, no animal products" },
  },
  {
    slug: "vejetaryen",
    name: { tr: "Vejetaryen", en: "Vegetarian" },
    description: { tr: "Et içermeyen besleyici yemekler", en: "Meat-free nutritious meals" },
  },
  {
    slug: "corba",
    name: { tr: "Çorbalar", en: "Soups" },
    description: { tr: "Sıcak ve besleyici çorbalar", en: "Warm and nutritious soups" },
  },
  ...nefisCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: { tr: "Nefis tarifler", en: "Delicious recipes" },
  })),
];
