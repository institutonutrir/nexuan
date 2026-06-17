'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaAuditoriaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cliente: '',
    rdc: 'RDC 216',
    data: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auditorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao criar auditoria');
        return;
      }

      // Redirecionar para o checklist
      router.push(`/auditorias/${data.auditoria.id}/checklist`);
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#385e81' }}>
            Nova Auditoria
          </h1>
          <p className="text-slate-600 mt-2">
            Escolha o tipo de auditoria e comece a verificação
          </p>
        </div>

        {/* Card de Seleção */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Escolher RDC */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Qual Resolução você vai auditar?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['RDC 216', 'RDC 275'].map((rdc) => (
                  <label
                    key={rdc}
                    className={`relative flex cursor-pointer rounded-lg border-2 p-6 transition-all ${
                      formData.rdc === rdc
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rdc"
                      value={rdc}
                      checked={formData.rdc === rdc}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{rdc}</p>
                      <p className="text-sm text-slate-600 mt-1">
                        {rdc === 'RDC 216'
                          ? 'Serviços de Alimentação'
                          : 'Indústria de Alimentos'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {formData.rdc === 'RDC 216'
                  ? 'Para restaurantes, cantinas, UANs e similares'
                  : 'Para fábricas de alimentos e indústrias'}
              </p>
            </div>

            {/* Nome do Cliente */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nome do Cliente/Estabelecimento
              </label>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                placeholder="Ex: Restaurante XYZ ou Fábrica ABC"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                required
              />
            </div>

            {/* Data da Auditoria */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Data da Auditoria
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                required
              />
            </div>

            {/* Erro */}
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !formData.cliente}
                className="flex-1 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: loading ? '#999' : '#385e81' }}
              >
                {loading ? 'Criando...' : 'Começar Auditoria'}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-slate-900 mb-3">Como funciona:</h3>
          <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
            <li>Escolha o tipo de auditoria (RDC 216 ou RDC 275)</li>
            <li>Preencha os dados do cliente e data</li>
            <li>Responda todas as questões do checklist</li>
            <li>Tire fotos como comprovação (opcional)</li>
            <li>Veja o resultado final e conformidade</li>
            <li>Exporte o relatório em PDF</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
