import { test } from "node:test";
import assert from "node:assert/strict";
import {
  searchDishes,
  suggestSimilarDishes,
} from "../src/services/recipe-search.ts";

function dish(id, tr, en, extra = {}) {
  return {
    id,
    name: { tr, en },
    cuisine: "corba",
    categories: [],
    time: 30,
    difficulty: "easy",
    ingredients: {
      tr: ["1 su bardağı yumurta"],
      en: ["1 cup eggs"],
    },
    steps: { tr: [], en: [] },
    alternatives: [],
    calories: 100,
    ...extra,
  };
}

const soups = [
  dish("a", "Mercimek Çorbası", "Lentil Soup"),
  dish("b", "Ezogelin Çorbası", "Ezogelin Soup"),
  dish("c", "Pirinç Pilav", "Rice Pilaf", { categories: ["pilav"] }),
];

test("dish search matches names case- and accent-insensitively", () => {
  const found = searchDishes("MERCIMEK CORBASI", soups, "tr");
  assert.equal(found[0]?.id, "a");
  assert.ok(!found.some((r) => r.id === "c"));
});

test("dish search does not use ingredients (kept separate from fridge search)", () => {
  const found = searchDishes("yumurta", soups, "tr");
  assert.equal(found.length, 0);
});

test("dish search ranks names over category metadata", () => {
  const found = searchDishes("pilav", soups, "tr");
  assert.equal(found[0]?.id, "c");
});

test("similar dish suggestions appear for a near-miss query", () => {
  const suggestions = suggestSimilarDishes("mercimek corbasi", soups, "tr");
  assert.equal(suggestions[0], "Mercimek Çorbası");
});

test("unrelated query yields no similar dish suggestions", () => {
  assert.deepEqual(suggestSimilarDishes("xyzqwerty", soups, "en"), []);
});

test("cross-language aliases find dishes", () => {
  const found = searchDishes("lentil soup", soups, "tr");
  assert.equal(found[0]?.id, "a");
});

test("full matches rank above partial matches", () => {
  const found = searchDishes("mercimek corbasi", soups, "tr");
  assert.deepEqual(found.map((r) => r.id), ["a"]);
});

test("overlong queries are capped instead of crashing", () => {
  assert.deepEqual(searchDishes("a".repeat(200), soups, "tr"), []);
});

test("result limit is respected", () => {
  const many = Array.from({ length: 10 }, (_, i) => dish(`p${i}`, `Pilav ${i}`, `Pilaf ${i}`));
  assert.equal(searchDishes("pilav", many, "tr", 3).length, 3);
});

test("duplicate dish names produce a single suggestion", () => {
  const twin = { ...soups[0], id: "a-copy" };
  const suggestions = suggestSimilarDishes("mercimek corbasi", [soups[0], twin], "tr");
  assert.deepEqual(suggestions, ["Mercimek Çorbası"]);
});
