'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do usuário
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div
              className="w-12 h-12 rounded-full border-4 border-slate-200"
              style={{ borderTopColor: '#385e81' }}
            />
          </div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#385e81' }}>
            Bem-vindo, {user?.full_name || 'Usuário'}!
          </h1>
          <p className="text-slate-600 mt-2">Aqui você gerencia sua UAN</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#385e81' }}>
            <p className="text-slate-600 text-sm mb-2">Status da Assinatura</p>
            <p className="text-2xl font-bold text-emerald-600">Ativa</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#4d7e61' }}>
            <p className="text-slate-600 text-sm mb-2">Clientes Cadastrados</p>
            <p className="text-2xl font-bold" style={{ color: '#385e81' }}>0</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#ffc053' }}>
            <p className="text-slate-600 text-sm mb-2">Auditorias</p>
            <p className="text-2xl font-bold" style={{ color: '#385e81' }}>0</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#be1621' }}>
            <p className="text-slate-600 text-sm mb-2">Produtos</p>
            <p className="text-2xl font-bold" style={{ color: '#385e81' }}>0</p>
          </div>
        </div>

        {/* Módulos */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#385e81' }}>
            Acessar Módulos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Engenharia de Cardápios',
                desc: 'Gerenciar fichas técnicas',
                color: '#e8f0f7',
                borderColor: '#385e81',
              },
              {
                title: 'Auditoria RDC 216',
                desc: 'Realizar auditorias',
                color: '#f0f8f5',
                borderColor: '#4d7e61',
              },
              {
                title: 'Documentos',
                desc: 'Gerar MBP, POPs',
                color: '#fff9e6',
                borderColor: '#ffc053',
              },
              {
                title: 'Gestão RH',
                desc: 'Dimensionamento',
                color: '#f8f3f0',
                borderColor: '#9c2234',
              },
              {
                title: 'Rotulagem',
                desc: 'Conformidade Anvisa',
                color: '#ffe8e8',
                borderColor: '#be1621',
              },
              {
                title: 'Estoque',
                desc: 'Controle financeiro',
                color: '#f5f0fa',
                borderColor: '#385e81',
              },
            ].map((module, i) => (
              <div
                key={i}
                className="rounded-lg p-6 border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                style={{ backgroundColor: module.color, borderColor: module.borderColor }}
              >
                <h3 className="font-semibold text-slate-900 mb-2">{module.title}</h3>
                <p className="text-sm text-slate-600">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-lg p-8 text-white text-center"
          style={{ backgroundColor: '#385e81' }}
        >
          <h3 className="text-2xl font-bold mb-2">Comece a Usar o NexUAN</h3>
          <p className="opacity-90 mb-6">
            Crie seu primeiro cliente para começar a gerenciar sua UAN
          </p>
          <button className="px-8 py-3 rounded-lg font-semibold bg-white text-slate-900 hover:bg-opacity-90 transition">
            Criar Primeiro Cliente
          </button>
        </div>
      </div>
    </div>
  );
}
