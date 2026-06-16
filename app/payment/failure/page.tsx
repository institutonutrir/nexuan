'use client';

import Link from 'next/link';

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#be1621' }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: '#385e81' }}>
          Pagamento não confirmado
        </h1>

        <p className="text-lg text-slate-600 mb-2">
          Houve um problema ao processar seu pagamento.
        </p>

        <p className="text-slate-500 mb-8">
          Por favor, verifique seus dados e tente novamente. Se o problema persistir, entre em contato com o suporte.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: '#385e81' }}
          >
            Tentar Novamente
          </Link>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-lg font-semibold border-2 transition-all"
            style={{ borderColor: '#385e81', color: '#385e81' }}
          >
            Voltar para Home
          </Link>
        </div>

        <p className="text-xs text-slate-500 mt-8">
          Dúvidas? Entre em contato com nutrir@institutonutrir.com
        </p>
      </div>
    </div>
  );
}
