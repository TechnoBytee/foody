export type Cuisine = {
  slug: string;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
  /** "tarih" koleksiyonundaki kategoriler ana sayfada ayrı bölümde gösterilir. */
  collection?: "tarih";
};

export type Recipe = {
  id: string;
  name: { tr: string; en: string };
  cuisine: string;
  time: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  steps: { tr: string[]; en: string[] };
  alternatives: string[];
  calories: number;

  /** Tarihî tarifler için ek alanlar (modern tariflerde yoktur). */
  era?: { tr: string; en: string };
  region?: { tr: string; en: string };
  history?: { tr: string; en: string };
  forgotten?: boolean;
};