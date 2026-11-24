// Alışveriş listesi cihazda tutulur; miktar ayrıştırması yapılmaz (ham malzeme metni).
const KEY = "foody:shopping";
export type ShoppingItem = { text: string; done: boolean };
export const emptyList: ShoppingItem[] = [];
type Store = Pick<Storage, "getItem" | "setItem">;

let cache: ShoppingItem[] | null = null;

function store(storage?: Store): Store | null {
  if (storage) return storage;
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function readList(storage?: Store): ShoppingItem[] {
  const target = store(storage);
  if (!target) return [];
  try {
    const parsed: unknown = JSON.parse(target.getItem(KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is ShoppingItem =>
            Boolean(item && typeof item === "object" && "text" in item && "done" in item)
        )
      : [];
  } catch {
    return [];
  }
}

export function shoppingSnapshot(): ShoppingItem[] {
  if (typeof window === "undefined") return emptyList;
  if (cache === null) cache = readList();
  return cache;
}

export function subscribeShopping(onChange: () => void): () => void {
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

function write(items: ShoppingItem[], storage?: Store): void {
  store(storage)?.setItem(KEY, JSON.stringify(items));
  cache = items;
  if (typeof window !== "undefined") window.dispatchEvent(new Event(KEY));
}

export function addIngredients(storage: Store, ingredients: string[]): ShoppingItem[] {
  const current = readList(storage);
  const folded = (s: string) => s.toLocaleLowerCase("tr");
  const next = [...current];
  for (const raw of ingredients) {
    const text = raw.trim();
    if (!text || next.some((item) => folded(item.text) === folded(text))) continue;
    next.push({ text, done: false });
  }
  write(next, storage);
  return next;
}

export function toggleItem(storage: Store, text: string): ShoppingItem[] {
  const next = readList(storage).map((item) =>
    item.text === text ? { ...item, done: !item.done } : item
  );
  write(next, storage);
  return next;
}

export function clearList(storage: Store): ShoppingItem[] {
  write([], storage);
  return [];
}
