import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <div className="w-7 h-7 bg-brand rounded-md flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-foreground text-sm">ONRC Certificate</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full">
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-50 border-2 border-success rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Plată reușită!</h1>
            <p className="text-muted leading-relaxed">
              Comanda ta a fost primită. Procesăm documentul chiar acum.
            </p>
          </div>

          {/* Steps card */}
          <div className="bg-surface border border-border rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Ce se întâmplă acum?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-light border border-brand rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Confirmare trimisă pe email</p>
                  <p className="text-xs text-muted mt-0.5">Ai primit un email de confirmare a comenzii.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-light border border-brand rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand">2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Obținem documentul de pe ONRC</p>
                  <p className="text-xs text-muted mt-0.5">Accesăm portalul oficial portal.onrc.ro pentru tine.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-muted">3</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Primești PDF-ul pe email</p>
                  <p className="text-xs text-muted mt-0.5">Documentul va fi trimis în cel mult <strong className="text-foreground">2 ore</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-800">
              Dacă nu primești emailul în 2 ore, verifică folderul <strong>Spam / Junk</strong> sau contactează-ne.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-border text-foreground py-3 rounded-lg font-medium hover:bg-surface transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Înapoi la pagina principală
          </Link>
        </div>
      </main>

      {/* Footer note */}
      <div className="bg-surface border-t border-border px-6 py-4 text-center">
        <p className="text-xs text-muted">
          Plată procesată securizat prin Stripe · Document oficial descărcat de pe portal.onrc.ro
        </p>
      </div>
    </div>
  );
}
