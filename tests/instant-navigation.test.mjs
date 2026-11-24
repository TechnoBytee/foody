import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const dynamicPages = [
  "src/app/[locale]/tarif/[id]/page.tsx",
  "src/app/[locale]/bolge/[slug]/page.tsx",
  "src/app/[locale]/kategori/[slug]/page.tsx",
  "src/app/[locale]/kategori/[slug]/[area]/page.tsx",
];

test("dynamic pages keep URL data inside a Suspense boundary", () => {
  for (const file of dynamicPages) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /<Suspense\s+fallback=/, file);
    assert.doesNotMatch(source, /export default async function Page/, file);
  }
});
