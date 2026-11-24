import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allCuisines, recipesByCuisineAndArea, areas } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";
import RecipeCards from "@/components/RecipeCards";
import RouteSkeleton from "@/components/RouteSkeleton";
import Pagination from "@/components/Pagination";
import { paginate } from "@/lib/paginate";

type PageParams = { locale: Locale; slug: string; area: string };
type PageQuery = { sayfa?: string };

export function generateStaticParams() {
  return allCuisines
    .flatMap((c) => areas.map((a) => ({ slug: c.slug, area: a.slug })))
    .filter(({ slug, area }) => recipesByCuisineAndArea(slug, area).length > 0);
}

async function CuisineAreaContent({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageQuery>;
}) {
  const { locale, slug, area } = await params;
  const { sayfa } = await searchParams;
  const cuisine = allCuisines.find((c) => c.slug === slug);
  const areaData = areas.find((a) => a.slug === area);
  if (!cuisine || !areaData) notFound();
  const messages = getMessages(locale);
  const list = recipesByCuisineAndArea(slug, area);
  const view = paginate(list, Number(sayfa));

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
          {list.length} {messages.recipeCount}
        </p>
      </div>
      <RecipeCards recipes={view.items} locale={locale} />
      <Pagination
        basePath={`/${locale}/kategori/${slug}/${area}`}
        page={view.page}
        totalPages={view.totalPages}
        locale={locale}
      />
    </main>
  );
}

export default function CuisineAreaPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageQuery>;
}) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <CuisineAreaContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
