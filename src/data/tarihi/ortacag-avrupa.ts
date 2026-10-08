import type { Recipe } from "../types";

// Orta Çağ Avrupası mutfağından kayıtlı tarifler.
export const ortaCagAvrupaRecipes: Recipe[] = [
  {
    id: "pottage-orta-cag-lapasi",
    name: { tr: "Pottage (Orta Çağ Lapası)", en: "Pottage (Medieval Stew)" },
    cuisine: "et",
    time: 90,
    difficulty: "easy",
    ingredients: ["yulaf", "nohut", "sebze", "et suyu", "bal", "tuz", "kekik"],
    steps: {
      tr: [
        "Yulaf ve nohudu et suyunda yumuşayana kadar pişirin.",
        "Sebzeleri ve baharatı ekleyip 40 dakika kaynatın.",
        "Bal ile tatlandırıp ekmekle servis edin.",
      ],
      en: [
        "Simmer oats and chickpeas in stock until soft.",
        "Add vegetables and spices, cook 40 minutes.",
        "Sweeten with honey and serve with bread.",
      ],
    },
    alternatives: ["Frumenty", "Tharid", "Maza"],
    calories: 340,
    era: { tr: "MS 5-15. yüzyıl", en: "5th-15th century CE" },
    region: { tr: "Avrupa", en: "Europe" },
    history: {
      tr: "Köylü Avrupa'sının temel sıcak çorbası; içine ne varsa atılan, israf etmeyen bir yemek.",
      en: "The basic hot soup of rural Europe - a pot into which everything went, and nothing wasted.",
    },
    forgotten: true,
  },
  {
    id: "frumenty-ilk-kahvalti-lapasi",
    name: { tr: "Frumenty (İlk Kahvaltı Lapası)", en: "Frumenty (The First Breakfast Porridge)" },
    cuisine: "et",
    time: 35,
    difficulty: "easy",
    ingredients: ["buğday", "süt", "safran", "tarçın", "yumurta sarısı", "bal"],
    steps: {
      tr: [
        "Buğdayı sütte yumuşayana kadar pişirin.",
        "Safran, tarçın ve yumurta sarısını ekleyin.",
        "Bal ile servis edin.",
      ],
      en: [
        "Cook the wheat in milk until tender.",
        "Add saffron, cinnamon and egg yolk.",
        "Serve with honey.",
      ],
    },
    alternatives: ["Porridge", "Millet", "Kasha"],
    calories: 290,
    era: { tr: "MS 12. yüzyıl", en: "12th century CE" },
    region: { tr: "İngiltere / Fransa", en: "England / France" },
    history: {
      tr: "Orta Çağ'ın tatlı-baharatlı tahıl lapası; kraliyet kahvaltılarında masanın değişmez tabağı.",
      en: "The sweet, spiced grain porridge of the Middle Ages, a fixed dish on royal breakfast tables.",
    },
    forgotten: true,
  },
  {
    id: "pease-pudding-bezelye-puresi",
    name: { tr: "Pease Pudding (Bezelye Püresi)", en: "Pease Pudding" },
    cuisine: "et",
    time: 60,
    difficulty: "easy",
    ingredients: ["sarı bezelye", "tereyağı", "tuz", "karabiber", "soğan"],
    steps: {
      tr: [
        "Bezelyeleri yumuşayana kadar haşlayın.",
        "Tereyağı ile ezip karabiber ekleyin.",
        "Soğan kavurarak üzerine dökün.",
      ],
      en: [
        "Boil the peas until tender.",
        "Mash with butter and add black pepper.",
        "Pour over fried onion.",
      ],
    },
    alternatives: ["Fırında Fasulye", "Ezme", "Patates Püresi"],
    calories: 260,
    era: { tr: "MS 11. yüzyıl", en: "11th century CE" },
    region: { tr: "İngiltere", en: "England" },
    history: {
      tr: "İngiliz işçi ve denizci sofrasının temel lapası; kıtıklarda denizden gelenler ilk öğün sayılırdı.",
      en: "The staple of English workers and sailors - what landed from the sea was the first meal.",
    },
    forgotten: true,
  },
  {
    id: "blancmange-orta-cag-bademli",
    name: { tr: "Blancmange (Orta Çağ Bademli)", en: "Blancmange (Medieval Almond Dish)" },
    cuisine: "et",
    time: 70,
    difficulty: "medium",
    ingredients: ["badem", "tavuk", "pirinç unu", "bal", "gül suyu", "süt"],
    steps: {
      tr: [
        "Bademleri tavuk suyunda kaynatıp süzün.",
        "Pirinç unu ve sütü karıştırıp kıvama gelene kadar pişirin.",
        "Bal ve gül suyuyla tatlandırıp soğutun.",
      ],
      en: [
        "Simmer the almonds in chicken stock and strain.",
        "Mix in rice flour and milk, cook until thick.",
        "Sweeten with honey and rose water, chill.",
      ],
    },
    alternatives: ["Sufle", "Fırın Sütlaç", "Krem"],
    calories: 310,
    era: { tr: "MS 13. yüzyıl", en: "13th century CE" },
    region: { tr: "Avrupa", en: "Europe" },
    history: {
      tr: "Orta Çağ'da badem sütüyle tavuk pişirilen 'beyaz yemek'; bugün tatlıya evrilmiş hâliyle mutfakta yaşıyor.",
      en: "A 'white dish' of almond milk and fowl, now surviving as dessert.",
    },
  },
  {
    id: "vinaigre-doux-balli-sirkeli-syrup",
    name: { tr: "Vinaigre Doux (Ballı Sirkeli Şurup)", en: "Vinaigre Doux (Honeyed Vinegar Syrup)" },
    cuisine: "et",
    time: 45,
    difficulty: "easy",
    ingredients: ["elma", "sirke", "bal", "tarçın", "şeker"],
    steps: {
      tr: [
        "Elmaları sirkeyle kaynatıp süzün.",
        "Bal, şeker ve tarçını ekleyip kıvama gelene kadar kaynatın.",
        "Sıcak olarak dondurma veya et üstüne dökün.",
      ],
      en: [
        "Boil apples in vinegar and strain.",
        "Add honey, sugar and cinnamon, reduce.",
        "Serve hot over ice cream or meat.",
      ],
    },
    alternatives: ["Elma Sosu", "Sikbaj", "Nar Ekşisi"],
    calories: 210,
    era: { tr: "MS 13. yüzyıl", en: "13th century CE" },
    region: { tr: "Fransa", en: "France" },
    history: {
      tr: "Orta Çağ Fransız mutfağının ayırı tatlı-ekşili şurubu; meyve ekşiliğinin en eski kayıtlarından.",
      en: "The sauce that separated sweet from sour in medieval French cooking, among the earliest records of fruit acidity.",
    },
    forgotten: true,
  },
];