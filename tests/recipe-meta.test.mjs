import { test } from "node:test";
import assert from "node:assert/strict";
import { metaParts } from "../src/lib/recipe-meta.ts";

const base = { time: 30, calories: 340, difficulty: "medium" };

test("known metadata renders time, difficulty and calories", () => {
  assert.deepEqual(metaParts(base, "tr"), ["30 dk", "Orta", "340 kcal"]);
  assert.deepEqual(metaParts(base, "en"), ["30 min", "Medium", "340 kcal"]);
});

test("unknown metadata (0 values) is hidden instead of guessed", () => {
  assert.deepEqual(metaParts({ ...base, time: 0, calories: 0, difficulty: "easy" }, "tr"), []);
  assert.deepEqual(metaParts({ ...base, time: 0, calories: 0, difficulty: "easy" }, "en"), []);
});

test("partially known metadata still renders available parts", () => {
  assert.deepEqual(metaParts({ ...base, calories: 0 }, "tr"), ["30 dk", "Orta"]);
});
