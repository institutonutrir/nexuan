'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const monthlyPrice = 39.90;
  const annualPrice = 334.80;
  const monthlyValue = (annualPrice / 12).toFixed(2);

  const features = [
    'Engenharia de Cardápios',
    'Auditoria RDC 216',
    'Documentos Regulatórios',
    'Gestão de RH',
    'Rotulagem Nutricional',
    'Controle de Estoque',
    'Suporte por email',
    'Atualizações automáticas',
    'Backup de dados',
  ];

  const handlePayment = async () => {
    const amount = billingCycle === 'monthly' ? monthlyPrice : annualPrice;

    try {
      const response = await fetch('/api/payment/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          billingCycle,
        }),
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
  };

  return (
    <div className="py-16 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#385e81' }}>
            Preços Simples e Transparentes
          </h1>
          <p className="text-xl text-slate-600">
            Acesso completo a todos os módulos com um único plano
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Anual{' '}
              <span
                className="ml-2 inline-block px-2 py-1 text-xs rounded-full text-white"
                style={{ backgroundColor: '#ffc053' }}
              >
                -30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl shadow-xl overflow-hidden"
            style={{ borderTop: '4px solid #385e81' }}
          >
            {/* Card Header */}
            <div
              className="p-8 text-white"
              style={{ backgroundColor: '#385e81' }}
            >
              <h2 className="text-2xl font-bold mb-2">NexUAN Pro</h2>
              <p className="opacity-90">Acesso completo a todos os módulos</p>
            </div>

            {/* Card Body */}
            <div className="p-8 bg-white">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold" style={{ color: '#385e81' }}>
                    R$ {billingCycle === 'monthly' ? monthlyPrice.toFixed(2) : annualPrice.toFixed(2)}
                  </span>
                  <span className="text-slate-600 ml-2">
                    {billingCycle === 'monthly' ? '/mês' : '/ano'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-slate-600">
                    {monthlyValue} por mês quando cobrado anualmente
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-900 mb-4">Incluso:</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-700">
                      <svg
                        className="w-5 h-5 mr-3"
                        style={{ color: '#4d7e61' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePayment}
                className="w-full py-4 rounded-lg font-bold text-white text-lg transition-all hover:shadow-lg"
                style={{ backgroundColor: '#385e81' }}
              >
                Começar Agora
              </button>

              {/* Payment Info */}
              <p className="text-center text-xs text-slate-500 mt-6">
                Pagamento seguro com Mercado Pago
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#385e81' }}>
            Dúvidas Frequentes
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'Posso cancelar a qualquer momento?',
                answer:
                  'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.',
              },
              {
                question: 'Como funciona o acesso?',
                answer:
                  'Após o pagamento, você recebe acesso imediato a todos os módulos via sua conta pessoal.',
              },
              {
                question: 'Todos os dados ficam salvos?',
                answer:
                  'Sim, todos os seus dados são armazenados com segurança na nuvem e podem ser exportados a qualquer momento.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
