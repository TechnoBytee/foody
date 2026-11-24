import Link from "next/link";
import type { RecipeCardData } from "@/lib/recipe-card";
import { metaLabels, metaParts } from "@/lib/recipe-meta";
import { getMessages } from "@/i18n";

export default function RecipeCards({
  recipes,
  locale,
}: {
  recipes: RecipeCardData[];
  locale: "tr" | "en";
}) {
  if (recipes.length === 0) return null;
  const labels = metaLabels(getMessages(locale));
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {recipes.map((r, i) => (
        <Link
          key={r.id}
          href={`/${locale}/tarif/${r.id}`}
          style={{ animationDelay: `${Math.min(i, 8) * 50}ms`, animationFillMode: "both" }}
          className="animate-chip-in block overflow-hidden rounded-xl border border-[#EAEAEA] bg-white transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
        >
          {r.image && (
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7F6F3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.image}
                alt={r.name[locale]}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5">
            <h3 className="font-serif text-lg">{r.name[locale]}</h3>
            {r.era && (
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[#346538]">
                {r.era[locale]}
                {r.forgotten
                  ? locale === "tr"
                    ? " · unutulmuş"
                    : " · nearly lost"
                  : ""}
              </p>
            )}
            {metaParts(r, labels).length > 0 && (
              <p className="mt-1 text-xs text-[#787774]">{metaParts(r, labels).join(" · ")}</p>
            )}
            <p className="mt-3 text-sm text-[#2F3437]">
              {r.ingredients[locale].slice(0, 4).join(", ")}
              {r.ingredients[locale].length > 4 ? "..." : ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
