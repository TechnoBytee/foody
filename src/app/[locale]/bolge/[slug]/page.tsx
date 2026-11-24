import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipesByArea, areas } from "@/data/recipes";
import { getMessages, Locale } from "@/i18n";
import RecipeCards from "@/components/RecipeCards";
import RouteSkeleton from "@/components/RouteSkeleton";
import Pagination from "@/components/Pagination";
import { paginate } from "@/lib/paginate";

type PageParams = { locale: Locale; slug: string };
type PageQuery = { sayfa?: string };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

async function AreaContent({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageQuery>;
}) {
  const { locale, slug } = await params;
  const { sayfa } = await searchParams;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();
  const messages = getMessages(locale);
  const list = recipesByArea(slug);
  const view = paginate(list, Number(sayfa));

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        ← {messages.back}
      </Link>
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl tracking-tight">{area.name[locale]}</h1>
        <p className="text-sm text-[#787774]">
          {list.length} {messages.recipeCount}
        </p>
      </div>
      <RecipeCards recipes={view.items} locale={locale} />
      <Pagination
        basePath={`/${locale}/bolge/${slug}`}
        page={view.page}
        totalPages={view.totalPages}
        locale={locale}
      />
      <section className="flex flex-col gap-3 border-t border-[#EAEAEA] pt-6">
        <h2 className="font-serif text-xl">{messages.otherAreas}</h2>
        <div className="flex flex-wrap gap-2">
          {areas
            .filter((a) => a.slug !== slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/${locale}/bolge/${a.slug}`}
                className="rounded-full border border-[#EAEAEA] bg-white px-3 py-1.5 text-xs transition hover:-translate-y-0.5 hover:border-[#C9C9C9]"
              >
                {a.name[locale]}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

export default function AreaPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageQuery>;
}) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <AreaContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
