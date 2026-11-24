import Link from "next/link";
import { getMessages, Locale } from "@/i18n";

// ?sayfa=n ile sunucu tarafında sayfalama; istemciye ek veri gönderilmez.
export default function Pagination({
  basePath,
  page,
  totalPages,
  locale,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  locale: Locale;
}) {
  if (totalPages <= 1) return null;
  const m = getMessages(locale);
  const linkClass =
    "rounded-md border border-[#EAEAEA] px-4 py-2 text-xs transition hover:border-[#C9C9C9] hover:bg-[#F7F6F3]";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-3">
      {page > 1 ? (
        <Link href={`${basePath}?sayfa=${page - 1}`} className={linkClass}>
          ← {m.previousPage}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-xs text-[#787774]">
        {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link href={`${basePath}?sayfa=${page + 1}`} className={linkClass}>
          {m.nextPage} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
