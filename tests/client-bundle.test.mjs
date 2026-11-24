import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const clientFiles = [
  "src/components/HomeClient.tsx",
  "src/components/DishSearch.tsx",
  "src/components/FridgeSearch.tsx",
];

test("client components never import the full recipe dataset or server AI service", () => {
  for (const file of clientFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(source, /from\s+["']@\/data\/recipes["']/, file);
    assert.doesNotMatch(source, /from\s+["']@\/services\/ai["']/, file);
  }
});
