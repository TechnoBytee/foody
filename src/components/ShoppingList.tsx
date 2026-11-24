"use client";

import { useSyncExternalStore } from "react";
import { getMessages } from "@/i18n";
import {
  clearList,
  emptyList,
  shoppingSnapshot,
  subscribeShopping,
  toggleItem,
} from "@/lib/shopping-list";
import Icon from "./Icon";

export default function ShoppingList({ locale }: { locale: "tr" | "en" }) {
  const items = useSyncExternalStore(subscribeShopping, shoppingSnapshot, () => emptyList);
  const m = getMessages(locale);

  if (items.length === 0) return <p className="text-sm text-[#787774]">{m.shoppingEmpty}</p>;

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.text}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#EAEAEA] bg-white p-3 text-sm">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(window.localStorage, item.text)}
                className="h-4 w-4 accent-[#346538]"
              />
              <span className={item.done ? "text-[#787774] line-through" : "text-[#2F3437]"}>
                {item.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => clearList(window.localStorage)}
        className="inline-flex w-fit items-center gap-2 rounded-md border border-[#EAEAEA] px-4 py-2 text-sm transition hover:bg-[#F7F6F3]"
      >
        <Icon name="x" size={14} /> {m.clearList}
      </button>
    </div>
  );
}
