"use client";

import { useSyncExternalStore } from "react";
import { getMessages } from "@/i18n";
import Icon from "./Icon";
import type { RecipeCardData } from "@/lib/recipe-card";
import {
  emptyFavorites,
  favoritesSnapshot,
  subscribeFavorites,
  toggleFavorite,
} from "@/lib/favorites";

export default function FavoriteButton({
  recipe,
  locale,
}: {
  recipe: RecipeCardData;
  locale: "tr" | "en";
}) {
  const m = getMessages(locale);
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    favoritesSnapshot,
    () => emptyFavorites
  );
  const saved = favorites.some((item) => item.id === recipe.id);

  return (
    <button
      onClick={() => toggleFavorite(window.localStorage, recipe)}
      aria-pressed={saved}
      aria-label={saved ? m.favoriteRemove : m.favoriteAdd}
      className="w-fit rounded-md border border-[#EAEAEA] px-4 py-2 text-sm text-[#346538] transition hover:bg-[#EDF3EC]"
    >
      <Icon name="heart" size={18} filled={saved} /> {saved ? m.favoriteRemove : m.favoriteAdd}
    </button>
  );
}
