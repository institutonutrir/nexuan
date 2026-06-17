'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Auditoria {
  id: string;
  cliente: string;
  rdc: 'RDC 216' | 'RDC 275';
  data: string;
  conformidade: number;
  status: 'em_progresso' | 'concluida';
}

export default function AuditoriasPage() {
  const [auditorias, setAuditorias] = useState<Auditoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Buscar auditorias do banco
    const fetchAuditorias = async () => {
      try {
        const response = await fetch('/api/auditorias');
        if (!response.ok) {
          throw new Error('Erro ao buscar auditorias');
        }
        const data = await response.json();
        setAuditorias(data.auditorias || []);
      } catch (error) {
        console.error('Erro ao buscar auditorias:', error);
        setError('Erro ao carregar auditorias');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditorias();
  }, []);

  return (
    <div className="py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#385e81' }}>
              Auditorias RDC
            </h1>
            <p className="text-slate-600 mt-2">
              Gerencie suas auditorias de conformidade
            </p>
          </div>
          <Link
            href="/auditorias/nova"
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: '#385e81' }}
          >
            + Nova Auditoria
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#385e81' }}>
            <p className="text-slate-600 text-sm mb-2">Total de Auditorias</p>
            <p className="text-3xl font-bold" style={{ color: '#385e81' }}>
              {auditorias.length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#4d7e61' }}>
            <p className="text-slate-600 text-sm mb-2">Concluídas</p>
            <p className="text-3xl font-bold" style={{ color: '#4d7e61' }}>
              {auditorias.filter((a) => a.status === 'concluida').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#ffc053' }}>
            <p className="text-slate-600 text-sm mb-2">Em Progresso</p>
            <p className="text-3xl font-bold" style={{ color: '#ffc053' }}>
              {auditorias.filter((a) => a.status === 'em_progresso').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border-l-4" style={{ borderColor: '#be1621' }}>
            <p className="text-slate-600 text-sm mb-2">Conformidade Média</p>
            <p className="text-3xl font-bold" style={{ color: '#be1621' }}>
              {auditorias.length > 0
                ? Math.round(
                    auditorias.reduce((sum, a) => sum + a.conformidade, 0) /
                      auditorias.length
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        {/* Lista de Auditorias */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Carregando auditorias...</p>
          </div>
        ) : auditorias.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <p className="text-slate-600 mb-4">Nenhuma auditoria registrada ainda</p>
            <Link
              href="/auditorias/nova"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: '#385e81' }}
            >
              Começar Primeira Auditoria
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {auditorias.map((auditoria) => (
              <Link
                key={auditoria.id}
                href={`/auditorias/${auditoria.id}`}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border-l-4"
                style={{ borderColor: '#385e81' }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {auditoria.cliente}
                      </h3>
                      <span
                        className="text-xs px-3 py-1 rounded-full text-white"
                        style={{
                          backgroundColor:
                            auditoria.status === 'concluida' ? '#4d7e61' : '#ffc053',
                        }}
                      >
                        {auditoria.status === 'concluida' ? 'Concluída' : 'Em Progresso'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">
                      {auditoria.rdc} • {new Date(auditoria.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#385e81' }}>
                      {auditoria.conformidade}%
                    </div>
                    <p className="text-xs text-slate-600">Conformidade</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
