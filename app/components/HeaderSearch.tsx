"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeaderSearch() {
  const [cui, setCui] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && cui.trim()) {
      window.location.href = `/comanda?cui=${cui.trim()}`;
    }
  }

  function handleComandarapid() {
    if (cui.trim()) {
      window.location.href = `/comanda?cui=${cui.trim()}`;
    } else {
      window.location.href = "/comanda";
    }
  }

  return (
    <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted font-medium">
          CUI:
        </span>
        <input
          type="text"
          value={cui}
          onChange={(e) => setCui(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex: 12345678"
          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-background text-foreground placeholder:text-muted"
        />
      </div>
      <button
        onClick={handleComandarapid}
        className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap"
      >
        Comandă rapid
      </button>
    </div>
  );
}
