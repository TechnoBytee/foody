"use client";

import Link from "next/link";
import { getMessages } from "@/i18n";
import { addIngredients } from "@/lib/shopping-list";
import Icon from "./Icon";

export default function ShoppingListButton({
  ingredients,
  locale,
}: {
  ingredients: string[];
  locale: "tr" | "en";
}) {
  const m = getMessages(locale);
  const add = () => addIngredients(window.localStorage, ingredients);

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <button
        onClick={add}
        className="inline-flex items-center gap-2 rounded-md border border-[#EAEAEA] px-4 py-2 text-sm transition hover:bg-[#F7F6F3]"
      >
        <Icon name="shopping-cart" size={16} /> {m.addToShoppingList}
      </button>
      <Link
        href={`/${locale}/alisveris`}
        className="text-xs uppercase tracking-widest text-[#787774] transition hover:text-[#2F3437]"
      >
        {m.shoppingList}
      </Link>
    </div>
  );
}
