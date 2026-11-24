import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, getRecipe } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";
import { getAlternatives } from "@/services/ai";
import { getRecipeIntro } from "@/lib/recipe-intro";
import { metaLabels, metaParts } from "@/lib/recipe-meta";
import RecipeCards from "@/components/RecipeCards";
import RouteSkeleton from "@/components/RouteSkeleton";

type PageParams = { locale: Locale; id: string };

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) return { title: "foody" };
  const title = `${recipe.name[locale]} | foody`;
  const description = getRecipeIntro(recipe, locale).slice(0, 160);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/tarif/${id}`,
      languages: { tr: `/tr/tarif/${id}`, en: `/en/tarif/${id}` },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/${locale}/tarif/${id}`,
      images: recipe.image ? [recipe.image] : undefined,
    },
  };
}

// URL'ye özel veriyi Suspense içinde okur; statik kabuk tek bir tarife bağlanmaz.
async function RecipeContent({ params }: { params: Promise<PageParams> }) {
  const { locale, id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();
  const messages = getMessages(locale);
  const labels = metaLabels(messages);
  const alternatives = await getAlternatives(recipe, locale);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Recipe",
            name: recipe.name[locale],
            image: recipe.image,
            recipeCuisine: recipe.cuisine,
            recipeIngredient: recipe.ingredients[locale],
            recipeInstructions: recipe.steps[locale].map((text) => ({
              "@type": "HowToStep",
              text,
            })),
            ...(recipe.calories > 0
              ? { nutrition: { "@type": "NutritionInformation", calories: `${recipe.calories} kcal` } }
              : {}),
          }).replace(/</g, "\\u003c"),
        }}
      />
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#EAEAEA] bg-[#F7F6F3]">
            <Image
              src={recipe.image}
              alt={recipe.name[locale]}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}
        <h1 className="font-serif text-4xl tracking-tight">{recipe.name[locale]}</h1>
        {metaParts(recipe, labels).length > 0 && (
          <p className="text-sm text-[#787774]">{metaParts(recipe, labels).join(" · ")}</p>
        )}
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
        <p className="max-w-2xl text-[15px] leading-relaxed text-[#2F3437]">
          {getRecipeIntro(recipe, locale)}
        </p>
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
          {recipe.ingredients[locale].map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-[#EAEAEA] bg-white p-6">
        <h2 className="font-serif text-xl">{messages.steps}</h2>
        <ol className="mt-4 flex flex-col gap-2">
          {recipe.steps[locale].map((step, i) => (
            <li
              key={i}
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
              className="animate-chip-in flex gap-3 rounded-lg border border-[#EAEAEA] bg-[#FBFAF8] p-3 text-sm leading-relaxed text-[#2F3437]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EDF3EC] text-xs font-medium text-[#346538]">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {alternatives.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-serif text-xl">{messages.alternatives}</h2>
          <RecipeCards recipes={alternatives} locale={locale} />
        </section>
      )}
    </main>
  );
}

export default function RecipePage({ params }: { params: Promise<PageParams> }) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <RecipeContent params={params} />
    </Suspense>
  );
}
