import { test } from "node:test";
import assert from "node:assert/strict";
import { getRecipeIntro } from "../src/lib/recipe-intro.ts";

const recipe = {
  id: "x",
  name: { tr: "Ezogelin Çorbası", en: "Ezogelin Soup" },
  cuisine: "corba",
  categories: [],
  time: 60,
  difficulty: "medium",
  ingredients: {
    tr: ["1 su bardağı kırmızı mercimek", "1 tatlı kaşığı pirinç", "2 diş sarımsak"],
    en: ["1 cup red lentils", "1 teaspoon rice", "2 cloves of garlic"],
  },
  steps: { tr: [], en: [] },
  alternatives: [],
  calories: 337,
};

test("TR intro lists core ingredients with time and difficulty", () => {
  const intro = getRecipeIntro(recipe, "tr");
  assert.match(intro, /Ezogelin Çorbası/);
  assert.match(intro, /kırmızı mercimek/);
  assert.match(intro, /pirinç/);
  assert.match(intro, /sarımsak/);
  assert.doesNotMatch(intro, /su bardağı|tatlı kaşığı|\bdiş\b/);
  assert.match(intro, /60 dakika/);
  assert.match(intro, /orta zorlukta/);
});

test("EN intro lists core ingredients with correct article", () => {
  const intro = getRecipeIntro(recipe, "en");
  assert.match(intro, /Ezogelin Soup/);
  assert.match(intro, /red lentils/);
  assert.match(intro, /garlic/);
  assert.match(intro, /a medium-difficulty recipe/);
  assert.doesNotMatch(intro, /\bcup\b|teaspoon|cloves/);
});

test("recipes without ingredients or time still get an intro", () => {
  const bare = { ...recipe, ingredients: { tr: [], en: [] }, time: 0 };
  assert.match(getRecipeIntro(bare, "tr"), /Ezogelin Çorbası/);
  assert.match(getRecipeIntro(bare, "en"), /Ezogelin Soup/);
  assert.doesNotMatch(getRecipeIntro(bare, "tr"), /dakika/);
  assert.doesNotMatch(getRecipeIntro(bare, "en"), /minutes/);
});
