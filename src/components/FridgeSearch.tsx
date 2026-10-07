"use client";

import { useRef, useState } from "react";
import { analyzeImage, suggestRecipes } from "@/services/ai";
import { Recipe } from "@/data/recipes";

export default function FridgeSearch({
  labels,
  onResults,
  onLoading,
}: {
  labels: { upload: string; add: string; find: string; analyzing: string };
  onResults: (recipes: Recipe[], ingredients: string[]) => void;
  onLoading: (loading: boolean) => void;
}) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const v = input.trim();
    if (v && !ingredients.includes(v)) setIngredients([...ingredients, v]);
    setInput("");
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    onLoading(true);
    const found = await analyzeImage(file);
    setIngredients((prev) => Array.from(new Set([...prev, ...found])));
    onLoading(false);
  };

  const find = async () => {
    onLoading(true);
    const results = await suggestRecipes(ingredients);
    onResults(results, ingredients);
    onLoading(false);
  };

  return (
    <div className="w-full rounded-xl border border-[#EAEAEA] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => fileRef.current?.click()}
          className="rounded-md bg-[#111111] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#333333] active:scale-[0.98] transition"
        >
          {labels.upload}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <div className="flex flex-1 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={labels.add}
            className="flex-1 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-3 py-2.5 text-sm outline-none focus:border-[#9A9A9A]"
          />
          <button
            onClick={add}
            className="rounded-md border border-[#EAEAEA] px-3 py-2.5 text-sm hover:bg-[#F7F6F3]"
          >
            +
          </button>
        </div>
        <button
          onClick={find}
          className="rounded-md bg-[#346538] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2C5530] active:scale-[0.98] transition"
        >
          {labels.find}
        </button>
      </div>
      {ingredients.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {ingredients.map((ing) => (
            <span
              key={ing}
              className="animate-chip-in inline-flex items-center gap-1 rounded-full bg-[#EDF3EC] px-3 py-1 text-xs uppercase tracking-wide text-[#346538]"
            >
              {ing}
              <button
                onClick={() => setIngredients(ingredients.filter((i) => i !== ing))}
                aria-label={`remove ${ing}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
