"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FridgeSearch from "./FridgeSearch";
import RecipeCards from "./RecipeCards";
import { hasSplashShown, markSplashShown } from "@/lib/splashState";
import { Recipe, cuisines, areas } from "@/data/recipes";
import { Messages, Locale } from "@/i18n";

export default function HomeClient({ messages, locale }: { messages: Messages; locale: Locale }) {
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"splash" | "moving" | "done" | null>(() =>
    hasSplashShown() ? null : "splash"
  );
  const targetRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [delta, setDelta] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (phase !== "splash") return;
    const move = setTimeout(() => {
      const t = targetRef.current?.getBoundingClientRect();
      const l = logoRef.current?.getBoundingClientRect();
      if (t && l) setDelta({ x: t.left - l.left, y: t.top - l.top });
      setPhase("moving");
    }, 1500);
    return () => clearTimeout(move);
  }, [phase]);

  useEffect(() => {
    if (phase !== "moving") return;
    const done = setTimeout(() => {
      setPhase("done");
      markSplashShown();
    }, 1000);
    return () => clearTimeout(done);
  }, [phase]);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-12">
      {/* Splash: geometri inline style ile verilir; Tailwind chunk'ı geç yüklense bile ilk karede doğru konumlanır */}
      <style>{`@keyframes barDot{0%{left:0}50%{left:calc(100% - 12px)}100%{left:0}}`}</style>
      {(phase === "splash" || phase === "moving") && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#F7F6F3",
              zIndex: 50,
              opacity: phase === "moving" ? 0 : 1,
              transition: "opacity 700ms ease",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              width: 157,
              height: 56,
              marginLeft: -78.5,
              marginTop: -28,
              zIndex: 60,
            }}
          >
            <img
              ref={logoRef}
              src="/assets/1-cropped-sm.png"
              alt="foody"
              width={157}
              height={56}
              decoding="async"
              className="h-14 w-[157px] object-contain"
              style={{
                display: "block",
                transform: delta ? `translate(${delta.x}px, ${delta.y}px)` : "translate(0px, 0px)",
                transition: "transform 900ms ease-out",
              }}
            />
          </div>
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "calc(50% + 56px)",
              width: 160,
              height: 12,
              marginLeft: -80,
              zIndex: 60,
              borderRadius: 9999,
              background: "#EAEAEA",
              opacity: phase === "moving" ? 0 : 1,
              transition: "opacity 300ms ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#2F3437",
                animation: "barDot 1.2s ease-in-out infinite",
              }}
            />
          </div>
        </>
      )}

      <header className="flex items-baseline justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <img src="/assets/2-cropped-sm.png" alt="foody" className="h-16 w-auto rounded-md object-contain" />
        </Link>
        <Link
          href={`/${locale === "tr" ? "en" : "tr"}`}
          className="text-xs uppercase tracking-widest text-[#787774]"
        >
          {locale === "tr" ? "EN" : "TR"}
        </Link>
      </header>

      <section className="flex flex-col items-center gap-4 text-center">
        {phase === null || phase === "done" ? (
          <img
            src="/assets/1-cropped-sm.png"
            alt="foody"
            width={157}
            height={56}
            className="h-14 w-[157px] object-contain"
          />
        ) : (
          <div ref={targetRef} className="h-14 w-[157px]" aria-hidden />
        )}
        <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          {messages.heroTitle}
        </h1>
        <p className="text-[#787774]">{messages.heroSubtitle}</p>
      </section>

      <FridgeSearch
        labels={{
          upload: messages.uploadButton,
          add: messages.addIngredient,
          find: messages.findRecipes,
          analyzing: messages.analyzing,
        }}
        onResults={(r) => setResults(r)}
        onLoading={setLoading}
      />

      {loading && <p className="animate-pulse text-sm text-[#787774]">{messages.analyzing}</p>}

      {results.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl">{messages.suggestionsTitle}</h2>
          <RecipeCards recipes={results} locale={locale} />
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl">{messages.categoriesTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cuisines.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/kategori/${c.slug}`}
              className="rounded-xl border border-[#EAEAEA] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
            >
              <h3 className="text-sm font-medium">{c.name[locale]}</h3>
              <p className="mt-1 text-xs text-[#787774]">{c.description[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl">{messages.areasTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/${locale}/bolge/${a.slug}`}
              className="rounded-full border border-[#EAEAEA] bg-white px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
            >
              {a.name[locale]}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
