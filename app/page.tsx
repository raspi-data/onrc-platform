import Link from "next/link";
import HeroInput from "./components/HeroInput";
import FaqAccordion from "./components/FaqAccordion";

const steps = [
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    titlu: "Introdu CUI",
    desc: "Completează codul unic de înregistrare al firmei tale.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    titlu: "Plătești Online",
    desc: "Procesare securizată cu cardul în mai puțin de 30 secunde.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titlu: "Primești pe E-mail",
    desc: "Descarcă certificatul oficial direct în căsuța poștală.",
  },
];

const features = [
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    titlu: "Viteză Fulger",
    desc: "Documente livrate în medie sub 2 minute de la comandă.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titlu: "Suport 24/7",
    desc: "Echipa noastră este disponibilă non-stop pentru tine.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titlu: "Date Securizate",
    desc: "Protecție completă a datelor tale. GDPR conform.",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    titlu: "Date Oficiale ONRC",
    desc: "Informații extrase direct din registrul oficial.",
  },
];

const testimonials = [
  {
    stars: 5,
    text: "Cel mai rapid mod de a obține constatorul. Am primit documentul în 3 minute pe mail, exact când aveam nevoie la bancă.",
    name: "Andrei Popescu",
    role: "Antreprenor Tech",
  },
  {
    stars: 5,
    text: "Interfața foarte curată și procesul este extrem de intuitiv. Recomand cu încredere tuturor colegilor.",
    name: "Maria Ionescu",
    role: "Manager Operațiuni",
  },
  {
    stars: 5,
    text: "Am salvat cel puțin 2 ore pe care le-aș fi pierdut pe drumuri. Serviciul merită fiecare leu.",
    name: "Robert Stanciu",
    role: "Fondator Startup",
  },
];

const plans = [
  {
    titlu: "Extras Informații",
    pret: "29",
    desc: "Livrare în 2 ore",
    features: ["Informații de bază firmă", "Date ONRC actualizate", "PDF livrat pe email"],
    cta: "Comandă",
    href: "/comanda?tip=informatii_firme",
    featured: false,
  },
  {
    titlu: "Certificat Constatator",
    pret: "49",
    desc: "Cel mai solicitat",
    features: ["Certificat oficial ONRC", "Document cu valoare juridică", "PDF descărcat direct ONRC", "Livrat pe email în 2h"],
    cta: "Comandă Acum",
    href: "/comanda?tip=certificat_constatator",
    featured: true,
  },
  {
    titlu: "Certificat Urgență",
    pret: "79",
    desc: "Prioritate maximă",
    features: ["Tot ce include Standard", "Prioritate maximă", "Livrare garantată în 1h"],
    cta: "Comandă",
    href: "/comanda?tip=certificat_constatator_urgenta",
    featured: false,
  },
];

const navLinks = [
  { label: "Certificat", href: "#cum-functioneaza" },
  { label: "Tarife", href: "#tarife" },
  { label: "Întrebări Frecvente", href: "#faq" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <Link href="/" className="text-navy font-bold text-lg tracking-tight shrink-0">
            CertificatInstant
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Link
            href="/comanda"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0 shadow-sm"
          >
            Comandă Acum
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 via-white to-white px-6 pt-20 pb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight text-balance">
              Certificat Constatator Online,{" "}
              <span className="text-blue-600">Instant și Sigur</span>
            </h1>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Obține documentul oficial de la ONRC în câteva minute, direct pe e-mail.
              Fără cozi, fără birocrație.
            </p>

            <HeroInput />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Plată Securizată
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Conform GDPR
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Date oficiale ONRC
              </span>
            </div>
          </div>
        </section>

        {/* Cum functioneaza */}
        <section id="cum-functioneaza" className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Cum funcționează?
              </h2>
              <div className="w-10 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>
            <div className="grid sm:grid-cols-3 gap-12">
              {steps.map((step) => (
                <div key={step.titlu} className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">{step.titlu}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* De ce noi */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight text-balance">
                De ce să ne alegi pe noi?
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                Simplificăm accesul la informații oficiale folosind tehnologie de ultimă oră pentru viteză maximă și securitate garantată.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {features.map((f) => (
                  <div key={f.titlu} className="flex flex-col gap-2">
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      {f.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{f.titlu}</span>
                    <span className="text-gray-500 text-xs leading-relaxed">{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80"
                alt="Profesionist la laptop — certificat ONRC"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Validitate Legală</p>
                  <p className="text-xs text-gray-500">Direct din baza de date ONRC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimoniale */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Mărturii clienți
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.name} className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarife */}
        <section id="tarife" className="px-6 py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Tarife
              </h2>
              <p className="text-gray-500 text-sm">Prețuri transparente, fără taxe ascunse.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.titlu}
                  className={`relative rounded-2xl p-6 flex flex-col border ${
                    plan.featured
                      ? "border-blue-600 bg-white shadow-lg"
                      : "border-gray-100 bg-white shadow-sm"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{plan.titlu}</h3>
                    <p className="text-xs text-gray-400">{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">{plan.pret}</span>
                    <span className="text-gray-400 font-medium text-sm">RON</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-gray-500 mb-8 flex-1">
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                      plan.featured
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-6 py-20 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Întrebări Frecvente
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 bg-white text-center border-t border-gray-100">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4 tracking-tight text-balance">
              Ești gata să scapi de birocrație?
            </h2>
            <Link
              href="/comanda"
              className="inline-block text-blue-600 font-semibold text-base hover:underline"
            >
              Obține Certificatul Acum
            </Link>
            <div className="mt-4 w-24 h-0.5 bg-gray-200 mx-auto" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-900 text-sm">Certificat Constatator Online</p>
            <p className="text-xs text-gray-400 mt-1">
              &copy; {new Date().getFullYear()} CertificatInstant. Documente oficiale emise rapid.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <Link href="/termeni" className="hover:text-gray-700 transition-colors">Termeni și Condiții</Link>
            <Link href="/confidentialitate" className="hover:text-gray-700 transition-colors">Politica de Confidențialitate</Link>
            <a href="https://www.anpc.ro" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">ANPC</a>
            <Link href="/gdpr" className="hover:text-gray-700 transition-colors">GDPR</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
