"use client";

import { useState } from "react";
import type { RecipeCardData } from "@/lib/recipe-card";
import { getMessages } from "@/i18n";

// Malzeme aramasından ayrı, kendi state'i ve servisi olan yemek adı araması.
export default function DishSearch({
  locale,
  onResults,
}: {
  locale: "tr" | "en";
  onResults: (recipes: RecipeCardData[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [limit, setLimit] = useState(8);
  const [resultCount, setResultCount] = useState(0);

  const m = getMessages(locale);
  const copy = {
    placeholder: m.dishSearchPlaceholder,
    button: m.dishSearchButton,
    didYouMean: m.didYouMean,
    notFound: m.dishNotFound,
  };

  const run = async (value: string, nextLimit = 8) => {
    try {
      const res = await fetch(
        `/api/yemek-arama?q=${encodeURIComponent(value)}&locale=${locale}&limit=${nextLimit}`
      );
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as {
        results: RecipeCardData[];
        suggestions: string[];
      };
      onResults(data.results);
      setLimit(nextLimit);
      setResultCount(data.results.length);
      setSuggestions(data.suggestions);
      setNotFound(data.results.length === 0 && data.suggestions.length === 0);
    } catch {
      onResults([]);
      setLimit(8);
      setResultCount(0);
      setSuggestions([]);
      setNotFound(true);
    }
  };

  const applySuggestion = (name: string) => {
    setQuery(name);
    setSuggestions([]);
    setNotFound(false);
    run(name);
  };

  return (
    <div className="w-full rounded-xl border border-[#EAEAEA] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run(query)}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          className="min-w-0 flex-1 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-3 py-2.5 text-sm outline-none focus:border-[#9A9A9A]"
        />
        <button
          onClick={() => run(query)}
          className="rounded-md bg-[#346538] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2C5530] active:scale-[0.98] transition"
        >
          {copy.button}
        </button>
      </div>
      {resultCount >= limit && limit < 24 && (
        <button
          onClick={() => run(query, Math.min(24, limit + 8))}
          className="mt-3 w-fit rounded-full border border-[#EAEAEA] px-4 py-2 text-xs text-[#346538] transition hover:bg-[#EDF3EC]"
        >
          {m.showMore}
        </button>
      )}
      {resultCount > 0 && (
        <p role="status" className="mt-3 text-xs text-[#787774]">
          {resultCount} {m.recipeCount}
        </p>
      )}
      {notFound && (
        <p role="status" aria-live="polite" className="mt-3 text-sm text-[#787774]">
          {copy.notFound}
        </p>
      )}
      {suggestions.length > 0 && (
        <div aria-live="polite" className="mt-3 rounded-md bg-[#EDF3EC] px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[#346538]">
            {copy.didYouMean}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((name) => (
              <button
                key={name}
                onClick={() => applySuggestion(name)}
                className="rounded-full border border-[#EAEAEA] bg-white px-3 py-1 text-xs text-[#2F3437] transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
