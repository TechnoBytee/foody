import { test } from "node:test";
import assert from "node:assert/strict";
import { readFavorites, toggleFavorite } from "../src/lib/favorites.ts";

function mockStorage() {
  const map = new Map();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, value),
  };
}

const recipe = {
  id: "r1",
  name: { tr: "Mercimek Çorbası", en: "Lentil Soup" },
  cuisine: "corba",
  time: 30,
  difficulty: "easy",
  ingredients: { tr: ["mercimek"], en: ["lentils"] },
  calories: 300,
};

test("empty storage yields an empty favorites list", () => {
  assert.deepEqual(readFavorites(mockStorage()), []);
});

test("toggle adds then removes a recipe by id", () => {
  const storage = mockStorage();
  assert.equal(toggleFavorite(storage, recipe).length, 1);
  assert.equal(readFavorites(storage)[0].id, "r1");
  assert.equal(toggleFavorite(storage, recipe).length, 0);
});

test("corrupt storage data is ignored", () => {
  const storage = mockStorage();
  storage.setItem("foody:favorites", "not-json");
  assert.deepEqual(readFavorites(storage), []);
});
