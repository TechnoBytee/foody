import fs from "node:fs";
import path from "node:path";

const tarihiDir = path.join(process.cwd(), "src", "data", "tarihi");
const mapping = {
  "tarih-mezopotamya": "et",
  "tarih-antik-akdeniz": "et",
  "tarih-cin-hint": "et",
  "tarih-bizans-islam": "et",
  "tarih-ortacag-avrupa": "et",
  "tarih-turk-anadolu": "turk",
  "tarih-erzurum": "turk",
  "tarih-diyarbakir": "turk",
};

const files = fs
  .readdirSync(tarihiDir)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts");

for (const file of files) {
  const filePath = path.join(tarihiDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  for (const [oldSlug, newSlug] of Object.entries(mapping)) {
    content = content.replaceAll(`cuisine: "${oldSlug}"`, `cuisine: "${newSlug}"`);
  }

  fs.writeFileSync(filePath, content);
  console.log("Updated:", file);
}
console.log("Migration complete!");
