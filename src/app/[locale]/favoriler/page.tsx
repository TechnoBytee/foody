import Link from "next/link";
import { getMessages, Locale } from "@/i18n";

export default async function FavorilerPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = getMessages(locale);
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774]">
        ← {messages.back}
      </Link>
      <h1 className="font-serif text-3xl">Favoriler</h1>
      <p className="text-sm text-[#787774]">
        Giriş yaptığınızda favori tarifleriniz burada görünecek.
      </p>
    </main>
  );
}
