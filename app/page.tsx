'use client';

export default function Home() {
  const modules = [
    {
      id: 1,
      title: 'Engenharia de Cardápios',
      description: 'Ficha técnica, precificação e análise de desempenho com matriz Smith-Kasavanas',
      color: '#e8f0f7',
      borderColor: '#385e81',
    },
    {
      id: 2,
      title: 'Auditoria RDC 216',
      description: 'Checklist digital completo com geração de relatório de conformidade',
      color: '#f0f8f5',
      borderColor: '#4d7e61',
    },
    {
      id: 3,
      title: 'Documentos Regulatórios',
      description: 'Gerador automático de MBP, POPs e Plano APPCC',
      color: '#fff9e6',
      borderColor: '#ffc053',
    },
    {
      id: 4,
      title: 'Gestão de RH e Produtividade',
      description: 'Dimensionamento de equipe, IPI, IPF e distribuição de tarefas',
      color: '#f8f3f0',
      borderColor: '#9c2234',
    },
    {
      id: 5,
      title: 'Rotulagem Nutricional',
      description: 'Conformidade com RDC 429/2020 e IN 75/2020 - Alerta automático de Lupa',
      color: '#ffe8e8',
      borderColor: '#be1621',
    },
    {
      id: 6,
      title: 'Estoque e Tabulação Financeira',
      description: 'Controle de inventário, estoque mínimo e análise de custos',
      color: '#f5f0fa',
      borderColor: '#385e81',
    },
  ];

  return (
    <div className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <div
            className="rounded-xl p-12 text-white shadow-lg"
            style={{ backgroundColor: '#385e81' }}
          >
            <h1 className="text-4xl font-bold mb-4">NexUAN</h1>
            <p className="text-xl font-light mb-2">Sistema de Gestão de Unidades de Alimentação e Nutrição</p>
            <p className="text-base opacity-90">
              Plataforma completa para nutricionistas e consultores com conformidade total às normas Anvisa
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold" style={{ color: '#385e81' }}>Módulos Principais</h2>
            <p className="text-slate-600 mt-2">Ferramentas práticas para cada aspecto da gestão de UAN</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-l-4 bg-white"
                style={{ borderColor: module.borderColor, backgroundColor: module.color }}
              >
                <h3 className="text-lg font-bold mb-3" style={{ color: '#385e81' }}>
                  {module.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {module.description}
                </p>
                <button
                  className="w-full py-2 rounded-lg font-semibold text-white transition-all text-sm"
                  style={{ backgroundColor: module.borderColor }}
                >
                  Acessar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div
          className="rounded-xl p-10 text-white"
          style={{ backgroundColor: '#4d7e61' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">6</div>
              <p className="text-sm opacity-90">Módulos Integrados</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="text-sm opacity-90">Conformidade Anvisa</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Automático</div>
              <p className="text-sm opacity-90">Geração de Relatórios</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">SaaS</div>
              <p className="text-sm opacity-90">Nuvem Segura</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#385e81' }}>
            Comece Agora
          </h3>
          <p className="text-slate-600 mb-8">Crie sua conta e comece a gerenciar sua UAN com eficiência</p>
          <button
            className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#385e81' }}
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}
