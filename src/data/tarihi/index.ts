import type { Recipe } from "../types";
import { mezopotamyaRecipes } from "./mezopotamya";
import { antikAkdenizRecipes } from "./antik-akdeniz";
import { cinHintRecipes } from "./cin-hint";
import { bizansIslamRecipes } from "./bizans-islam";
import { ortaCagAvrupaRecipes } from "./ortacag-avrupa";
import { turkAnadoluRecipes } from "./turk-anadolu";
import { erzurumRecipes } from "./erzurum";
import { diyarbakirRecipes } from "./diyarbakir";

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

export const forgottenRecipes = ancientRecipes.filter((r) => r.forgotten);