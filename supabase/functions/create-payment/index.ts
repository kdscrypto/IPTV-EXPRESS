import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  planId: string;
  planName: string;
  price: number;
  email: string;
  device?: string;
  deviceInfo?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const nowpaymentsApiKey = Deno.env.get('NOWPAYMENTS_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { planId, planName, price, email, device, deviceInfo }: PaymentRequest = await req.json();

    console.log('Creating payment for:', { planId, planName, price, email });

    // Create payment with NOWPayments
    const nowPaymentResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': nowpaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: price,
        price_currency: 'usd',
        pay_currency: 'btc', // Default to BTC, user can change on payment page
        ipn_callback_url: `${supabaseUrl}/functions/v1/payment-webhook`,
        order_id: crypto.randomUUID(),
        order_description: `IPTV Express - ${planName}`,
      }),
    });

    if (!nowPaymentResponse.ok) {
      const errorData = await nowPaymentResponse.text();
      console.error('NOWPayments API error:', errorData);
      throw new Error(`NOWPayments API error: ${errorData}`);
    }

    const paymentData = await nowPaymentResponse.json();
    console.log('Payment created:', paymentData);

    // Save order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        email,
        device,
        device_info: deviceInfo,
        plan_id: planId,
        plan_name: planName,
        price_amount: price,
        price_currency: 'USD',
        payment_id: paymentData.payment_id,
        payment_status: paymentData.payment_status,
        pay_address: paymentData.pay_address,
        pay_amount: paymentData.pay_amount,
        pay_currency: paymentData.pay_currency,
        payment_url: paymentData.invoice_url || null,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour expiry
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error saving order:', orderError);
      throw orderError;
    }

    console.log('Order saved:', order);

    return new Response(
      JSON.stringify({
        success: true,
        payment: {
          payment_id: paymentData.payment_id,
          pay_address: paymentData.pay_address,
          pay_amount: paymentData.pay_amount,
          pay_currency: paymentData.pay_currency,
          payment_url: paymentData.invoice_url,
          order_id: order.id,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in create-payment:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
