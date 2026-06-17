'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RDC216_CATEGORIES, RDC275_CATEGORIES } from '@/lib/rdc-checklists';

interface Resposta {
  itemId: string;
  resposta: 'S' | 'N' | 'NA' | null;
  observacao: string;
}

export default function ChecklistPage() {
  const params = useParams();
  const router = useRouter();
  const auditoria_id = params.id as string;

  const [auditoria, setAuditoria] = useState<any>(null);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState(0);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  useEffect(() => {
    const fetchAuditoria = async () => {
      try {
        const response = await fetch(`/api/auditorias/${auditoria_id}`);
        const data = await response.json();
        setAuditoria(data.auditoria);

        const categories =
          data.auditoria.rdc === 'RDC 216'
            ? RDC216_CATEGORIES
            : RDC275_CATEGORIES;

        setCurrentCategory(categories[0]);
        setCategoriaAtiva(0);

        // Inicializar respostas
        const allItems = categories.flatMap((cat: any) =>
          cat.items.map((item: any) => ({ itemId: item.id, resposta: null, observacao: '' }))
        );
        setRespostas(allItems);
      } catch (error) {
        console.error('Erro ao buscar auditoria:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditoria();
  }, [auditoria_id]);

  const handleResposta = (itemId: string, valor: 'S' | 'N' | 'NA') => {
    setRespostas((prev) =>
      prev.map((r) => (r.itemId === itemId ? { ...r, resposta: valor } : r))
    );
  };

  const handleObservacao = (itemId: string, texto: string) => {
    setRespostas((prev) =>
      prev.map((r) => (r.itemId === itemId ? { ...r, observacao: texto } : r))
    );
  };

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      const response = await fetch(`/api/auditorias/${auditoria_id}/respostas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respostas }),
      });

      if (response.ok) {
        router.push(`/auditorias/${auditoria_id}/resultado`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSalvando(false);
    }
  };

  if (loading || !auditoria || !currentCategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Carregando checklist...</p>
      </div>
    );
  }

  const categories =
    auditoria.rdc === 'RDC 216' ? RDC216_CATEGORIES : RDC275_CATEGORIES;

  const totalItems = categories.reduce((sum: number, cat: any) => sum + cat.items.length, 0);
  const respondidos = respostas.filter((r) => r.resposta !== null).length;

  return (
    <div className="py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#385e81' }}>
            Checklist {auditoria.rdc}
          </h1>
          <p className="text-slate-600 mt-2">{auditoria.cliente}</p>
        </div>

        {/* Progresso */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-slate-900">
              Progresso: {respondidos} de {totalItems} itens
            </p>
            <p className="text-2xl font-bold" style={{ color: '#385e81' }}>
              {Math.round((respondidos / totalItems) * 100)}%
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${(respondidos / totalItems) * 100}%`,
                backgroundColor: '#385e81',
              }}
            />
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categorias (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map((cat: any, idx: number) => {
                  const catItems = cat.items;
                  const catRespostas = respostas.filter((r) =>
                    catItems.some((item: any) => item.id === r.itemId)
                  );
                  const catRespondidos = catRespostas.filter((r) => r.resposta !== null).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoriaAtiva(idx);
                        setCurrentCategory(cat);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        categoriaAtiva === idx
                          ? 'bg-blue-100 border-l-4 border-blue-500'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-sm font-medium text-slate-900">{cat.name}</p>
                      <p className="text-xs text-slate-600 mt-1">
                        {catRespondidos}/{catItems.length}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Checklist (Main) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#385e81' }}>
                {currentCategory.name}
              </h2>
              <p className="text-slate-600 mb-8">{currentCategory.description}</p>

              {/* Items */}
              <div className="space-y-8">
                {currentCategory.items.map((item: any) => {
                  const resposta = respostas.find((r) => r.itemId === item.id);

                  return (
                    <div
                      key={item.id}
                      className="border-l-4 border-slate-200 pl-6 pb-8"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-xs bg-slate-200 text-slate-700 px-3 py-1 rounded">
                          Item {item.itemNumber}
                        </span>
                      </div>

                      {/* Requirement */}
                      <div className="bg-slate-50 rounded-lg p-3 mb-4">
                        <p className="text-xs font-semibold text-slate-700 mb-1">Requisito:</p>
                        <p className="text-sm text-slate-700">{item.requirement}</p>
                      </div>

                      {/* Details */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Detalhes a verificar:</p>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {item.details.map((detail: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resposta */}
                      <div className="flex gap-3 mb-4">
                        {['S', 'N', 'NA'].map((valor) => (
                          <button
                            key={valor}
                            onClick={() =>
                              handleResposta(
                                item.id,
                                valor as 'S' | 'N' | 'NA'
                              )
                            }
                            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                              resposta?.resposta === valor
                                ? 'text-white'
                                : 'border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                            style={{
                              backgroundColor:
                                resposta?.resposta === valor
                                  ? valor === 'S'
                                    ? '#4d7e61'
                                    : valor === 'N'
                                    ? '#be1621'
                                    : '#ffc053'
                                  : 'transparent',
                            }}
                          >
                            {valor === 'S'
                              ? '✓ Conforme'
                              : valor === 'N'
                              ? '✗ Não Conforme'
                              : 'NA'}
                          </button>
                        ))}
                      </div>

                      {/* Observações */}
                      <textarea
                        value={resposta?.observacao || ''}
                        onChange={(e) =>
                          handleObservacao(item.id, e.target.value)
                        }
                        placeholder="Adicione observações, fotos ou detalhes..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 text-sm"
                        rows={3}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Botões */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-slate-200">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Voltar
                </button>
                <button
                  onClick={handleSalvar}
                  disabled={salvando || respondidos === 0}
                  className="flex-1 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
                  style={{ backgroundColor: '#385e81' }}
                >
                  {salvando ? 'Salvando...' : 'Finalizar e Ver Resultado'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
