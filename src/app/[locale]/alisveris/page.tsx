import Link from "next/link";
import { getMessages, Locale } from "@/i18n";
import Icon from "@/components/Icon";
import ShoppingList from "@/components/ShoppingList";

export default async function ShoppingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = getMessages(locale);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-12">
      <Link href={`/${locale}`} className="text-sm text-[#787774] transition hover:text-[#2F3437]">
        <Icon name="arrow-left" size={16} /> {messages.back}
      </Link>
      <h1 className="font-serif text-4xl tracking-tight">{messages.shoppingList}</h1>
      <ShoppingList locale={locale} />
    </main>
  );
}
