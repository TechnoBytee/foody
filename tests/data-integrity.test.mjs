import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function dataFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => path.join(dir, f));
}

const dirs = [
  "src/data/tarifler",
  "src/data/mealdb",
  "src/data/tarihi",
].flatMap(dataFiles);
dirs.push("src/data/recipes.ts");

test("recipe ids are unique across all data sources", () => {
  const ids = dirs.flatMap((file) => {
    const source = fs.readFileSync(file, "utf8");
    return [...source.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
  });
  assert.ok(ids.length > 2000, `expected full archive, got ${ids.length} ids`);
  assert.equal(new Set(ids).size, ids.length, "duplicate recipe ids found");
});

test("no recipe has empty ingredient or step arrays", () => {
  for (const file of dirs) {
    const source = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(source, /"(?:tr|en)":\s*\[\s*\]/, file);
  }
});

test("area slugs are unique and include Turkey", () => {
  const source = fs.readFileSync("src/data/areas.ts", "utf8");
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.includes("turkey"));
});
