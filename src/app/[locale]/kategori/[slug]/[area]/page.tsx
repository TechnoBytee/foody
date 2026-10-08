import Link from "next/link";
import { notFound } from "next/navigation";
import { allCuisines, recipesByCuisineAndArea, areas } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";
import RecipeCards from "@/components/RecipeCards";

export function generateStaticParams() {
  return allCuisines.flatMap((c) => areas.map((a) => ({ slug: c.slug, area: a.slug })));
}

export default async function CuisineAreaPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string; area: string }>;
}) {
  const { locale, slug, area } = await params;
  const cuisine = allCuisines.find((c) => c.slug === slug);
  const areaData = areas.find((a) => a.slug === area);
  if (!cuisine || !areaData) notFound();
  const messages = getMessages(locale);
  const list = recipesByCuisineAndArea(slug, area);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link
        href={`/${locale}/kategori/${slug}`}
        className="text-sm text-[#787774] transition hover:text-[#2F3437]"
      >
        ← {cuisine.name[locale]}
      </Link>
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-[#EDF3EC] px-3 py-1 text-xs uppercase tracking-wide text-[#346538]">
          {areaData.name[locale]}
        </span>
        <h1 className="font-serif text-4xl tracking-tight">
          {areaData.name[locale]} {cuisine.name[locale]}
        </h1>
        <p className="text-sm text-[#787774]">
          {list.length} {locale === "tr" ? "tarif" : "recipes"}
        </p>
      </div>
      <RecipeCards recipes={list} locale={locale} />
    </main>
  );
}
