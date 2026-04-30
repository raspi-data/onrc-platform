import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">Plată reușită!</h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Comanda ta a fost primită și procesăm documentul în acest moment.{" "}
          <strong>Vei primi un email de confirmare imediat</strong>, iar documentul PDF va fi
          trimis pe email în cel mult <strong>2 ore</strong>.
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700">
          <p className="font-medium mb-1">Ce se întâmplă acum?</p>
          <ol className="text-left space-y-1 text-blue-600 list-decimal list-inside">
            <li>Confirmare comandă trimisă pe email</li>
            <li>Obținem documentul de pe portal.onrc.ro</li>
            <li>Trimitem PDF-ul pe emailul tău</li>
          </ol>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Dacă nu primești emailul în 2 ore, verifică folderul Spam sau contactează-ne.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Înapoi acasă
        </Link>
      </div>
    </div>
  );
}
