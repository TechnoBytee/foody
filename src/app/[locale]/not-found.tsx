"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const locale = usePathname().split("/")[1] === "en" ? "en" : "tr";
  const copy =
    locale === "tr"
      ? { title: "Sayfa bulunamadı", body: "Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.", back: "Ana sayfaya dön" }
      : { title: "Page not found", body: "The page you are looking for may have moved or never existed.", back: "Back to home" };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-12">
      <h1 className="font-serif text-4xl tracking-tight">{copy.title}</h1>
      <p className="text-sm text-[#787774]">{copy.body}</p>
      <Link
        href={`/${locale}`}
        className="w-fit rounded-md bg-[#346538] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2C5530]"
      >
        {copy.back}
      </Link>
    </main>
  );
}
