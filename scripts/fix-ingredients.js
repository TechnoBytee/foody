/**
 * Mevcut tüm tariflerin ingredients alanını { tr: string[]; en: string[] } formatına dönüştürür.
 * Hem "ingredients": [...] hem de ingredients: [...] formatlarını destekler.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const filesToUpdate = [
  'recipes.ts',
  'tarihi/antik-akdeniz.ts',
  'tarihi/bizans-islam.ts',
  'tarihi/cin-hint.ts',
  'tarihi/diyarbakir.ts',
  'tarihi/erzurum.ts',
  'tarihi/mezopotamya.ts',
  'tarihi/ortacag-avrupa.ts',
  'tarihi/turk-anadolu.ts',
  'mealdb/baslangic.ts',
  'mealdb/deniz.ts',
  'mealdb/et.ts',
  'mealdb/kahvalti.ts',
  'mealdb/kuzu.ts',
  'mealdb/makarna.ts',
  'mealdb/tatli.ts',
  'mealdb/tavuk.ts',
  'mealdb/vegan.ts',
  'mealdb/vejetaryen.ts',
  'mealdb/yan_yemek.ts',
];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Satır satır işle
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // "ingredients": [ veya ingredients: [ ile başlayan satırı bul (tırnaklı veya tırnaksız)
    const match = line.match(/^(\s*)"?ingredients"?:\s*\[(.*)$/);
    if (match) {
      const indent = match[1];
      const hasQuotes = line.includes('"ingredients"');
      let rest = match[2];
      
      // ] kadar olan satırları topla
      let itemsStr = rest;
      while (!itemsStr.includes(']') && i + 1 < lines.length) {
        i++;
        itemsStr += ' ' + lines[i].trim();
      }
      
      // itemsStr'den ] öncesini al
      const bracketIdx = itemsStr.indexOf(']');
      if (bracketIdx !== -1) {
        itemsStr = itemsStr.substring(0, bracketIdx);
      }
      
      // Stringleri parse et
      const items = [];
      const regex = /"([^"]+)"/g;
      let m;
      while ((m = regex.exec(itemsStr)) !== null) {
        items.push(m[1]);
      }
      
      if (items.length === 0) {
        result.push(`${indent}"ingredients": { tr: [], en: [] },`);
      } else {
        const trItems = items.map(item => `"${item}"`).join(', ');
        const enItems = items.map(item => `"${item}"`).join(', ');
        if (hasQuotes) {
          result.push(`${indent}"ingredients": { tr: [${trItems}], en: [${enItems}] },`);
        } else {
          result.push(`${indent}ingredients: { tr: [${trItems}], en: [${enItems}] },`);
        }
      }
      changed = true;
    } else {
      result.push(line);
    }
    i++;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, result.join('\n'), 'utf8');
    console.log(`Güncellendi: ${path.relative(dataDir, filePath)}`);
  } else {
    console.log(`Değişiklik yok: ${path.relative(dataDir, filePath)}`);
  }
}

for (const file of filesToUpdate) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`Dosya bulunamadı: ${file}`);
    continue;
  }
  fixFile(filePath);
}

console.log('\nTüm ingredients alanları güncellendi.');
