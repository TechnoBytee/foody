import { test } from "node:test";
import assert from "node:assert/strict";
import { switchLocalePath } from "../src/lib/locale-link.ts";

test("switching locale keeps the current route", () => {
  assert.equal(switchLocalePath("/tr/tarif/mercimek-corbasi", "en"), "/en/tarif/mercimek-corbasi");
  assert.equal(switchLocalePath("/en/kategori/turk/turkey", "tr"), "/tr/kategori/turk/turkey");
});

test("root and unknown paths fall back to the target locale home", () => {
  assert.equal(switchLocalePath("/", "tr"), "/tr");
  assert.equal(switchLocalePath("/plugin-market", "en"), "/en");
});
