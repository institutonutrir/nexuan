import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Listar auditorias
export async function GET(request: NextRequest) {
  try {
    const { data: auditorias, error } = await supabase
      .from('audits')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Formatar resposta
    const formatted = auditorias?.map((audit) => ({
      id: audit.id,
      cliente: audit.client_id, // Será preenchido com nome real
      rdc: audit.notes?.includes('275') ? 'RDC 275' : 'RDC 216',
      data: audit.audit_date,
      conformidade: audit.compliance_percentage || 0,
      status: audit.status === 'completed' ? 'concluida' : 'em_progresso',
    })) || [];

    return NextResponse.json({ auditorias: formatted });
  } catch (error) {
    console.error('Erro ao listar auditorias:', error);
    return NextResponse.json(
      { error: 'Erro ao listar auditorias' },
      { status: 500 }
    );
  }
}

// POST - Criar auditoria
export async function POST(request: NextRequest) {
  try {
    const { cliente, rdc, data } = await request.json();

    // Inserir na tabela audits
    const { data: auditData, error } = await supabase
      .from('audits')
      .insert({
        client_id: cliente, // Será o ID do cliente
        audit_date: data,
        status: 'draft',
        notes: rdc === 'RDC 275' ? 'RDC 275' : 'RDC 216',
        total_items: rdc === 'RDC 216' ? 138 : 150, // Aproximado
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        auditoria: {
          id: auditData.id,
          cliente,
          rdc,
          data,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar auditoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar auditoria' },
      { status: 500 }
    );
  }
}
