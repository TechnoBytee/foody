import type { RecipeCardData } from "./recipe-card";

// Favoriler cihazda tutulur; hesap bağlanınca (Faz 3) Supabase'e taşınır.
const KEY = "foody:favorites";
export const emptyFavorites: RecipeCardData[] = [];
type Store = Pick<Storage, "getItem" | "setItem">;

let cache: RecipeCardData[] | null = null;

export function favoritesSnapshot(): RecipeCardData[] {
  if (typeof window === "undefined") return emptyFavorites;
  if (cache === null) cache = readFavorites();
  return cache;
}

export function subscribeFavorites(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    cache = null;
    onChange();
  };
  const handleLocal = () => {
    cache = null;
    onChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(KEY, handleLocal);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(KEY, handleLocal);
  };
}

function store(storage?: Store): Store | null {
  if (storage) return storage;
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function readFavorites(storage?: Store): RecipeCardData[] {
  const target = store(storage);
  if (!target) return [];
  try {
    const parsed: unknown = JSON.parse(target.getItem(KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item): item is RecipeCardData => Boolean(item && typeof item === "object" && "id" in item))
      : [];
  } catch {
    return [];
  }
}

export function writeFavorites(items: RecipeCardData[], storage?: Store): void {
  store(storage)?.setItem(KEY, JSON.stringify(items));
  cache = items;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(KEY));
}

export function toggleFavorite(storage: Store, recipe: RecipeCardData): RecipeCardData[] {
  const current = readFavorites(storage);
  const next = current.some((item) => item.id === recipe.id)
    ? current.filter((item) => item.id !== recipe.id)
    : [...current, recipe];
  writeFavorites(next, storage);
  return next;
}
