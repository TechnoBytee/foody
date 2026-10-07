import { getMessages, Locale } from "@/i18n";
import HomeClient from "@/components/HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <HomeClient messages={getMessages(locale)} locale={locale} />;
}
