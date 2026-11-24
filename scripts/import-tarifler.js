/**
 * tarifler.json dosyasındaki tarifleri mevcut Recipe tipine dönüştürür
 * ve src/data/tarifler/ klasörüne kategorilere ayırarak yazar.
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const tariflerPath = path.join(rootDir, 'tarifler.json');
const outputDir = path.join(rootDir, 'src', 'data', 'tarifler');

// Kategori eşleştirmeleri: tarifler.json kategorisi -> mevcut cuisine slug
const categoryMapping = {
  'Atıştırmalıklar': { slug: 'atistirmalik', name: { tr: 'Atıştırmalıklar', en: 'Snacks' } },
  'Baklagil Yemekleri': { slug: 'baklagil', name: { tr: 'Baklagil Yemekleri', en: 'Legume Dishes' } },
  'Bebek Yemekleri': { slug: 'bebek', name: { tr: 'Bebek Yemekleri', en: 'Baby Food' } },
  'Çocuk Menüleri': { slug: 'cocuk', name: { tr: 'Çocuk Menüleri', en: 'Kids Menu' } },
  'Çorbalar': { slug: 'corba', name: { tr: 'Çorbalar', en: 'Soups' } },
  'Kiler ve Hazırlıklar': { slug: 'kiler', name: { tr: 'Kiler ve Hazırlıklar', en: 'Pantry & Prep' } },
  'Hafif ve Diyet': { slug: 'diyet', name: { tr: 'Hafif ve Diyet', en: 'Light & Diet' } },
  'Dolmalar ve Sarmalar': { slug: 'dolma', name: { tr: 'Dolmalar ve Sarmalar', en: 'Stuffed & Wrapped' } },
  'Et ve Protein Yemekleri': { slug: 'et', name: { tr: 'Et ve Protein Yemekleri', en: 'Meat & Protein' } },
  'Hamur İşleri': { slug: 'hamur', name: { tr: 'Hamur İşleri', en: 'Dough & Pastry' } },
  'Hızlı ve Pratik': { slug: 'hizli', name: { tr: 'Hızlı ve Pratik', en: 'Quick & Easy' } },
  'İçecekler': { slug: 'icecek', name: { tr: 'İçecekler', en: 'Drinks' } },
  'Kahvaltılık': { slug: 'kahvalti', name: { tr: 'Kahvaltılık', en: 'Breakfast' } },
  'Kurabiyeler': { slug: 'kurabiye', name: { tr: 'Kurabiyeler', en: 'Cookies' } },
  'Makarnalar': { slug: 'makarna', name: { tr: 'Makarnalar', en: 'Pasta' } },
  'Pilavlar': { slug: 'pilav', name: { tr: 'Pilavlar', en: 'Rice Dishes' } },
  'Salatalar ve Mezeler': { slug: 'salata', name: { tr: 'Salatalar ve Mezeler', en: 'Salads & Mezze' } },
  'Sandviçler': { slug: 'sandvic', name: { tr: 'Sandviçler', en: 'Sandwiches' } },
  'Sebze Yemekleri': { slug: 'sebze', name: { tr: 'Sebze Yemekleri', en: 'Vegetable Dishes' } },
  'Tatlılar': { slug: 'tatli', name: { tr: 'Tatlılar', en: 'Desserts' } },
  'Yumurta Yemekleri': { slug: 'yumurta', name: { tr: 'Yumurta Yemekleri', en: 'Egg Dishes' } },
};

// Zaten mevcut olan cuisine slug'ları
const existingSlugs = ['turk', 'italyan', 'uzak-dogu', 'akdeniz', 'tatli', 'kahvalti', 'et', 'tavuk', 'kuzu', 'makarna', 'deniz', 'yan-yemek', 'baslangic', 'vegan', 'vejetaryen', 'corba'];

// Mevcut slug'larla çakışanları yeniden adlandır
const finalMapping = {};
for (const [key, value] of Object.entries(categoryMapping)) {
  if (existingSlugs.includes(value.slug)) {
    // Çakışma var, ön ek ekle
    finalMapping[key] = {
      ...value,
      slug: `nefis-${value.slug}`,
    };
  } else {
    finalMapping[key] = value;
  }
}

// Çakışanları kontrol et
console.log('Kategori eşleştirmeleri:');
for (const [key, value] of Object.entries(finalMapping)) {
  console.log(`  ${key} -> ${value.slug}`);
}

// Tarifleri dönüştür
const tarifler = JSON.parse(fs.readFileSync(tariflerPath, 'utf8'));

const converted = [];
let idCounter = 0;

for (const [category, recipes] of Object.entries(tarifler)) {
  const catInfo = finalMapping[category];
  if (!catInfo) {
    console.warn(`Uyarı: "${category}" kategorisi eşleştirilemedi, atlanıyor.`);
    continue;
  }

  for (const recipe of recipes) {
    idCounter++;
    const id = `nefis-${catInfo.slug}-${idCounter}`;
    
    // shortcut: kaynakta süre/kalori/zorluk yok; 0 = "bilinmiyor", arayüz gizler.
    // Adım sayısından tahmin üretmek yanıltıcıydı; jeneratör artık deterministik.
    const time = 0;
    const difficulty = 'easy';
    const calories = 0;

    converted.push({
      id,
      name: recipe.yemek_adi,
      cuisine: catInfo.slug,
      time,
      difficulty,
      ingredients: {
        tr: recipe.malzemeler?.tr || [],
        en: recipe.malzemeler?.en || [],
      },
      steps: {
        tr: recipe.yapilis_tarifi?.tr || [],
        en: recipe.yapilis_tarifi?.en || [],
      },
      alternatives: [],
      calories,
      image: undefined,
      area: { tr: 'Türkiye', en: 'Turkey' },
    });
  }
}

console.log(`\nToplam ${converted.length} tarif dönüştürüldü.`);

// Çıktı klasörünü oluştur
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Kategorilere ayır ve yazar
const byCategory = {};
for (const recipe of converted) {
  if (!byCategory[recipe.cuisine]) {
    byCategory[recipe.cuisine] = [];
  }
  byCategory[recipe.cuisine].push(recipe);
}

// Her kategori için ayrı dosya oluştur
for (const [slug, recipes] of Object.entries(byCategory)) {
  const catInfo = Object.values(finalMapping).find(c => c.slug === slug);
  const fileName = `${slug}.ts`;
  const filePath = path.join(outputDir, fileName);
  
  const content = `import type { Recipe } from "../types";

export const ${slug.replace(/-/g, '_')}Recipes: Recipe[] = ${JSON.stringify(recipes, null, 2)};
`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ${fileName}: ${recipes.length} tarif`);
}

// Index dosyası oluştur
const indexContent = `import type { Recipe } from "../types";
${Object.keys(byCategory).map(slug => `import { ${slug.replace(/-/g, '_')}Recipes } from "./${slug}";`).join('\n')}

export const nefisRecipes: Recipe[] = [
${Object.keys(byCategory).map(slug => `  ...${slug.replace(/-/g, '_')}Recipes,`).join('\n')}
];

// Kategori bilgileri
export const nefisCategories = [
${Object.values(finalMapping).map(c => `  { slug: "${c.slug}", name: { tr: "${c.name.tr}", en: "${c.name.en}" } },`).join('\n')}
];
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf8');
console.log(`\nIndex dosyası oluşturuldu: src/data/tarifler/index.ts`);
console.log(`Toplam ${Object.keys(byCategory).length} kategori, ${converted.length} tarif.`);
