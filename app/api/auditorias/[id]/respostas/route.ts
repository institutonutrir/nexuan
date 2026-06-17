import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { respostas } = await request.json();

    // Calcular conformidade
    const totalRespostas = respostas.filter((r: any) => r.resposta !== null).length;
    const conformes = respostas.filter((r: any) => r.resposta === 'S').length;
    const naoConforme = respostas.filter((r: any) => r.resposta === 'N').length;
    const naAplicavel = respostas.filter((r: any) => r.resposta === 'NA').length;

    const conformidadePercentual =
      totalRespostas > 0
        ? Math.round((conformes / (totalRespostas - naAplicavel)) * 100)
        : 0;

    // Salvar respostas em um campo JSON
    const { error: updateError } = await supabase
      .from('audits')
      .update({
        status: 'completed',
        conforming_items: conformes,
        non_conforming_items: naoConforme,
        na_items: naAplicavel,
        total_items: totalRespostas,
        compliance_percentage: conformidadePercentual,
        notes: JSON.stringify(respostas),
      })
      .eq('id', params.id);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      conformidade: conformidadePercentual,
      resumo: {
        conformes,
        naoConforme,
        naAplicavel,
        total: totalRespostas,
      },
    });
  } catch (error) {
    console.error('Erro ao salvar respostas:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar respostas' },
      { status: 500 }
    );
  }
}
