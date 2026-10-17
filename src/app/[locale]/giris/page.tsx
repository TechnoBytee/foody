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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        ← {messages.back}
      </Link>
      <h1 className="font-serif text-4xl tracking-tight">Giriş Yap</h1>
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
