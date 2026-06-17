export default function TestePage() {
  return (
    <div className="py-8 px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#385e81' }}>
          ✅ NexUAN Está Funcionando!
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Seu servidor Next.js + Supabase está online e operacional.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-slate-900 mb-2">✓ Frontend (React + Next.js)</h3>
            <p className="text-sm text-slate-600">Página renderizando corretamente</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-slate-900 mb-2">✓ Banco de Dados (Supabase)</h3>
            <p className="text-sm text-slate-600">Conectado e pronto para uso</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-slate-900 mb-2">✓ Domínio Custom</h3>
            <p className="text-sm text-slate-600">nexuan.institutonutrir.com rodando</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 mb-3">🚧 Módulos em Desenvolvimento:</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>✓ Autenticação (Login/Signup)</li>
            <li>✓ Plano de Assinatura (Mercado Pago)</li>
            <li>✓ Dashboard Principal</li>
            <li>🔄 Auditoria RDC 216/275 (em ajustes)</li>
            <li>⏳ Relatórios e Gráficos</li>
            <li>⏳ Outros módulos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
