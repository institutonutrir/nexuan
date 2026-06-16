'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  useEffect(() => {
    // Redirecionar para dashboard após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#4d7e61' }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: '#385e81' }}>
          Pagamento Confirmado!
        </h1>

        <p className="text-lg text-slate-600 mb-2">
          Sua assinatura foi ativada com sucesso.
        </p>

        <p className="text-slate-500 mb-8">
          Você será redirecionado para o dashboard em alguns segundos...
        </p>

        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all"
          style={{ backgroundColor: '#385e81' }}
        >
          Ir para Dashboard
        </Link>

        <p className="text-xs text-slate-500 mt-8">
          Um confirmação de pagamento foi enviada para seu email.
        </p>
      </div>
    </div>
  );
}
