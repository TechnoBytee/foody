// Veri yeniden üretimi için tek giriş noktası.
// Sıra önemli: çeviri/düzeltmeler jeneratörlerden önce, türevler sonra çalışır.
// shortcut: fetch-mealdb ağ gerektirdiği için varsayılan olarak atlanır;
// taze indirme gerekirse --fetch ile eklenir.
import { spawnSync } from "node:child_process";

const fetchFirst = process.argv.includes("--fetch");
const steps = [
  ...(fetchFirst ? ["fetch-mealdb.mjs"] : []),
  "translate-mealdb.mjs",
  "fix-ingredients.js",
  "normalize-areas.mjs",
  "tag-soups.mjs",
  "gen-areas.mjs",
  "import-tarifler.js",
  "extract-ingredients.js",
];

for (const step of steps) {
  console.log(`\n> ${step}`);
  const result = spawnSync(process.execPath, [new URL(step, import.meta.url).pathname], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error(`${step} başarısız (çıkış kodu ${result.status})`);
    process.exit(result.status ?? 1);
  }
}
console.log("\nVeri hazırlığı tamamlandı.");
