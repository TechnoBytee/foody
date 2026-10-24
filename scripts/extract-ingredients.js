/**
 * Tum tariflerdeki malzemeleri cikarir, miktarlari atar, varyantlari birlestirir
 * ve kanonik malzeme listesini yazar.
 *
 *   node scripts/extract-ingredients.js          -> sadece listeyi yaz + rapor
 *   node scripts/extract-ingredients.js --apply  -> tariflerdeki yazimlari da duzeltir
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src", "data");
const APPLY = process.argv.includes("--apply");

// ---------------------------------------------------------------- toplama

const trRaw = new Map(); // canonicalAday -> {form: sayi}
const enRaw = new Map();

function addTo(map, form) {
  if (!form) return;
  const key = fold(form);
  if (!map.has(key)) map.set(key, new Map());
  const forms = map.get(key);
  forms.set(form, (forms.get(form) || 0) + 1);
}

function harvest(trList, enList) {
  (trList || []).forEach((s) => addTo(trRaw, stripTr(s)));
  (enList || []).forEach((s) => addTo(enRaw, stripEn(s)));
}

function parseItems(body) {
  const out = [];
  const r = /"((?:[^"\\]|\\.)*)"/g;
  let x;
  while ((x = r.exec(body)) !== null) out.push(x[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
  return out;
}

// toplama burada calisir: stripTr/stripEn ve unit setleri once tanimlanmali
const nefisDir = path.join(dataDir, "tarifler");

function collectAll() {
  // nefis dosyalari saf JSON -> tam dogruluk
  for (const file of fs.readdirSync(nefisDir)) {
    if (file === "index.ts") continue;
    const src = fs.readFileSync(path.join(nefisDir, file), "utf8");
    const start = src.indexOf("= ");
    const list = JSON.parse(src.slice(start + 2, src.lastIndexOf(";")).trim());
    list.forEach((r) => harvest(r.ingredients?.tr, r.ingredients?.en));
  }

  // el yazimi mealdb/tarihi/recipes.ts -> JS nesne literal, regex ile
  const handWritten = [
    "recipes.ts",
    ...fs.readdirSync(path.join(dataDir, "tarihi")).map((f) => `tarihi/${f}`),
    ...fs.readdirSync(path.join(dataDir, "mealdb"))
      .filter((f) => f !== "index.ts" && f !== "stats.md")
      .map((f) => `mealdb/${f}`),
  ];
  const re = /"?ingredients"?:\s*\{\s*"?(tr|en)"?:\s*\[([\s\S]*?)\]\s*,\s*"?(tr|en)"?:\s*\[([\s\S]*?)\]/g;
  for (const rel of handWritten) {
    const p = path.join(dataDir, rel);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, "utf8");
    let m;
    while ((m = re.exec(src)) !== null) {
      const trKey = m[1];
      const trItems = m[2];
      const enKey = m[3];
      const enItems = m[4];
      (trKey === "tr" ? (trItems ? parseItems(trItems) : []) : []).forEach((s) =>
        addTo(trRaw, stripTr(s))
      );
      (enKey === "en" ? (enItems ? parseItems(enItems) : []) : []).forEach((s) =>
        addTo(enRaw, stripEn(s))
      );
    }
  }
}

// ---------------------------------------------------------------- normalize

const FOLD = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
const fold = (s) => {
  return s
    .toLowerCase()
    .replace(/[çğıöşüâîû]/g, (c) => FOLD[c] || c)
    .replace(/[^a-z0-9]+/g, ""); // bosluk ve noktalama farklarini da birlestirir
};

// ayni katlama ama BOSLUK KORUR: birim/sayi setleri "su bardagi" tek parca olarak durmali
const foldSpaced = (s) =>
  s
    .toLowerCase()
    .replace(/[çğıöşüâîû]/g, (c) => FOLD[c] || c)
    .replace(/[.,;:!?]+$/, "")
    .trim();

const TR_NUM = new Set(
  ("bir iki iki üç dört beş altı yedi sekiz dokuz on yarım çeyrek birkaç yaklaşık çoğu az " +
    "yirmi otuz kırk elli yüz")
    .split(" ")
    .map(foldSpaced)
);
const TR_UNIT2 = new Set(
  [
    "su bardagi",
    "cay bardagi",
    "yemek kasigi",
    "tatli kasigi",
    "cay kasigi",
    "tuz kasigi",
    "kahve kasigi",
    "corba kasigi",
  ].map(foldSpaced)
);
const TR_UNIT1 = new Set(
  ("bardak kasigi adet tane dilim parca gram gr kg ml litre lt cc dis dal avuc tutam fiske " +
    "damla kase paket kutu sise kip yaprak basak tadim yudum kucuk orta buyuk boy")
    .split(" ")
    .map(foldSpaced)
);

const EN_NUM = new Set(
  ("one two three four five six seven eight nine ten eleven twelve half quarter a an couple " +
    "dozen of plus about approximately")
    .split(" ")
    .map(foldSpaced)
);
const EN_UNIT2 = new Set(
  ["fl oz", "fl. oz.", "fluid ounces"].map(foldSpaced)
);
const EN_UNIT1 = new Set(
  (
    "cup cups tbsp tbsp. tbs tbs. tablespoon tablespoons tsp tsp. teaspoon teaspoons " +
    "oz ounce g gram grams kg ml milliliter l liter litre liters lb lbs pound " +
    "can cans packet packets slice slices piece pieces clove cloves sprig sprigs " +
    "bunch bunches head heads stalk stalks large medium small whole fresh raw " +
    "optional pinch dashes"
  )
    .split(" ")
    .map(foldSpaced)
);

function stripFrom(str, nums, unit2, unit1) {
  let words = String(str)
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF\uFE0F]/g, "") // zero-width + varyasyon secici
    .replace(/^[\s\u00A0]*[-‐‑‒–—―−+*•·●▪◦>»]+[\s\u00A0]*/, "") // bastaki madde isareti
    .replace(/\((?:[^()]*)\)/g, " ") // parantez icerigi (aciklama) atilir
    .replace(/\(\s*\)/g, " ") // bos parantez kalintisi
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  let i = 0;
  // aralık miktarları da ("8 -10 adet") tireyi kelime başında silsin
  const LEAD = /^[-‐‑‒–—―−+]+\s*/;
  while (i < words.length) {
    const raw = words[i];
    const w = raw
      .replace(LEAD, "")
      .toLowerCase()
      .replace(/[çğıöşüâîû]/g, (c) => FOLD[c] || c)
      .replace(/[.,;:!?)]+$/, "");
    const next = (words[i + 1] || "")
      .replace(LEAD, "")
      .toLowerCase()
      .replace(/[çğıöşüâîû]/g, (c) => FOLD[c] || c)
      .replace(/[.,;:!?)]+$/, "");
    if (w === "") {
      i++;
      continue;
    }
    if (/^[\d]/.test(w.replace(/^[.,]+/, "")) || /^[½¼¾⅓⅔]$/.test(w)) {
      i++;
      continue;
    }
    if (nums.has(w)) {
      i++;
      continue;
    }
    if (unit2.has(`${w} ${next}`)) {
      i += 2;
      continue;
    }
    if (unit1.has(w)) {
      i++;
      continue;
    }
    break;
  }
  return words
    .slice(i)
    .join(" ")
    .replace(/\s*[;,]+\s*$/, "")
    .trim();
}

