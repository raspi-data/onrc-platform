"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const DOCUMENT_TYPES = [
  {
    value: "certificat_constatator",
    label: "Certificat Constatator",
    price: "49 RON",
    priceNum: 49,
    desc: "Livrare în 2 ore · Document oficial cu valoare juridică",
    popular: true,
  },
  {
    value: "certificat_constatator_urgenta",
    label: "Certificat Constatator — Urgență",
    price: "79 RON",
    priceNum: 79,
    desc: "Prioritate maximă · Livrare garantată 24h",
    popular: false,
  },
  {
    value: "informatii_firme",
    label: "Extras Informații Firmă",
    price: "29 RON",
    priceNum: 29,
    desc: "Livrare în 2 ore · Informații de bază despre firmă",
    popular: false,
  },
];

function OrderForm() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");
  const defaultCui = searchParams.get("cui") || "";
  const defaultTip = searchParams.get("tip") || "certificat_constatator";

  const [cui, setCui] = useState(defaultCui);
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-muted hover:text-foreground transition-colors p-1 -ml-1 rounded-lg hover:bg-background">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="w-px h-5 bg-border"></div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-md flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground text-sm">ONRC Certificate</span>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-muted">
            <svg className="w-3.5 h-3.5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Plată securizată SSL · Stripe
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-surface border-b border-border px-6 py-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="font-semibold text-brand">1. Detalii comandă</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>2. Plată</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>3. Confirmare</span>
          </div>
        </div>
      </div>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1 tracking-tight">Comandă document ONRC</h1>
            <p className="text-muted text-sm">Completează formularul și vei fi redirecționat către plată securizată.</p>
          </div>

          {cancelled && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Plata a fost anulată. Poți relua comanda oricând.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 text-sm flex items-start gap-2">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document type */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                1. Selectează tipul documentului
              </h2>
              <div className="space-y-3">
                {DOCUMENT_TYPES.map((doc) => (
                  <label
                    key={doc.value}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      documentType === doc.value
                        ? "border-brand bg-brand-light"
                        : "border-border hover:border-muted"
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
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      documentType === doc.value ? "border-brand" : "border-muted"
                    }`}>
                      {documentType === doc.value && (
                        <div className="w-2 h-2 rounded-full bg-brand" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{doc.label}</span>
                        {doc.popular && (
                          <span className="bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted mt-0.5">{doc.desc}</div>
                    </div>
                    <div className="font-bold text-foreground text-sm shrink-0">{doc.price}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                2. Datele firmei și livrare
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cui" className="block text-sm font-medium text-foreground mb-1.5">
                    CUI / Cod fiscal
                  </label>
                  <input
                    id="cui"
                    type="text"
                    value={cui}
                    onChange={(e) => setCui(e.target.value.replace(/[^0-9ROrO]/g, ""))}
                    placeholder="ex: 12345678"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-background text-foreground placeholder-muted text-sm"
                  />
                  <p className="text-xs text-muted mt-1">Fără prefix RO, doar cifrele</p>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Adresă email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplu.ro"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-background text-foreground placeholder-muted text-sm"
                  />
                  <p className="text-xs text-muted mt-1">Documentul PDF va fi trimis la această adresă</p>
                </div>
              </div>
            </div>

            {/* Order summary */}
            {selectedDoc && (
              <div className="bg-surface border border-border rounded-xl p-5">
                <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Sumar comandă
                </h2>
                <div className="flex justify-between items-center text-sm text-muted mb-2">
                  <span>{selectedDoc.label}</span>
                  <span>{selectedDoc.price}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-semibold text-foreground text-sm">Total de plată</span>
                  <span className="font-bold text-foreground text-lg">{selectedDoc.price}</span>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-white py-3.5 rounded-lg font-semibold hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-base"
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
                  Continuă la plată securizată
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                SSL Securizat
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Stripe Payments
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Garanție returnare
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ComandaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm text-muted">Se încarcă...</span>
        </div>
      </div>
    }>
      <OrderForm />
    </Suspense>
  );
}
