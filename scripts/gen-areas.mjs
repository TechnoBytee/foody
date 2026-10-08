import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "src", "data", "mealdb");
const areas = {};

for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith(".ts") || f === "index.ts") continue;
  const c = fs.readFileSync(path.join(dir, f), "utf8");
  const m = c.match(/"area":\s*\{[^}]+\}/g) || [];
  m.forEach((a) => {
    const t = a.match(/"tr":\s*"([^"]+)"/);
    const e = a.match(/"en":\s*"([^"]+)"/);
    if (t && e) {
      if (!areas[e[1]]) areas[e[1]] = { tr: t[1], count: 0 };
      areas[e[1]].count++;
    }
  });
}

const list = Object.entries(areas)
  .map(([en, { tr, count }]) => ({
    slug: en.toLowerCase().replace(/\s+/g, "-"),
    name: { tr, en },
    count,
  }))
  .sort((a, b) => b.count - a.count);

const content = `import type { Area } from "./types";

export const areas: Area[] = [
${list.map((a) => `  { slug: "${a.slug}", name: { tr: "${a.name.tr}", en: "${a.name.en}" }, count: ${a.count} },`).join("\n")}
];
`;

fs.writeFileSync(path.join(dir, "..", "areas.ts"), content);
console.log(`Generated areas.ts with ${list.length} regions`);
