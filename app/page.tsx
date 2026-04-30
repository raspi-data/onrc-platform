import Link from "next/link";

const steps = [
  {
    nr: "1",
    titlu: "Completezi formularul",
    desc: "Introduci CUI-ul firmei, adresa de email și tipul de document dorit.",
  },
  {
    nr: "2",
    titlu: "Plătești online",
    desc: "Plată securizată prin Stripe cu card bancar. Instant, fără comisioane ascunse.",
  },
  {
    nr: "3",
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
    a: "Oferim Certificat Constatator (standard și urgență 24h) și extras cu informații despre firmă.",
  },
  {
    q: "Ce se întâmplă dacă apare o eroare?",
    a: "Te contactăm imediat și rezolvăm problema. Dacă nu putem obține documentul, restituim banii integral.",
  },
  {
    q: "Datele mele sunt în siguranță?",
    a: "Da. Nu stocăm date de card - plata este procesată direct de Stripe. CUI-ul și emailul sunt folosite doar pentru livrarea documentului.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-gray-900">ONRC Certificate</span>
          </div>
          <Link
            href="/comanda"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Comandă acum
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
              Serviciu profesional · Livrare în 2 ore
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Certificat Constatator ONRC
              <span className="text-blue-600"> fără birocrație</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Obținem documentele ONRC în locul tău și le trimitem direct pe email.
              Rapid, sigur, fără cozi și fără deplasări.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/comanda"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Comandă document — de la 29 RON
              </Link>
              <a
                href="#cum-functioneaza"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cum funcționează?
              </a>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="px-6 py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Document oficial ONRC
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Plată securizată Stripe
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Livrare pe email în 2 ore
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Garanție de returnare bani
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="cum-functioneaza" className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Cum funcționează?
            </h2>
            <p className="text-center text-gray-500 mb-12">
              Trei pași simpli și documentul ajunge pe emailul tău.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.nr} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.nr}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.titlu}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-gray-50 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Prețuri</h2>
            <p className="text-center text-gray-500 mb-12">Transparent, fără taxe ascunse.</p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Extras informații</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  29 <span className="text-lg font-normal text-gray-500">RON</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">Livrare în 2 ore</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Informații de bază firmă
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Date ONRC actualizate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Livrat pe email
                  </li>
                </ul>
                <Link href="/comanda?tip=informatii_firme" className="block text-center border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Comandă
                </Link>
              </div>

              <div className="bg-blue-600 text-white rounded-2xl p-6 ring-2 ring-blue-600 ring-offset-2">
                <div className="text-xs font-semibold bg-white text-blue-600 inline-block px-2 py-1 rounded-full mb-3">
                  POPULAR
                </div>
                <h3 className="font-semibold mb-2">Certificat Constatator</h3>
                <p className="text-3xl font-bold mb-1">
                  49 <span className="text-lg font-normal opacity-75">RON</span>
                </p>
                <p className="text-sm opacity-75 mb-4">Livrare în 2 ore</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-200 mt-0.5">✓</span> Certificat oficial ONRC
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-200 mt-0.5">✓</span> Document cu valoare juridică
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-200 mt-0.5">✓</span> PDF descărcat direct ONRC
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-200 mt-0.5">✓</span> Livrat pe email
                  </li>
                </ul>
                <Link href="/comanda?tip=certificat_constatator" className="block text-center bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Comandă acum
                </Link>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Certificat Urgență</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  79 <span className="text-lg font-normal text-gray-500">RON</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">Prioritate maximă</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Tot ce include Standard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Prioritate maximă
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span> Livrare garantată 24h
                  </li>
                </ul>
                <Link href="/comanda?tip=certificat_constatator_urgenta" className="block text-center border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Comandă
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Întrebări frecvente
            </h2>
            <div className="space-y-6">
              {faq.map((item, i) => (
                <div key={i} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 px-6 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Gata să obții documentul?
            </h2>
            <p className="text-blue-100 mb-8">
              Comandă acum și primești documentul pe email în 2 ore.
            </p>
            <Link
              href="/comanda"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Comandă acum
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ONRC Certificate Platform</p>
          <div className="flex gap-6">
            <span>Plăți securizate Stripe</span>
            <span>Document oficial ONRC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
