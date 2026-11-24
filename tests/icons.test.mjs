import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { phosphorIcons } from "../src/data/phosphor-icons.ts";

const expected = [
  "arrow-left", "plus", "x", "heart", "magnifying-glass", "camera",
  "printer", "share-network", "chef-hat", "shopping-cart", "timer",
  "caret-left", "caret-right", "leaf", "calendar-blank", "translate",
];

test("icon colour comes from CSS tokens and dark buttons use the light token", () => {
  const css = fs.readFileSync("src/app/[locale]/globals.css", "utf8");
  const icon = fs.readFileSync("src/components/Icon.tsx", "utf8");
  assert.match(css, /--icon-color:\s*#7b6f6f/i);
  assert.match(css, /--icon-color-on-dark:\s*#f7f6f3/i);
  assert.match(icon, /var\(--icon-color\)/);
  for (const file of ["src/components/FridgeSearch.tsx", "src/components/DishSearch.tsx"]) {
    assert.match(fs.readFileSync(file, "utf8"), /--icon-color-on-dark/);
  }
});

test("all required Phosphor duotone icons are present", () => {
  for (const name of expected) {
    assert.ok(phosphorIcons[name]?.length > 20, name);
    assert.match(phosphorIcons[name], /currentColor/, name);
  }
});
