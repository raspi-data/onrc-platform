"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [cui, setCui] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cui.trim()) {
      router.push(`/comanda?cui=${cui.trim()}`);
    } else {
      router.push("/comanda");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
      <div className="flex-1 relative">
        <input
          type="text"
          value={cui}
          onChange={(e) => setCui(e.target.value)}
          placeholder="CUI firmă"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
      >
        Comandă
      </button>
    </form>
  );
}
