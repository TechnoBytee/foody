import Link from "next/link";
import { getMessages, Locale } from "@/i18n";
import FavoritesList from "@/components/FavoritesList";

export default async function FavorilerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const copy = { title: messages.favoritesTitle, body: messages.favoritesBody };
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        ← {messages.back}
      </Link>
      <h1 className="font-serif text-4xl tracking-tight">{copy.title}</h1>
      <p className="text-sm text-[#787774]">{copy.body}</p>
      <FavoritesList locale={locale} />
    </main>
  );
}
