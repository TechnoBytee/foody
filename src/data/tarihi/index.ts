import type { Cuisine, Recipe } from "../types";
import { mezopotamyaRecipes } from "./mezopotamya";
import { antikAkdenizRecipes } from "./antik-akdeniz";
import { cinHintRecipes } from "./cin-hint";
import { bizansIslamRecipes } from "./bizans-islam";
import { ortaCagAvrupaRecipes } from "./ortacag-avrupa";
import { turkAnadoluRecipes } from "./turk-anadolu";
import { erzurumRecipes } from "./erzurum";
import { diyarbakirRecipes } from "./diyarbakir";

export const ancientCuisines: Cuisine[] = [
  {
    slug: "tarih-mezopotamya",
    name: { tr: "Neolitik Anadolu'dan Hititlere", en: "From Neolithic Anatolia to the Hittites" },
    description: {
      tr: "Taş Tepeler, Babil tabletleri ve Kültepe: bilinen en eski yazılı tarifler.",
      en: "Taş Tepeler, Babylonian tablets and Kültepe: the earliest written recipes known.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-antik-akdeniz",
    name: { tr: "Antik Mısır, Yunan ve Roma", en: "Ancient Egypt, Greece and Rome" },
    description: {
      tr: "Ekmek-bira rasyonundan garum'a, Akdeniz'in bin yıllık sofrası.",
      en: "From bread-and-beer rations to garum, a thousand years of Mediterranean tables.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-cin-hint",
    name: { tr: "Tarihî Çin ve Hint", en: "Ancient China and India" },
    description: {
      tr: "Charaka döneminden Tangyuan'a, Baharatlı pilavın yolculuğu.",
      en: "From the Charaka period to tangyuan, the journey of the spiced pilaf.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-bizans-islam",
    name: { tr: "Bizans, İslam Çağı ve Orta Doğu", en: "Byzantium, the Islamic Age and the Middle East" },
    description: {
      tr: "Sikbaj'dan ash reshteh'e, ekşili-tatlı dönemi.",
      en: "From sikbaj to ash reshteh, the sweet-and-sour era.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-ortacag-avrupa",
    name: { tr: "Orta Çağ Avrupası", en: "Medieval Europe" },
    description: {
      tr: "Pottage'dan frumenty'ye, ekmeğin ve tahılın yüzyılları.",
      en: "From pottage to frumenty, the centuries of bread and grain.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-turk-anadolu",
    name: { tr: "Orta Asya'dan Osmanlı'ya", en: "From Central Asia to the Ottomans" },
    description: {
      tr: "Tutmaç, tarhana, mutancana: Kaşgarlı Mahmud'dan saray mutfağına.",
      en: "Tutmaç, tarhana, mutancana: from Mahmud al-Kashgari to the palace kitchen.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-erzurum",
    name: { tr: "Unutulmuş Erzurum Mutfağı", en: "The Lost Kitchens of Erzurum" },
    description: {
      tr: "Demir tatlısından süt çorbasına, kayıt altına alınan yemekler.",
      en: "From iron sweet to milk soup, dishes rescued from the record.",
    },
    collection: "tarih",
  },
  {
    slug: "tarih-diyarbakir",
    name: { tr: "Diyarbakır Mutfağı", en: "The Kitchen of Diyarbakır" },
    description: {
      tr: "Yürek dolmasından gülciye'ye, Güneydoğu'nun kayıp sofraları.",
      en: "From stuffed heart to gülciye, lost tables of the southeast.",
    },
    collection: "tarih",
  },
];

export const ancientRecipes: Recipe[] = [
  ...mezopotamyaRecipes,
  ...antikAkdenizRecipes,
  ...cinHintRecipes,
  ...bizansIslamRecipes,
  ...ortaCagAvrupaRecipes,
  ...turkAnadoluRecipes,
  ...erzurumRecipes,
  ...diyarbakirRecipes,
];

export const ancientRecipesByCuisine = (slug: string) =>
  ancientRecipes.filter((r) => r.cuisine === slug);

export const forgottenRecipes = ancientRecipes.filter((r) => r.forgotten);