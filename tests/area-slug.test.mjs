import { test } from "node:test";
import assert from "node:assert/strict";
import { areaSlug } from "../src/lib/area-slug.ts";

test("Turkish Nefis recipes get a reachable turkey area slug", () => {
  assert.equal(areaSlug({ tr: "Türkiye", en: "Turkey" }), "turkey");
});

test("legacy demonyms are mapped to area slugs", () => {
  assert.equal(areaSlug({ tr: "Hint", en: "Indian" }), "india");
  assert.equal(areaSlug({ tr: "Amerikan", en: "United States" }), "united-states");
});

test("missing areas return null", () => {
  assert.equal(areaSlug(undefined), null);
});
