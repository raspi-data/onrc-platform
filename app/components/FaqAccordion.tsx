"use client";

import { useState } from "react";

const faq = [
  {
    q: "Cât durează primirea certificatului?",
    a: "În cele mai multe cazuri livrăm în 2 ore de la plată. În orele aglomerate poate dura până la 4 ore.",
  },
  {
    q: "Este documentul recunoscut oficial?",
    a: "Da. Documentul este descărcat direct de pe portalul oficial ONRC și are valoare juridică deplină.",
  },
  {
    q: "Ce date sunt necesare pentru comandă?",
    a: "Ai nevoie de CUI-ul firmei, adresa ta de email și tipul de document dorit. Nimic altceva.",
  },
  {
    q: "Ce se întâmplă dacă apare o eroare?",
    a: "Te contactăm imediat și rezolvăm problema. Dacă nu putem obține documentul, restituim banii integral.",
  },
  {
    q: "Datele mele sunt în siguranță?",
    a: "Da. Nu stocăm date de card — plata este procesată direct de Stripe. CUI-ul și emailul sunt folosite doar pentru livrare.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-100">
      {faq.map((item, i) => (
        <div key={i} className="py-4">
          <button
            className="w-full flex items-center justify-between text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-gray-900 font-medium text-sm">{item.q}</span>
            <svg
              className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
