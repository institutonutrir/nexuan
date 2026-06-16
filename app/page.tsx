'use client';

export default function Home() {
  const modules = [
    {
      id: 1,
      title: '📋 Engenharia de Cardápios',
      description: 'Ficha Técnica e Análise Smith-Kasavanas',
      color: 'bg-blue-50',
      icon: '🍽️',
    },
    {
      id: 2,
      title: '✅ Auditoria RDC 216',
      description: 'Checklist digital de conformidade',
      color: 'bg-green-50',
      icon: '📋',
    },
    {
      id: 3,
      title: '📄 Documentos Regulatórios',
      description: 'MBP, POPs e APPCC',
      color: 'bg-yellow-50',
      icon: '📑',
    },
    {
      id: 4,
      title: '👥 Gestão de RH',
      description: 'Dimensionamento e Produtividade',
      color: 'bg-purple-50',
      icon: '👨‍💼',
    },
    {
      id: 5,
      title: '🏷️ Rotulagem Nutricional',
      description: 'Conformidade com Anvisa 429/2020',
      color: 'bg-red-50',
      icon: '📊',
    },
    {
      id: 6,
      title: '📦 Estoque e Finanças',
      description: 'Controle e Tabulação Financeira',
      color: 'bg-indigo-50',
      icon: '💰',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍽️ NexUAN
          </h1>
          <p className="text-xl text-gray-600">
            Sistema de Gestão de Unidades de Alimentação e Nutrição
          </p>
          <p className="text-gray-500 mt-2">
            Com conformidade total com normas Anvisa RDC 216, RDC 429 e IN 75/2020
          </p>
        </div>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`${module.color} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="text-4xl mb-3">{module.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {module.title}
              </h2>
              <p className="text-gray-600">{module.description}</p>
              <button className="mt-4 w-full bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition">
                Acessar
              </button>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ℹ️ Próximos Passos
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Conectar ao Supabase (banco de dados)</li>
            <li>Criar sua conta e primeiro cliente</li>
            <li>Começar com o módulo que preferir</li>
            <li>Gerar seus relatórios e documentos</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
