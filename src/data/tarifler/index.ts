import type { Recipe } from "../types";
import { atistirmalikRecipes } from "./atistirmalik";
import { baklagilRecipes } from "./baklagil";
import { bebekRecipes } from "./bebek";
import { cocukRecipes } from "./cocuk";
import { nefis_corbaRecipes } from "./nefis-corba";
import { kilerRecipes } from "./kiler";
import { diyetRecipes } from "./diyet";
import { dolmaRecipes } from "./dolma";
import { nefis_etRecipes } from "./nefis-et";
import { hamurRecipes } from "./hamur";
import { hizliRecipes } from "./hizli";
import { icecekRecipes } from "./icecek";
import { nefis_kahvaltiRecipes } from "./nefis-kahvalti";
import { kurabiyeRecipes } from "./kurabiye";
import { nefis_makarnaRecipes } from "./nefis-makarna";
import { pilavRecipes } from "./pilav";
import { salataRecipes } from "./salata";
import { sandvicRecipes } from "./sandvic";
import { sebzeRecipes } from "./sebze";
import { nefis_tatliRecipes } from "./nefis-tatli";
import { yumurtaRecipes } from "./yumurta";

export const nefisRecipes: Recipe[] = [
  ...atistirmalikRecipes,
  ...baklagilRecipes,
  ...bebekRecipes,
  ...cocukRecipes,
  ...nefis_corbaRecipes,
  ...kilerRecipes,
  ...diyetRecipes,
  ...dolmaRecipes,
  ...nefis_etRecipes,
  ...hamurRecipes,
  ...hizliRecipes,
  ...icecekRecipes,
  ...nefis_kahvaltiRecipes,
  ...kurabiyeRecipes,
  ...nefis_makarnaRecipes,
  ...pilavRecipes,
  ...salataRecipes,
  ...sandvicRecipes,
  ...sebzeRecipes,
  ...nefis_tatliRecipes,
  ...yumurtaRecipes,
];

// Kategori bilgileri
export const nefisCategories = [
  { slug: "atistirmalik", name: { tr: "Atıştırmalıklar", en: "Snacks" } },
  { slug: "baklagil", name: { tr: "Baklagil Yemekleri", en: "Legume Dishes" } },
  { slug: "bebek", name: { tr: "Bebek Yemekleri", en: "Baby Food" } },
  { slug: "cocuk", name: { tr: "Çocuk Menüleri", en: "Kids Menu" } },
  { slug: "nefis-corba", name: { tr: "Çorbalar", en: "Soups" } },
  { slug: "kiler", name: { tr: "Kiler ve Hazırlıklar", en: "Pantry & Prep" } },
  { slug: "diyet", name: { tr: "Hafif ve Diyet", en: "Light & Diet" } },
  { slug: "dolma", name: { tr: "Dolmalar ve Sarmalar", en: "Stuffed & Wrapped" } },
  { slug: "nefis-et", name: { tr: "Et ve Protein Yemekleri", en: "Meat & Protein" } },
  { slug: "hamur", name: { tr: "Hamur İşleri", en: "Dough & Pastry" } },
  { slug: "hizli", name: { tr: "Hızlı ve Pratik", en: "Quick & Easy" } },
  { slug: "icecek", name: { tr: "İçecekler", en: "Drinks" } },
  { slug: "nefis-kahvalti", name: { tr: "Kahvaltılık", en: "Breakfast" } },
  { slug: "kurabiye", name: { tr: "Kurabiyeler", en: "Cookies" } },
  { slug: "nefis-makarna", name: { tr: "Makarnalar", en: "Pasta" } },
  { slug: "pilav", name: { tr: "Pilavlar", en: "Rice Dishes" } },
  { slug: "salata", name: { tr: "Salatalar ve Mezeler", en: "Salads & Mezze" } },
  { slug: "sandvic", name: { tr: "Sandviçler", en: "Sandwiches" } },
  { slug: "sebze", name: { tr: "Sebze Yemekleri", en: "Vegetable Dishes" } },
  { slug: "nefis-tatli", name: { tr: "Tatlılar", en: "Desserts" } },
  { slug: "yumurta", name: { tr: "Yumurta Yemekleri", en: "Egg Dishes" } },
];
