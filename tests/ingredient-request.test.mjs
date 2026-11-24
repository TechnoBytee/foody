import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateIngredientName,
  addIngredientName,
  MAX_SAVED_NAMES,
} from "../src/lib/ingredient-request.ts";

test("valid ingredient names are trimmed and accepted", () => {
  assert.equal(validateIngredientName("  Domates  "), "Domates");
  assert.equal(validateIngredientName("zeytinyağı"), "zeytinyağı");
});

test("empty, oversized, control-character and non-text values are rejected", () => {
  assert.equal(validateIngredientName(""), null);
  assert.equal(validateIngredientName("   "), null);
  assert.equal(validateIngredientName("a".repeat(101)), null);
  assert.equal(validateIngredientName("domates\n"), null);
  assert.equal(validateIngredientName(42), null);
  assert.equal(validateIngredientName({}), null);
});

test("duplicate names are case- and accent-insensitive", () => {
  assert.deepEqual(addIngredientName(["Domates"], "domates"), ["Domates"]);
  assert.deepEqual(addIngredientName(["Ispanak"], "ıspanak"), ["Ispanak"]);
  assert.deepEqual(addIngredientName(["Havuç"], "Patates"), ["Havuç", "Patates"]);
});

test("saved name list is capped", () => {
  const full = Array.from({ length: MAX_SAVED_NAMES }, (_, i) => `malzeme-${i}`);
  const result = addIngredientName(full, "yeni");
  assert.equal(result.length, MAX_SAVED_NAMES);
  assert.equal(result[0], "malzeme-1");
  assert.equal(result[result.length - 1], "yeni");
});
