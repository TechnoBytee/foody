import { test } from "node:test";
import assert from "node:assert/strict";
import { paginate } from "../src/lib/paginate.ts";

const items = Array.from({ length: 50 }, (_, i) => `r${i}`);

test("first page returns the first slice", () => {
  const result = paginate(items, 1, 24);
  assert.equal(result.items.length, 24);
  assert.equal(result.items[0], "r0");
  assert.equal(result.page, 1);
  assert.equal(result.totalPages, 3);
  assert.equal(result.hasPrev, false);
  assert.equal(result.hasNext, true);
});

test("last page is clamped and reports no next page", () => {
  const result = paginate(items, 99, 24);
  assert.equal(result.page, 3);
  assert.equal(result.items.length, 2);
  assert.equal(result.hasNext, false);
  assert.equal(result.hasPrev, true);
});

test("invalid page values fall back to the first page", () => {
  assert.equal(paginate(items, 0, 24).page, 1);
  assert.equal(paginate(items, NaN, 24).page, 1);
  assert.equal(paginate([], 1, 24).totalPages, 1);
});
