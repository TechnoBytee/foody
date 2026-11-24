import { test } from "node:test";
import assert from "node:assert/strict";
import { metaParts } from "../src/lib/recipe-meta.ts";

const labels = { min: "dk", easy: "Kolay", medium: "Orta", hard: "Zor", kcal: "kcal" };
const base = { time: 30, calories: 340, difficulty: "medium" };

test("known metadata renders time, difficulty and calories", () => {
  assert.deepEqual(metaParts(base, labels), ["30 dk", "Orta", "340 kcal"]);
  assert.deepEqual(
    metaParts(base, { ...labels, min: "min", easy: "Easy", medium: "Medium" }),
    ["30 min", "Medium", "340 kcal"]
  );
});

test("unknown metadata (0 values) is hidden instead of guessed", () => {
  assert.deepEqual(metaParts({ ...base, time: 0, calories: 0, difficulty: "easy" }, labels), []);
});

test("partially known metadata still renders available parts", () => {
  assert.deepEqual(metaParts({ ...base, calories: 0 }, labels), ["30 dk", "Orta"]);
});