const stripTr = (s) => stripFrom(s, TR_NUM, TR_UNIT2, TR_UNIT1);
const stripEn = (s) => stripFrom(s, EN_NUM, EN_UNIT2, EN_UNIT1);

collectAll();

// varyantlari birlestirip kanonik formu sec.
// ONCELIK sirasi:
//  1) parantez icermeyen temiz form ("butter" > "butter ( )")
//  2) bitisik yazilmis degil ayri kelime form ("pul biber" > "pulbiber")
//  3) en cok gecen, 4) en kisa. Gorunen form her zaman kucuk harf.
const dirty = (f) => /[()]|[^\p{L}\p{N}\s+.,-]/u.test(f);

function canonical(map) {
  const list = [];
  for (const forms of map.values()) {
    const sorted = [...forms.entries()].sort(
      (a, b) =>
        Number(dirty(a[0])) - Number(dirty(b[0])) ||
        b[0].split(" ").length - a[0].split(" ").length ||
        b[1] - a[1] ||
        a[0].length - b[0].length ||
        a[0].localeCompare(b[0])
    );
    const variants = sorted
      .map(([f, n]) => ({ f: f.toLowerCase().trim(), n }))
      .filter((v, i, arr) => arr.findIndex((x) => x.f === v.f) === i);
    list.push({ canonical: variants[0].f, variants });
  }
  return list.sort((a, b) => a.canonical.localeCompare(b.canonical, "tr"));
}

const trCanon = canonical(trRaw);
const enCanon = canonical(enRaw);

const merged = [...trCanon, ...enCanon].filter((e) => e.variants.length > 1);
const stillHasAmount = [...trCanon, ...enCanon].filter((e) => /\d|[½¼¾]/.test(e.canonical));

const trOut = trCanon.map((e) => e.canonical);
const enOut = enCanon.map((e) => e.canonical);

fs.writeFileSync(
  path.join(dataDir, "ingredient-search.json"),
  JSON.stringify({ tr: trOut, en: enOut }, null, 2),
  "utf8"
);
fs.writeFileSync(
  path.join(root, "malzemeler.json"),
  JSON.stringify({ tr: trOut, en: enOut }, null, 2),
  "utf8"
);

