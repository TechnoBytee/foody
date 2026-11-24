"use client";

import { useSyncExternalStore } from "react";
import { getMessages } from "@/i18n";
import { emptyFavorites, favoritesSnapshot, subscribeFavorites } from "@/lib/favorites";
import RecipeCards from "./RecipeCards";

export default function FavoritesList({ locale }: { locale: "tr" | "en" }) {
  const items = useSyncExternalStore(
    subscribeFavorites,
    favoritesSnapshot,
    () => emptyFavorites
  );
  const m = getMessages(locale);

  if (items.length === 0) return <p className="text-sm text-[#787774]">{m.favoritesEmpty}</p>;
  return <RecipeCards recipes={items} locale={locale} />;
}
