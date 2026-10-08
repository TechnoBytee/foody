import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "data", "mealdb");

const AREA_TR = {
  American: "Amerikan",
  Argentine: "Arjantinli",
  Australian: "Avustralyalı",
  Brazilian: "Brezilyalı",
  British: "İngiliz",
  Canadian: "Kanadalı",
  Caribbean: "Karayip",
  Chinese: "Çin",
  Croatian: "Hırvat",
  Dutch: "Hollandalı",
  Egyptian: "Mısırlı",
  Filipino: "Filipinli",
  French: "Fransız",
  Greek: "Yunan",
  Indian: "Hint",
  Indonesian: "Endonezyalı",
  Irish: "İrlandalı",
  Italian: "İtalyan",
  Jamaican: "Jamaikalı",
  Japanese: "Japon",
  Kenyan: "Kenyalı",
  Malaysian: "Malezyalı",
  Mexican: "Meksikalı",
  Moroccan: "Fas",
  Norwegian: "Norveçli",
  Polish: "Leh",
  Portuguese: "Portekizli",
  Russian: "Rus",
  "Saudi Arabian": "Suudi",
  Spanish: "İspanyol",
  Syrian: "Suriyeli",
  Thai: "Tay",
  Tunisian: "Tunuslu",
  Turkish: "Türk",
  Ukrainian: "Ukraynalı",
  Venezuelan: "Venezuelalı",
  Vietnamese: "Vietnamlı",
  Netherlands: "Hollandalı",
  Algerian: "Cezayirli",
  International: "Dünya Mutfağı",
  United: "Amerikan",
  "United States": "Amerikan",
  India: "Hint",
  France: "Fransız",
  Norway: "Norveçli",
  Venezuela: "Venezuelalı",
  Vietnam: "Vietnamlı",
  Argentina: "Arjantinli",
};

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts") || f === "index.ts") continue;
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(
    /"area":\s*\{\s*"tr":\s*"([^"]*)",\s*"en":\s*"([^"]*)"\s*\}/g,
    (_, tr, en) => {
      const trName = AREA_TR[en] || AREA_TR[tr] || tr;
      return `"area": { "tr": "${trName}", "en": "${en}" }`;
    }
  );

  fs.writeFileSync(filePath, content);
  console.log("Normalized:", f);
}
console.log("Done!");