console.log(`TR kanonik: ${trOut.length}  (varyant birlestirmesi sonrasi)`);
console.log(`EN kanonik: ${enOut.length}`);
console.log(`\nBirlestirilen varyant gruplari: ${merged.length}`);
merged.slice(0, 40).forEach((e) => {
  const others = e.variants.filter((v) => v.f !== e.canonical).map((v) => `"${v.f}"x${v.n}`);
  console.log(`  "${e.canonical}"  <-  ${others.join(", ")}`);
});
if (merged.length > 40) console.log(`  ... +${merged.length - 40} grup daha`);

console.log(`\nHâlâ miktari iceren kayitlar: ${stillHasAmount.length}`);
stillHasAmount
  .slice(0, 15)
  .forEach((e) => console.log(`  "${e.canonical}"`));

// ---------------------------------------------------------------- tarif yazimi duzeltme

if (APPLY) {
  // varyant -> kanonik eslemesi, foldSpaced anahtarli (buyuk/kucuk harf duyarsiz)
  const buildMap = (canon) => {
    const m = new Map();
    for (const e of canon) for (const v of e.variants) m.set(foldSpaced(v.f), e.canonical);
    return m;
  };
  const trMap = buildMap(trCanon);
  const enMap = buildMap(enCanon);

  const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // tek regex alternation; uzun varyantlar once (kisa form uzunu yutmasin)
  const reFor = (map) => {
    const variants = [...map.entries()]
      .filter(([v, c]) => v !== c && v.length >= 3)
      .sort((a, b) => b[0].length - a[0].length);
    if (variants.length === 0) return null;
    return {
      re: new RegExp(`(^|[^\\p{L}])(${variants.map(([v]) => esc(v)).join("|")})(?![\\p{L}])`, "giu"),
      map,
    };
  };
  const trRe = reFor(trMap);
  const enRe = reFor(enMap);

  const fixLine = (line, lang) => {
    const pack = lang === "tr" ? trRe : enRe;
    if (!pack) return line;
    return line.replace(pack.re, (m0, pre, hit) => pre + (pack.map.get(foldSpaced(hit)) ?? hit));
  };

  let touched = [];

  // 1) nefis dosyalari: saf JSON, yeniden serilestirerek yaz
  for (const file of fs.readdirSync(nefisDir)) {
    if (file === "index.ts") continue;
    const fp = path.join(nefisDir, file);
    const src = fs.readFileSync(fp, "utf8");
    const start = src.indexOf("= ");
    const head = src.slice(0, start + 2);
    const tail = src.slice(src.lastIndexOf(";"));
    const list = JSON.parse(src.slice(start + 2, src.lastIndexOf(";")).trim());
    for (const r of list) {
      if (r.ingredients?.tr) r.ingredients.tr = r.ingredients.tr.map((x) => fixLine(x, "tr"));
      if (r.ingredients?.en) r.ingredients.en = r.ingredients.en.map((x) => fixLine(x, "en"));
    }
    const next = head + JSON.stringify(list, null, 2) + tail;
    if (next !== src) {
      fs.writeFileSync(fp, next, "utf8");
      touched.push(`nefis/${file}`);
    }
  }

  // 2) el yazimi dosyalar: yalnizca tr/en dizelerinin govdesi icinde degistir
  const handWritten = [
    "recipes.ts",
    ...fs.readdirSync(path.join(dataDir, "tarihi")).map((f) => `tarihi/${f}`),
    ...fs.readdirSync(path.join(dataDir, "mealdb"))
      .filter((f) => f !== "index.ts" && f !== "stats.md")
      .map((f) => `mealdb/${f}`),
  ];
  const bodyRe =
    /("?ingredients"?:\s*\{\s*)"?(tr|en)"?:\s*\[([\s\S]*?)\]\s*,\s*"?(tr|en)"?:\s*\[([\s\S]*?)\]/g;
  for (const rel of handWritten) {
    const fp = path.join(dataDir, rel);
    if (!fs.existsSync(fp)) continue;
    const src = fs.readFileSync(fp, "utf8");
    const next = src.replace(
      bodyRe,
      (full, pre, k1, b1, k2, b2) =>
        pre +
        `"${k1}": [${fixItems(b1, k1)}], ` +
        `"${k2}": [${fixItems(b2, k2)}]`
    );
    if (next !== src) {
      fs.writeFileSync(fp, next, "utf8");
      touched.push(rel);
    }
  }

  function fixItems(body, lang) {
    // JSON.stringify tırnaklı ve kaçışlı JS dizesi üretir; tırnağı soyma yok
    return parseItems(body).map((x) => JSON.stringify(fixLine(x, lang))).join(", ");
  }

  console.log(`\n--apply: ${touched.length} dosya guncellendi.`);
  touched.forEach((f) => console.log(`  ${f}`));
}
