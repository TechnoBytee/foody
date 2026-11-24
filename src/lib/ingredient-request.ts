// Eksik malzeme raporu için saf doğrulama/kapasite yardımcıları.
// Route Handler ve testler aynı kuralları kullanır; dosya I/O burada yoktur.
export const MAX_SAVED_NAMES = 1000;

export function validateIngredientName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  if (/[\u0000-\u001f\u007f]/.test(value)) return null;
  const name = value.trim();
  if (!name || name.length > 100) return null;
  if (!/\p{L}|\p{N}/u.test(name)) return null;
  return name;
}

export function addIngredientName(existing: string[], name: string): string[] {
  const folded = (s: string) => s.toLocaleLowerCase("tr");
  if (existing.some((item) => folded(item) === folded(name))) return existing;
  const kept = existing.length >= MAX_SAVED_NAMES ? existing.slice(-(MAX_SAVED_NAMES - 1)) : existing;
  return [...kept, name];
}
