import type { Recipe } from "../types";

// Tarihî Çin ve Hint mutfaklarından kayıtlı tarifler.
export const cinHintRecipes: Recipe[] = [
  {
    id: "laba-jo-lapasi",
    name: { tr: "Laba Jo (Laba Lapası)", en: "Laba Jo (Laba Porridge)" },
    cuisine: "tarih-cin-hint",
    time: 75,
    difficulty: "easy",
    ingredients: ["pirinç", "baklagil", "buğday", "kırmızı fasulye", "hurma", "fıstık", "şeker"],
    steps: {
      tr: [
        "Sekiz çeşit tahılı ayrı ayrı pişirin.",
        "Pirinç ve baklagilleri bir tencerede kaynatın.",
        "Tatlılar, hurma ve fıstık ekleyip kıvam verene kadar karıştırın.",
      ],
      en: [
        "Cook eight different grains separately.",
        "Simmer rice and legumes together in a pot.",
        "Add the dried fruits, dates and nuts and stir until thick.",
      ],
    },
    alternatives: ["Kasha", "Pottage", "Laba Geleneği"],
    calories: 340,
    era: { tr: "MS 10. yüzyıl (Song Hanedanı)", en: "10th century CE (Song)" },
    region: { tr: "Çin", en: "China" },
    history: {
      tr: "Laba Bayramı'nda sekiz tahılla kaynatılan geleneksel lapa; 'seçizhibei' adıyla bugün de evlerde yapılır.",
      en: "The eight-grain porridge of the Laba festival - still made in homes under the name 'shizhibei'.",
    },
  },
  {
    id: "tangyuan-yumasi",
    name: { tr: "Tangyuan (Halk Tıkacısı)", en: "Tangyuan (Reunion Dumplings)" },
    cuisine: "tarih-cin-hint",
    time: 50,
    difficulty: "medium",
    ingredients: ["yapışkan pirinç unu", "yer fıstığı ezmesi", "pekmez", "susam", "gül suyu"],
    steps: {
      tr: [
        "Pirinç unuyla yumuşak hamur yapın.",
        "Dolgu koyup yuvarlak yumurtaları kapatın.",
        "Suyu biraz tuzla kaynatıp içinde pişirin, üzerine susam serpin.",
      ],
      en: [
        "Make a soft dough from glutinous rice flour.",
        "Fill and seal into round balls.",
        "Boil in lightly salted water, top with sesame.",
      ],
    },
    alternatives: ["Kar Topu", "Mochi", "Boun"],
    calories: 280,
    era: { tr: "Han Hanedanı (M.Ö. 2. yüzyıl)", en: "Han dynasty (2nd century BCE)" },
    region: { tr: "Çin", en: "China" },
    history: {
      tr: "Ailenin birliğini simgeleyen haşlama tatlı yumağı; kış gündönümü 'Dongzhi' festivalinde de yeniden ortaya çıkar.",
      en: "A boiled sweet dumpling symbolising family reunion, resurfacing at the winter solstice festival.",
    },
  },
  {
    id: "dongzhi-tangyuan",
    name: { tr: "Dongzhi Tangyuan", en: "Dongzhi Tangyuan" },
    cuisine: "tarih-cin-hint",
    time: 45,
    difficulty: "medium",
    ingredients: ["yapışkan pirinç unu", "susam ezmesi", "şeker", "çiçek yaprağı"],
    steps: {
      tr: [
        "Susam ezmesiyle şekeri karıştırıp dolgu yapın.",
        "Kara kıtlama çorbası kıvamında hamur hazırlayın.",
        "Kış gündönümünde haşlayıp ılak servis edin.",
      ],
      en: [
        "Mix the sesame paste with sugar for the filling.",
        "Prepare the dough as in a winter solstice soup.",
        "Boil and serve warm at the solstice.",
      ],
    },
    alternatives: ["Tangyuan", "Mochi", "Kar Topu"],
    calories: 300,
    era: { tr: "MS 5. yüzyıl", en: "5th century CE" },
    region: { tr: "Çin (Güney ve Kuzey Hanedanları)", en: "China (Southern and Northern dynasties)" },
    history: {
      tr: "Güney ve Kuzey Hanedanları döneminde yazıya geçen, Anadolu'daki 'kar topu' gelenekleriyle benzer tatlı.",
      en: "A sweet recorded during the Southern and Northern dynasties, similar to Anatolian 'kar topu' traditions.",
    },
  },
  {
    id: "khichdi-pirinç-bakla",
    name: { tr: "Khichdi (Pirinç-Bakla Lapası)", en: "Khichdi (Rice and Pulse Porridge)" },
    cuisine: "tarih-cin-hint",
    time: 45,
    difficulty: "easy",
    ingredients: ["pirinç", "maş fasulyesi", "zerdeçal", "ghi", "kimyon", "tuz"],
    steps: {
      tr: [
        "Pirinç ve maş fasulyesini birlikte yıkayın.",
        "Ghi, zerdeçal ve kimyonla kavurup su ve tuz ekleyin.",
        "Ateşten alınca tereyağı ve limon ile servis edin.",
      ],
      en: [
        "Rinse rice and mung beans together.",
        "Fry in ghee with turmeric and cumin, add water and salt.",
        "Finish with ghee and lemon and serve.",
      ],
    },
    alternatives: ["Risotto", "Sebzeli Pilav", "Bulgur"],
    calories: 320,
    era: { tr: "M.Ö. 2. yüzyıl (Charaka dönemi)", en: "2nd century BCE (Charaka period)" },
    region: { tr: "Hindistan", en: "India" },
    history: {
      tr: "Charaka Samhita'da geçen, Hint alt kıtasının en eski kayıtlı yemeklerinden; yemek tıbbatı için de tarif edilirdi.",
      en: "Mentioned in the Charaka Samhita - among the earliest recorded Indian dishes, also written as dietary medicine.",
    },
  },
  {
    id: "pulao-baharatli-pilav",
    name: { tr: "Pulao (Baharatlı Pilav)", en: "Pulao (Spiced Pilaf)" },
    cuisine: "tarih-cin-hint",
    time: 60,
    difficulty: "medium",
    ingredients: ["pirinç", "et", "zerdeçal", "safran", "badem", "sogan", "tuz"],
    steps: {
      tr: [
        "Pirinçi yıkayıp zerdeçal ve safranlı suda bekletin.",
        "Sogani kavurup et ekleyin.",
        "Pirinci ekleyip buharlandırın, badem ile servis edin.",
      ],
      en: [
        "Soak rice in saffron and turmeric water.",
        "Brown onion, add the meat.",
        "Fold in the rice, steam and finish with almonds.",
      ],
    },
    alternatives: ["Biryani", "Kabu Pilavı", "Risotto"],
    calories: 480,
    era: { tr: "M.Ö. 4. yüzyıl", en: "4th century BCE" },
    region: { tr: "Orta Asya / Hindistan", en: "Central Asia / India" },
    history: {
      tr: "Büyük İskender seferleriyle Fars mutfağından Hindistan'a geçen baharatlı pilav geleneği.",
      en: "The spiced pilaf tradition that travelled from Persia into India with Alexander's campaigns.",
    },
  },
];