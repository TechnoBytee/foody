// Malzeme öneri sözlüğünde yalnızca tek malzemeleri tutmak için kurallar.
// Jeneratör ve testler aynı filtreyi kullanır.
const NOISE = {
  tr: /\b(ekleyin|ekle|karistir|karistirin|doğrayın|doğra|servis|isteğe|varsa|yeteri|kadar|hazırlayın|kullanın|koyun|alın|rendelayin|çok|az|biraz)\b/i,
  en: /\b(add|mix|stir|serve|optional|enough|use|place|chop|prepare|leftover|additional|kinds|some|little|plenty)\b/i,
};

function isSingleIngredient(text, lang) {
  const value = String(text).trim();
  if (!value || value.length > 30) return false;
  if (/[\d½¼¾⅓⅔]/.test(value)) return false;
  if (/[,;()]/.test(value)) return false;
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length > 3) return false;
  return !(NOISE[lang] ?? NOISE.en).test(value);
}

function pruneVocabulary(list, lang) {
  return list.filter((item) => isSingleIngredient(item, lang));
}

module.exports = { isSingleIngredient, pruneVocabulary };
