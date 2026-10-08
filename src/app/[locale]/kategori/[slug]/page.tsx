import Link from "next/link";
import { notFound } from "next/navigation";
import { allCuisines, recipesByCuisine, areas } from "@/data/recipes";
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

      <h1 className="font-serif text-4xl tracking-tight">{cuisine.name[locale]}</h1>
      <p className="text-[#787774]">{cuisine.description[locale]}</p>
      <p className="text-sm text-[#787774]">
        {list.length} {locale === "tr" ? "tarif" : "recipes"}
      </p>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-[#787774]">{messages.filterByArea}</h2>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/${locale}/kategori/${slug}/${a.slug}`}
              className="rounded-full border border-[#EAEAEA] bg-white px-3 py-1.5 text-xs transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
            >
              {a.name[locale]}
            </Link>
          ))}
        </div>
      </section>

      <RecipeCards recipes={list} locale={locale} />
    </main>
  );
}
