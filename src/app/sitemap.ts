import type { MetadataRoute } from "next";
import { allCuisines, recipes } from "@/data/recipes";
import { areas } from "@/data/areas";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["tr", "en"] as const;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const base = `${SITE_URL}/${locale}`;
    entries.push({ url: base, changeFrequency: "weekly", priority: 1 });
    for (const cuisine of allCuisines) {
      entries.push({ url: `${base}/kategori/${cuisine.slug}`, changeFrequency: "weekly", priority: 0.8 });
    }
    for (const area of areas) {
      entries.push({ url: `${base}/bolge/${area.slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
    for (const recipe of recipes) {
      entries.push({ url: `${base}/tarif/${recipe.id}`, changeFrequency: "monthly", priority: 0.5 });
    }
  }
  return entries;
}
