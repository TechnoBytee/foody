import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, getRecipe } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();
  const messages = getMessages(locale);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        ← {messages.back}
      </Link>
      <div className="flex flex-col gap-3">
        {recipe.forgotten && (
          <span className="w-fit rounded-full bg-[#EDF3EC] px-3 py-1 text-xs uppercase tracking-wide text-[#346538]">
            {messages.forgotten}
          </span>
        )}
        {recipe.image && (
          <div className="overflow-hidden rounded-xl border border-[#EAEAEA]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.image}
              alt={recipe.name[locale]}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}
        <h1 className="font-serif text-4xl tracking-tight">{recipe.name[locale]}</h1>
        <p className="text-sm text-[#787774]">
          {recipe.time} {messages.min} · {recipe.calories} kcal
        </p>
        {(recipe.era || recipe.region || recipe.area) && (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-wide text-[#787774]">
            {recipe.era && (
              <span>
                {messages.era}: {recipe.era[locale]}
              </span>
            )}
            {recipe.region && (
              <span>
                {messages.region}: {recipe.region[locale]}
              </span>
            )}
            {recipe.area && (
              <span>
                {recipe.area[locale]}
              </span>
            )}
          </p>
        )}
      </div>

      {recipe.history && (
        <section className="rounded-xl border border-[#EAEAEA] bg-[#FBFAF8] p-6">
          <h2 className="font-serif text-xl">{messages.history}</h2>
          <p className="mt-2 text-sm text-[#2F3437]">{recipe.history[locale]}</p>
        </section>
      )}

      <section className="rounded-xl border border-[#EAEAEA] bg-white p-6">
        <h2 className="font-serif text-xl">{messages.ingredients}</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-[#2F3437]">
          {recipe.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#EAEAEA] bg-white p-6">
        <h2 className="font-serif text-xl">{messages.steps}</h2>
        <ol className="mt-3 list-decimal pl-5 text-sm text-[#2F3437]">
          {recipe.steps[locale].map((step, i) => (
            <li key={i} className="mt-1">
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-[#EAEAEA] bg-white p-6">
        <h2 className="font-serif text-xl">{messages.alternatives}</h2>
        <p className="mt-2 text-sm text-[#2F3437]">{recipe.alternatives.join(", ")}</p>
      </section>
    </main>
  );
}
