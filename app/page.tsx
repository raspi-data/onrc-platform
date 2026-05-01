import Link from "next/link";
import HeaderSearch from "./components/HeaderSearch";

const steps = [
  {
    nr: "01",
    titlu: "Completezi formularul",
    desc: "Introduci CUI-ul firmei, adresa de email și tipul de document dorit.",
  },
  {
    nr: "02",
    titlu: "Plătești online",
    desc: "Plată securizată prin Stripe cu card bancar. Instant, fără comisioane ascunse.",
  },
  {
    nr: "03",
    titlu: "Primești documentul",
    desc: "Obținem documentul de pe portal.onrc.ro și îl trimitem pe email în 2 ore.",
  },
];

const faq = [
  {
    q: "Cât durează să primesc documentul?",
    a: "În cele mai multe cazuri livrăm în 2 ore de la plată. În orele aglomerate poate dura până la 4 ore.",
  },
  {
    q: "Este documentul oficial valabil?",
    a: "Da. Documentul este descărcat direct de pe portalul oficial ONRC și are valoare juridică deplină.",
  },
  {
    q: "Ce tipuri de documente oferiți?",
    a: "Oferim Certificat Constatator (standard și urgență), precum și extras cu informații despre firmă.",
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

const trustBadges = [
  { label: "Document oficial ONRC" },
  { label: "Plată securizată Stripe" },
  { label: "Livrare în 2 ore" },
  { label: "Garanție returnare bani" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-semibold text-foreground text-base tracking-tight">ONRC Certificate</span>
          </div>

          {/* Quick order bar */}
          <HeaderSearch />

          {/* Mobile CTA */}
          <Link
            href="/comanda"
            className="md:hidden bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            Comandă
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-surface px-6 py-20 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-light text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-8 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
              Serviciu profesional · Livrare în 2 ore
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight text-balance">
              Certificat Constatator ONRC{" "}
              <span className="text-brand">livrat pe email</span>
            </h1>
            <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              Obținem documentele oficiale ONRC în locul tău și le trimitem direct pe email.
              Rapid, sigur, fără cozi și fără deplasări.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/comanda"
                className="bg-brand text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-brand-dark transition-colors"
              >
                Comandă document — de la 29 RON
              </Link>
              <a
                href="#cum-functioneaza"
                className="border border-border text-foreground px-8 py-3.5 rounded-lg text-base font-medium hover:bg-background transition-colors"
              >
                Cum funcționează?
              </a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-foreground px-6 py-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-white">
                <svg className="w-4 h-4 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="cum-functioneaza" className="px-6 py-20 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Simplu și rapid</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Cum funcționează?
              </h2>
              <p className="text-muted max-w-lg mx-auto">
                Trei pași simpli și documentul ajunge pe emailul tău.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={step.nr} className="bg-surface border border-border rounded-xl p-6 relative">
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-8 -right-3 z-10">
                      <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                  <div className="text-3xl font-bold text-border mb-4 tracking-tight">{step.nr}</div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{step.titlu}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-surface border-y border-border px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Prețuri</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Transparent, fără taxe ascunse
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Card 1 */}
              <div className="border border-border rounded-xl p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-1">Extras Informații</h3>
                  <p className="text-xs text-muted">Livrare în 2 ore</p>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground tracking-tight">29</span>
                  <span className="text-muted font-medium">RON</span>
                </div>
                <ul className="space-y-2.5 text-sm text-muted mb-8 flex-1">
                  {["Informații de bază firmă", "Date ONRC actualizate", "PDF livrat pe email"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/comanda?tip=informatii_firme" className="block text-center border border-brand text-brand py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-light transition-colors">
                  Comandă
                </Link>
              </div>

              {/* Card 2 — Featured */}
              <div className="border-2 border-brand rounded-xl p-6 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Popular
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-1">Certificat Constatator</h3>
                  <p className="text-xs text-muted">Livrare în 2 ore</p>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground tracking-tight">49</span>
                  <span className="text-muted font-medium">RON</span>
                </div>
                <ul className="space-y-2.5 text-sm text-muted mb-8 flex-1">
                  {["Certificat oficial ONRC", "Document cu valoare juridică", "PDF descărcat direct ONRC", "Livrat pe email"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/comanda?tip=certificat_constatator" className="block text-center bg-brand text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-colors">
                  Comandă acum
                </Link>
              </div>

              {/* Card 3 */}
              <div className="border border-border rounded-xl p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-1">Certificat Urgență</h3>
                  <p className="text-xs text-muted">Prioritate maximă</p>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground tracking-tight">79</span>
                  <span className="text-muted font-medium">RON</span>
                </div>
                <ul className="space-y-2.5 text-sm text-muted mb-8 flex-1">
                  {["Tot ce include Standard", "Prioritate maximă", "Livrare garantată 24h"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/comanda?tip=certificat_constatator_urgenta" className="block text-center border border-brand text-brand py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-light transition-colors">
                  Comandă
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Întrebări frecvente
              </h2>
            </div>
            <div className="space-y-0 divide-y divide-border">
              {faq.map((item, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{item.q}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground px-6 py-16 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight text-balance">
              Gata să obții documentul?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Comandă acum și primești documentul oficial pe email în 2 ore.
              Fără deplasări, fără birocrație.
            </p>
            <Link
              href="/comanda"
              className="inline-block bg-brand text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-brand-dark transition-colors"
            >
              Comandă acum — de la 29 RON
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-medium text-foreground">ONRC Certificate</span>
          </div>
          <p>© {new Date().getFullYear()} ONRC Certificate Platform. Toate drepturile rezervate.</p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Plăți securizate Stripe · SSL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
