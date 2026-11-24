import { test } from "node:test";
import assert from "node:assert/strict";
import vocab from "../scripts/ingredient-vocabulary.cjs";

test("keeps canonical single ingredients", () => {
  assert.equal(vocab.isSingleIngredient("domates", "tr"), true);
  assert.equal(vocab.isSingleIngredient("kırmızı mercimek", "tr"), true);
  assert.equal(vocab.isSingleIngredient("red lentils", "en"), true);
  assert.equal(vocab.isSingleIngredient("garlic", "en"), true);
});

test("drops instruction sentences, quantities and phrase leftovers", () => {
  assert.equal(vocab.isSingleIngredient("acı seviyorsanız çok az acı toz biber ekleyebilirsiniz", "tr"), false);
  assert.equal(vocab.isSingleIngredient("1 su bardağı un", "tr"), false);
  assert.equal(vocab.isSingleIngredient("domates, soğan", "tr"), false);
  assert.equal(vocab.isSingleIngredient("additional 1 cup of hot water", "en"), false);
  assert.equal(vocab.isSingleIngredient("all kinds of leftover dishes", "en"), false);
  assert.equal(vocab.isSingleIngredient("a".repeat(31), "en"), false);
});

test("pruneVocabulary preserves order and removes noise", () => {
  assert.deepEqual(
    vocab.pruneVocabulary(["domates", "çok az ekleyin lütfen", "soğan"], "tr"),
    ["domates", "soğan"]
  );
});
