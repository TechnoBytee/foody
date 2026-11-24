// Tek seferlik veri düzeltmesi: ithal Nefis tariflerindeki tahmini
// süre/kalori/zorluk değerlerini "bilinmiyor" sentinel'ine çevirir.
// Jeneratör artık bu değerleri doğru ürettiği için yeniden üretimde de güvenli.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "data", "tarifler");
let changed = 0;

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".ts") || file === "index.ts") continue;
  const filePath = path.join(dir, file);
  const source = fs.readFileSync(filePath, "utf8");
  const next = source
    .replace(/"time":\s*\d+/g, '"time": 0')
    .replace(/"difficulty":\s*"(?:easy|medium|hard)"/g, '"difficulty": "easy"')
    .replace(/"calories":\s*\d+/g, '"calories": 0');
  if (next !== source) {
    fs.writeFileSync(filePath, next, "utf8");
    changed++;
  }
}
console.log(`Sanitized metadata in ${changed} category files.`);
