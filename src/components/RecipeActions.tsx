"use client";

import { useState } from "react";
import { getMessages } from "@/i18n";
import Icon from "./Icon";

export default function RecipeActions({
  name,
  locale,
}: {
  name: string;
  locale: "tr" | "en";
}) {
  const m = getMessages(locale);
  const [shared, setShared] = useState(false);

  const share = async () => {
    const data = { title: name, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
      setShared(true);
    } catch {
      setShared(false);
    }
  };

  const buttonClass =
    "inline-flex items-center gap-2 rounded-md border border-[#EAEAEA] px-4 py-2 text-sm transition hover:bg-[#F7F6F3]";

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <button onClick={() => window.print()} className={buttonClass}>
        <Icon name="printer" size={16} /> {m.print}
      </button>
      <button onClick={share} aria-live="polite" className={buttonClass}>
        <Icon name="share-network" size={16} /> {shared ? m.thanks : m.share}
      </button>
    </div>
  );
}
