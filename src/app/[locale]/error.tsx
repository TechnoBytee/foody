"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = usePathname().split("/")[1] === "en" ? "en" : "tr";
  const copy =
    locale === "tr"
      ? { title: "Bir şeyler ters gitti", body: "Bu sayfa şu anda yüklenemedi. Tekrar deneyebilirsiniz.", retry: "Tekrar dene", back: "Ana sayfaya dön" }
      : { title: "Something went wrong", body: "This page could not be loaded right now. Please try again.", retry: "Try again", back: "Back to home" };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-12">
      <h1 className="font-serif text-4xl tracking-tight">{copy.title}</h1>
      <p className="text-sm text-[#787774]">{copy.body}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={reset}
          className="rounded-md bg-[#346538] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2C5530]"
        >
          {copy.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="rounded-md border border-[#EAEAEA] px-5 py-2.5 text-sm transition hover:bg-[#F7F6F3]"
        >
          {copy.back}
        </Link>
      </div>
    </main>
  );
}
