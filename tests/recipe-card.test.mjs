import { test } from "node:test";
import assert from "node:assert/strict";
import { toCardData } from "../src/lib/recipe-card.ts";

const recipe = {
  id: "r1",
  name: { tr: "Mercimek Çorbası", en: "Lentil Soup" },
  cuisine: "corba",
  time: 30,
  difficulty: "easy",
  ingredients: { tr: ["mercimek"], en: ["lentils"] },
  steps: { tr: ["uzun adım"], en: ["long step"] },
  alternatives: [],
  calories: 300,
};

test("card data keeps list fields but drops heavy step text", () => {
  const card = toCardData(recipe);
  assert.equal(card.id, "r1");
  assert.deepEqual(card.ingredients, recipe.ingredients);
  assert.equal("steps" in card, false);
});
