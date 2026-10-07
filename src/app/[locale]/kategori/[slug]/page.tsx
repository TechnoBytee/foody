import Link from "next/link";
import { notFound } from "next/navigation";
import { allCuisines, ancientCuisines, recipesByCuisine } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";
import RecipeCards from "@/components/RecipeCards";

export function generateStaticParams() {
  return allCuisines.map((c) => ({ slug: c.slug }));
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cuisine = allCuisines.find((c) => c.slug === slug);
  if (!cuisine) notFound();
  const messages = getMessages(locale);
  const list = recipesByCuisine(slug);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        ← {messages.back}
      </Link>
      {cuisine.collection === "tarih" && (
        <Link
          href={`/${locale}#tarih-arsivi`}
          className="w-fit rounded-full bg-[#EDF3EC] px-3 py-1 text-xs uppercase tracking-wide text-[#346538]"
        >
          {messages.ancientBadge}
        </Link>
      )}
      <h1 className="font-serif text-4xl tracking-tight">{cuisine.name[locale]}</h1>
      <p className="text-[#787774]">{cuisine.description[locale]}</p>
      <p className="text-sm text-[#787774]">
        {list.length} {locale === "tr" ? "tarif" : "recipes"}
      </p>
      <RecipeCards recipes={list} locale={locale} />
      {cuisine.collection === "tarih" && ancientCuisines.length > 0 && (
        <section className="flex flex-col gap-3 border-t border-[#EAEAEA] pt-6">
          <h2 className="font-serif text-xl">{messages.otherAncientCategories}</h2>
          <div className="flex flex-wrap gap-2">
            {ancientCuisines
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/kategori/${c.slug}`}
                  className="rounded-full border border-[#EAEAEA] bg-white px-3 py-1.5 text-xs transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
                >
                  {c.name[locale]}
                </Link>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
