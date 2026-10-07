import Link from "next/link";
import { Recipe } from "@/data/recipes";

const difficultyLabel: Record<Recipe["difficulty"], string> = {
  easy: "Kolay",
  medium: "Orta",
  hard: "Zor",
};

export default function RecipeCards({
  recipes,
  locale,
}: {
  recipes: Recipe[];
  locale: string;
}) {
  if (recipes.length === 0) return null;
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {recipes.map((r, i) => (
        <Link
          key={r.id}
          href={`/${locale}/tarif/${r.id}`}
          style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
          className="animate-chip-in block rounded-xl border border-[#EAEAEA] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
        >
          <h3 className="font-serif text-lg">{r.name[locale as "tr" | "en"]}</h3>
          {r.era && (
            <p className="mt-1 text-[11px] uppercase tracking-wide text-[#346538]">
              {r.era[locale as "tr" | "en"]}
              {r.forgotten
                ? locale === "tr"
                  ? " · unutulmuş"
                  : " · nearly lost"
                : ""}
            </p>
          )}
          <p className="mt-1 text-xs text-[#787774]">
            {r.time} dk · {difficultyLabel[r.difficulty]} · {r.calories} kcal
          </p>
          <p className="mt-3 text-sm text-[#2F3437]">
            {r.ingredients.slice(0, 4).join(", ")}
            {r.ingredients.length > 4 ? "..." : ""}
          </p>
        </Link>
      ))}
    </div>
  );
}
