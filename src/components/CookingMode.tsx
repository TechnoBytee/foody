"use client";

import { useEffect, useState } from "react";
import { getMessages } from "@/i18n";
import { formatTimer } from "@/lib/timer";
import { useModalFocus } from "@/lib/use-modal-focus";
import Icon from "./Icon";

export default function CookingMode({
  steps,
  locale,
  onClose,
}: {
  steps: string[];
  locale: "tr" | "en";
  onClose: () => void;
}) {
  const m = getMessages(locale);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useModalFocus(true, onClose);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setIndex((value) => Math.min(steps.length - 1, value + 1));
      if (event.key === "ArrowLeft") setIndex((value) => Math.max(0, value - 1));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [steps.length]);

  const go = (next: number) => {
    setIndex(next);
    setSeconds(0);
    setRunning(false);
  };

  const controlClass =
    "rounded-md border border-[#EAEAEA] bg-white px-4 py-2 text-sm transition hover:bg-[#F7F6F3] disabled:opacity-40";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={m.cookingMode}
      className="fixed inset-0 z-[60] flex flex-col gap-6 bg-[#F7F6F3] p-5 sm:p-8"
    >
      <header className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-xl">
          {m.cookingMode} · {index + 1}/{steps.length}
        </h2>
        <button onClick={onClose} aria-label={m.cookingExit} className="rounded-md p-2 hover:bg-white">
          <Icon name="x" size={20} />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <p className="max-w-2xl font-serif text-2xl leading-relaxed sm:text-3xl">{steps[index]}</p>
        <div className="flex flex-wrap items-center justify-center gap-2" aria-label={m.cookingTimer}>
          <Icon name="timer" size={18} />
          <span className="font-mono text-lg tabular-nums">{formatTimer(seconds)}</span>
          <button onClick={() => setSeconds((value) => value + 60)} className={controlClass}>
            {m.addMinute}
          </button>
          <button onClick={() => setRunning((value) => !value)} className={controlClass}>
            {running ? m.pauseTimer : m.startTimer}
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
            className={controlClass}
          >
            {m.resetTimer}
          </button>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-2">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className={controlClass}
        >
          <Icon name="caret-left" size={14} /> {m.cookingPrevious}
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index === steps.length - 1}
          className={controlClass}
        >
          {m.cookingNext} <Icon name="caret-right" size={14} />
        </button>
      </footer>
    </div>
  );
}
