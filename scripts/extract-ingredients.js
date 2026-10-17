/**
 * Tüm tariflerdeki malzemeleri toplar ve malzemeler.json dosyasına yazar.
 * TR ve EN malzemeleri ayrı ayrı toplanır.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// Tüm tarif dosyalarını bul
const recipeFiles = [];

function findRecipeFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findRecipeFiles(fullPath);
    } else if (entry.name.endsWith('.ts') && entry.name !== 'index.ts' && entry.name !== 'types.ts' && entry.name !== 'areas.ts') {
      recipeFiles.push(fullPath);
    }
  }
}

findRecipeFiles(dataDir);

const trIngredients = new Set();
const enIngredients = new Set();

for (const file of recipeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // ingredients: { tr: [...], en: [...] } formatını bul
  const trMatch = content.match(/ingredients:\s*\{\s*tr:\s*\[([^\]]+)\]/g);
  const enMatch = content.match(/ingredients:\s*\{\s*tr:\s*\[[^\]]+\],\s*en:\s*\[([^\]]+)\]/g);
  
  if (trMatch) {
    for (const match of trMatch) {
      const itemsStr = match.match(/tr:\s*\[([^\]]+)\]/);
      if (itemsStr) {
        const items = itemsStr[1].match(/"([^"]+)"/g);
        if (items) {
          items.forEach(item => trIngredients.add(item.replace(/"/g, '')));
        }
      }
    }
  }
  
  if (enMatch) {
    for (const match of enMatch) {
      const itemsStr = match.match(/en:\s*\[([^\]]+)\]/);
      if (itemsStr) {
        const items = itemsStr[1].match(/"([^"]+)"/g);
        if (items) {
          items.forEach(item => enIngredients.add(item.replace(/"/g, '')));
        }
      }
    }
  }
}

const result = {
  tr: Array.from(trIngredients).sort(),
  en: Array.from(enIngredients).sort(),
};

const outputPath = path.join(rootDir, 'malzemeler.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');

console.log(`Toplam ${result.tr.length} Türkçe malzeme, ${result.en.length} İngilizce malzeme bulundu.`);
console.log(`Çıktı: ${outputPath}`);
