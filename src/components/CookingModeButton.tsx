"use client";

import { useCallback, useState } from "react";
import { getMessages } from "@/i18n";
import CookingMode from "./CookingMode";
import Icon from "./Icon";

export default function CookingModeButton({
  steps,
  locale,
}: {
  steps: string[];
  locale: "tr" | "en";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const m = getMessages(locale);

  if (steps.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-[#346538] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2C5530] print:hidden"
      >
        <Icon name="chef-hat" size={16} color="var(--icon-color-on-dark)" /> {m.cookingStart}
      </button>
      {open && <CookingMode steps={steps} locale={locale} onClose={close} />}
    </>
  );
}
