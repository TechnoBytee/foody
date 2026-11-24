import { test } from "node:test";
import assert from "node:assert/strict";
import tr from "../src/i18n/tr.json" with { type: "json" };
import en from "../src/i18n/en.json" with { type: "json" };

test("TR and EN dictionaries have identical keys", () => {
  assert.deepEqual(Object.keys(en).sort(), Object.keys(tr).sort());
});

test("no dictionary value is empty", () => {
  for (const [locale, dict] of Object.entries({ tr, en })) {
    for (const [key, value] of Object.entries(dict)) {
      assert.ok(typeof value === "string" && value.trim().length > 0, `${locale}.${key}`);
    }
  }
});
