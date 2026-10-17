"use client";

import { useRef, useState } from "react";
import { analyzeImage, suggestRecipes } from "@/services/ai";
import { Recipe } from "@/data/recipes";
import allIngredients from "@/data/ingredient-search.json";

const EXACT_THRESHOLD = 0.85;
const SIMILAR_THRESHOLD = 0.4;

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

function findSimilar(input: string, list: string[]): { name: string; score: number } | null {
  let best: { name: string; score: number } | null = null;
  const lower = input.toLowerCase();
  for (const item of list) {
    const score = similarity(lower, item.toLowerCase());
    if (!best || score > best.score) best = { name: item, score };
  }
  return best;
}

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
  const [modal, setModal] = useState<
    | { type: "confirm"; name: string }
    | { type: "missing" }
    | null
  >(null);
  const [addedMsg, setAddedMsg] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v) return;

    const list = allIngredients.tr;
    const exact = list.find((i) => i.toLowerCase() === v.toLowerCase());
    if (exact) {
      if (!ingredients.includes(exact)) setIngredients([...ingredients, exact]);
      setInput("");
      return;
    }

    const similar = findSimilar(v, list);
    if (similar && similar.score >= EXACT_THRESHOLD) {
      setModal({ type: "confirm", name: similar.name });
      return;
    }

    setModal({ type: "missing" });
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

  const confirmAdd = () => {
    if (modal?.type === "confirm") {
      if (!ingredients.includes(modal.name)) setIngredients([...ingredients, modal.name]);
      setInput("");
    }
    setModal(null);
  };

  const reportMissing = async () => {
    const v = input.trim();
    try {
      await fetch("/api/eksik-malzeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: v }),
      });
    } catch {}
    setAddedMsg("Geliştirme birimine iletildi, teşekkürler!");
    setTimeout(() => setAddedMsg(""), 3000);
    setModal(null);
    setInput("");
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
            className="min-w-0 flex-1 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-3 py-2.5 text-sm outline-none focus:border-[#9A9A9A]"
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

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            {modal.type === "confirm" ? (
              <>
                <h3 className="font-serif text-lg">Bunu mu demek istediniz?</h3>
                <p className="mt-2 text-sm text-[#787774]">
                  &quot;{input.trim()}&quot; yerine{" "}
                  <span className="font-medium text-[#2F3437]">{modal.name}</span> ekleyelim mi?
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={confirmAdd}
                    className="rounded-md bg-[#346538] px-4 py-2 text-sm font-medium text-white hover:bg-[#2C5530]"
                  >
                    Evet, ekle
                  </button>
                  <button
                    onClick={() => setModal(null)}
                    className="rounded-md border border-[#EAEAEA] px-4 py-2 text-sm hover:bg-[#F7F6F3]"
                  >
                    Vazgeç
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-serif text-lg">Malzeme bulunamadı</h3>
                <p className="mt-2 text-sm text-[#787774]">
                  &quot;{input.trim()}&quot; tariflerimizde bulunmamaktadır. Bu malzemeyi içeren
                  tarifleri sizin için hazırlamamızı ister misiniz?
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={reportMissing}
                    className="rounded-md bg-[#346538] px-4 py-2 text-sm font-medium text-white hover:bg-[#2C5530]"
                  >
                    Evet, hazırlayın
                  </button>
                  <button
                    onClick={() => setModal(null)}
                    className="rounded-md border border-[#EAEAEA] px-4 py-2 text-sm hover:bg-[#F7F6F3]"
                  >
                    Vazgeç
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {addedMsg && (
        <div className="mt-3 rounded-md bg-[#EDF3EC] px-4 py-2 text-sm text-[#346538]">
          {addedMsg}
        </div>
      )}
    </div>
  );
}
