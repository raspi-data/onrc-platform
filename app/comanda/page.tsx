"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const DOCUMENT_TYPES = [
  { value: "certificat_constatator", label: "Certificat Constatator", price: "49 RON", desc: "Livrare în 2 ore" },
  { value: "certificat_constatator_urgenta", label: "Certificat Constatator — Urgență", price: "79 RON", desc: "Prioritate maximă, 24h" },
  { value: "informatii_firme", label: "Informații firmă (extras)", price: "29 RON", desc: "Livrare în 2 ore" },
];

function OrderForm() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const defaultTip = searchParams.get("tip") || "certificat_constatator";

  const [cui, setCui] = useState("");
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState(defaultTip);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedDoc = DOCUMENT_TYPES.find((d) => d.value === documentType);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cui, email, documentType }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "A apărut o eroare. Te rugăm să încerci din nou.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Eroare de rețea. Verifică conexiunea și încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">O</span>
            </div>
            <span className="font-semibold text-gray-900">ONRC Certificate</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Comandă document</h1>
          <p className="text-gray-500 mb-8">Completează formularul și vei fi redirecționat către plată.</p>

          {cancelled && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg mb-6 text-sm">
              Plata a fost anulată. Poți relua comanda oricând.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            {/* Document type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tip document
              </label>
              <div className="space-y-3">
                {DOCUMENT_TYPES.map((doc) => (
                  <label
                    key={doc.value}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      documentType === doc.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="documentType"
                      value={doc.value}
                      checked={documentType === doc.value}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      documentType === doc.value ? "border-blue-600" : "border-gray-300"
                    }`}>
                      {documentType === doc.value && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{doc.label}</div>
                      <div className="text-xs text-gray-500">{doc.desc}</div>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">{doc.price}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* CUI */}
            <div>
              <label htmlFor="cui" className="block text-sm font-medium text-gray-700 mb-1.5">
                CUI / Cod fiscal
              </label>
              <input
                id="cui"
                type="text"
                value={cui}
                onChange={(e) => setCui(e.target.value.replace(/[^0-9ROrO]/g, ""))}
                placeholder="ex: 12345678"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">Fără prefix RO, doar cifrele</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Adresă email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplu.ro"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">Documentul PDF va fi trimis la această adresă</p>
            </div>

            {/* Summary */}
            {selectedDoc && (
              <div className="bg-gray-50 rounded-xl p-4 text-sm">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>{selectedDoc.label}</span>
                  <span>{selectedDoc.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{selectedDoc.price}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Se procesează...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Continuă la plată
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              Plată securizată prin Stripe · SSL · Garanție returnare bani
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ComandaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă...</div>}>
      <OrderForm />
    </Suspense>
  );
}
