import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "data", "mealdb");
const soupPattern = /soup|çorba|broth|porridge|pottage|frumenty|chowder|bisque|gazpacho|minestrone|borscht|chorba/i;

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts") || f === "index.ts") continue;
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, "utf8");

  const matches =
    content.match(
      /("id":\s*"[^"]+"[\s\S]*?"cuisine":\s*"([^"]+)"[\s\S]*?"name":\s*\{\s*"tr":\s*"([^"]+)")/g
    ) || [];

  for (const m of matches) {
    const nameMatch = m.match(/"tr":\s*"([^"]+)"/);
    if (nameMatch && soupPattern.test(nameMatch[1])) {
      const idMatch = m.match(/"id":\s*"([^"]+)"/);
      if (idMatch) {
        const id = idMatch[1];
        const recipePattern = new RegExp(
          `("id":\\s*"${id}"[\\s\\S]*?"cuisine":\\s*"[^"]+")([\\s\\S]*?)(?=\\n  \\},|\\n  \\},\\n|\\n\\])`
        );
        content = content.replace(recipePattern, (match, cuisinePart, rest) => {
          if (rest.includes('"categories"')) return match;
          return `${cuisinePart},\n    "categories": ["corba"]${rest}`;
        });
      }
    }
  }

  fs.writeFileSync(filePath, content);
  console.log("Updated:", f);
}
console.log("Done!");
