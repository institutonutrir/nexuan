import { NextRequest, NextResponse } from 'next/server';

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const APP_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexuan.institutonutrir.com';

export async function POST(request: NextRequest) {
  try {
    const { amount, billingCycle } = await request.json();

    if (!amount || !billingCycle) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    // Criar preference no Mercado Pago
    const preference = {
      items: [
        {
          title: `NexUAN Pro - ${billingCycle === 'monthly' ? 'Mensal' : 'Anual'}`,
          quantity: 1,
          unit_price: amount,
          currency_id: 'BRL',
        },
      ],
      payer: {
        email: 'nutrir@institutonutrir.com',
      },
      back_urls: {
        success: `${APP_URL}/payment/success`,
        failure: `${APP_URL}/payment/failure`,
        pending: `${APP_URL}/payment/pending`,
      },
      auto_return: 'approved',
      notification_url: `${APP_URL}/api/payment/webhook`,
      metadata: {
        billing_cycle: billingCycle,
      },
    };

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao criar pagamento' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      redirectUrl: data.init_point,
    });
  } catch (error) {
    console.error('Erro em Mercado Pago:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
