export type Cuisine = {
  slug: string;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
};

export type Area = {
  slug: string;
  name: { tr: string; en: string };
  count?: number;
};

export type Recipe = {
  id: string;
  name: { tr: string; en: string };
  cuisine: string;
  categories?: string[];
  time: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  steps: { tr: string[]; en: string[] };
  alternatives: string[];
  calories: number;
  image?: string;
  area?: { tr: string; en: string };

  era?: { tr: string; en: string };
  region?: { tr: string; en: string };
  history?: { tr: string; en: string };
  forgotten?: boolean;
};