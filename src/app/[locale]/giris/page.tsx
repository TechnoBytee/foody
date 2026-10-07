import Link from "next/link";
import { getMessages, Locale } from "@/i18n";

export default async function GirisPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = getMessages(locale);
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center gap-6 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774]">
        ← {messages.back}
      </Link>
      <h1 className="font-serif text-3xl">Giriş Yap</h1>
      <form className="flex flex-col gap-3" action="#">
        <input
          type="email"
          placeholder="E-posta"
          className="rounded-md border border-[#EAEAEA] bg-white px-3 py-2.5 text-sm outline-none"
        />
        <input
          type="password"
          placeholder="Şifre"
          className="rounded-md border border-[#EAEAEA] bg-white px-3 py-2.5 text-sm outline-none"
        />
        <button className="rounded-md bg-[#111111] px-4 py-2.5 text-sm font-medium text-white">
          Giriş Yap
        </button>
      </form>
      <p className="text-xs text-[#787774]">
        Supabase anahtarları eklendiğinde gerçek giriş çalışacak.
      </p>
    </main>
  );
}
