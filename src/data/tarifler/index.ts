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

export { nefisCategories } from "./categories";
