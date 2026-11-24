// Bölge adı -> URL slug. Veri katmanı ve testler aynı eşlemeyi kullanır.
const AREA_SLUG_MAP: Record<string, string> = {
  indian: "india",
  french: "france",
  norwegian: "norway",
  venezuelan: "venezuela",
  argentinian: "argentina",
};

export function areaSlug(area?: { tr: string; en: string }): string | null {
  if (!area) return null;
  const raw = area.en.toLowerCase().replace(/\s+/g, "-");
  return AREA_SLUG_MAP[raw] ?? raw;
}
