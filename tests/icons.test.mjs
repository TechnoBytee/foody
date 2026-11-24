import { test } from "node:test";
import assert from "node:assert/strict";
import { phosphorIcons } from "../src/data/phosphor-icons.ts";

const expected = [
  "arrow-left", "plus", "x", "heart", "magnifying-glass", "camera",
  "printer", "share-network", "chef-hat", "shopping-cart", "timer",
  "caret-left", "caret-right", "leaf", "calendar-blank", "translate",
];

test("all required Phosphor duotone icons are present", () => {
  for (const name of expected) {
    assert.ok(phosphorIcons[name]?.length > 20, name);
    assert.match(phosphorIcons[name], /currentColor/, name);
  }
});
