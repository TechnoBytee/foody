import { test } from "node:test";
import assert from "node:assert/strict";
import { addIngredients, readList, toggleItem, clearList } from "../src/lib/shopping-list.ts";

function mockStorage() {
  const map = new Map();
  return { getItem: (k) => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
}

test("adding ingredients stores unique lowercase-insensitive entries", () => {
  const s = mockStorage();
  addIngredients(s, ["Domates", "Soğan", "domates"]);
  assert.deepEqual(readList(s), [
    { text: "Domates", done: false },
    { text: "Soğan", done: false },
  ]);
});

test("items can be checked and the list cleared", () => {
  const s = mockStorage();
  addIngredients(s, ["Domates"]);
  toggleItem(s, "Domates");
  assert.equal(readList(s)[0].done, true);
  clearList(s);
  assert.deepEqual(readList(s), []);
});

test("corrupt storage is ignored", () => {
  const s = mockStorage();
  s.setItem("foody:shopping", "bad");
  assert.deepEqual(readList(s), []);
});
