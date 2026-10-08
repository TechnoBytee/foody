import type { Recipe } from "../types";
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
