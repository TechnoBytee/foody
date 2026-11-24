"use client";

import { useCallback, useRef, useState } from "react";
import { analyzeImage } from "@/services/image-analysis";
import type { RecipeCardData } from "@/lib/recipe-card";
import { useModalFocus } from "@/lib/use-modal-focus";
import { getMessages } from "@/i18n";
import Icon from "./Icon";
import allIngredients from "@/data/ingredient-search.json";

const EXACT_THRESHOLD = 0.85;

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
  locale,
  onResults,
  onLoading,
}: {
  labels: { upload: string; add: string; find: string; analyzing: string };
  locale: "tr" | "en";
  onResults: (recipes: RecipeCardData[], ingredients: string[]) => void;
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
  const [requestFailed, setRequestFailed] = useState(false);
  const closeModal = useCallback(() => setModal(null), []);
  const modalRef = useModalFocus(modal !== null, closeModal);
  const m = getMessages(locale);
  const copy = {
    confirmTitle: m.confirmTitle,
    confirmAdd: m.confirmAdd,
    cancel: m.cancel,
    missingTitle: m.missingTitle,
    missingBody: m.missingBody,
    request: m.request,
    thanks: m.thanks,
    remove: m.remove,
  };

  const add = () => {
    const v = input.trim();
    if (!v) return;

    const list = allIngredients[locale];
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
    const found = await analyzeImage(file, locale);
    setIngredients((prev) => Array.from(new Set([...prev, ...found])));
    onLoading(false);
  };

  const find = async () => {
    onLoading(true);
    try {
      const res = await fetch("/api/malzeme-arama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, locale }),
      });
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as { results: RecipeCardData[] };
      onResults(data.results, ingredients);
    } catch {
      onResults([], ingredients);
    } finally {
      onLoading(false);
    }
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
    let message = copy.thanks;
    let failed = false;
    try {
      const res = await fetch("/api/eksik-malzeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: v }),
      });
      if (!res.ok) {
        message = m.requestError;
        failed = true;
      }
    } catch {
      message = m.connectionError;
      failed = true;
    }
    setRequestFailed(failed);
    setAddedMsg(message);
    setTimeout(() => {
      setAddedMsg("");
      setRequestFailed(false);
    }, 3000);
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
          <Icon name="camera" size={16} /> {labels.upload}
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
            aria-label={labels.add}
            className="min-w-0 flex-1 rounded-md border border-[#EAEAEA] bg-[#F7F6F3] px-3 py-2.5 text-sm outline-none focus:border-[#9A9A9A]"
          />
          <button
            onClick={add}
            aria-label={labels.add}
            className="rounded-md border border-[#EAEAEA] px-3 py-2.5 text-sm hover:bg-[#F7F6F3]"
          >
            <Icon name="plus" size={16} />
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
                aria-label={`${copy.remove} ${ing}`}
              >
                <Icon name="x" size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fridge-modal-title"
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            {modal.type === "confirm" ? (
              <>
                <h3 id="fridge-modal-title" className="font-serif text-lg">{copy.confirmTitle}</h3>
                <p className="mt-2 text-sm text-[#787774]">
                  {m.confirmBody.split("{name}")[0].replace("{input}", input.trim())}
                  <span className="font-medium text-[#2F3437]">{modal.name}</span>
                  {m.confirmBody.split("{name}")[1]?.replace("{input}", input.trim())}
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={confirmAdd}
                    className="rounded-md bg-[#346538] px-4 py-2 text-sm font-medium text-white hover:bg-[#2C5530]"
                  >
                    {copy.confirmAdd}
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded-md border border-[#EAEAEA] px-4 py-2 text-sm hover:bg-[#F7F6F3]"
                  >
                    {copy.cancel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 id="fridge-modal-title" className="font-serif text-lg">{copy.missingTitle}</h3>
                <p className="mt-2 text-sm text-[#787774]">
                  &quot;{input.trim()}&quot; {copy.missingBody}
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={reportMissing}
                    className="rounded-md bg-[#346538] px-4 py-2 text-sm font-medium text-white hover:bg-[#2C5530]"
                  >
                    {copy.request}
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded-md border border-[#EAEAEA] px-4 py-2 text-sm hover:bg-[#F7F6F3]"
                  >
                    {copy.cancel}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {addedMsg && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-3 rounded-md px-4 py-2 text-sm ${
            requestFailed ? "bg-[#FBFAF8] text-[#8B3A3A]" : "bg-[#EDF3EC] text-[#346538]"
          }`}
        >
          {addedMsg}
        </div>
      )}
    </div>
  );
}
