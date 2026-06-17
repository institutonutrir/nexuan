import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: audit, error } = await supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({
      auditoria: {
        id: audit.id,
        cliente: 'Cliente Teste', // Será preenchido com nome real do cliente
        rdc: audit.notes?.includes('275') ? 'RDC 275' : 'RDC 216',
        data: audit.audit_date,
        status: audit.status,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar auditoria:', error);
    return NextResponse.json(
      { error: 'Auditoria não encontrada' },
      { status: 404 }
    );
  }
}
