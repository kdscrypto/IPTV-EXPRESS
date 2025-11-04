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

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validatePlanId = (planId: string): boolean => {
  const validPlans = ['1month', '3months', '6months', '12months'];
  return validPlans.includes(planId);
};

const validatePrice = (price: number): boolean => {
  const validPrices = [15, 25, 45, 60];
  return validPrices.includes(price) && price > 0 && price < 1000;
};

const sanitizeString = (str: string, maxLength: number = 255): string => {
  return str.trim().slice(0, maxLength);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const nowpaymentsApiKey = Deno.env.get('NOWPAYMENTS_API_KEY')!;

    // Validate environment variables
    if (!supabaseUrl || !supabaseKey || !nowpaymentsApiKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const requestBody: PaymentRequest = await req.json();

    // Input validation
    if (!requestBody.email || !validateEmail(requestBody.email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!requestBody.planId || !validatePlanId(requestBody.planId)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid plan ID' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!requestBody.price || !validatePrice(requestBody.price)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid price' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!requestBody.planName || requestBody.planName.length === 0 || requestBody.planName.length > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid plan name' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Sanitize inputs
    const email = sanitizeString(requestBody.email);
    const planId = sanitizeString(requestBody.planId, 20);
    const planName = sanitizeString(requestBody.planName, 100);
    const device = requestBody.device ? sanitizeString(requestBody.device, 50) : '';
    const deviceInfo = requestBody.deviceInfo ? sanitizeString(requestBody.deviceInfo, 500) : '';
    const price = requestBody.price;

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
      throw new Error(`NOWPayments API error: ${nowPaymentResponse.status}`);
    }

    const paymentData = await nowPaymentResponse.json();
    console.log('Payment created:', { payment_id: paymentData.payment_id, status: paymentData.payment_status });

    // Validate payment response
    if (!paymentData.payment_id || !paymentData.pay_address) {
      throw new Error('Invalid payment response from NOWPayments');
    }

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
        payment_status: paymentData.payment_status || 'waiting',
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
      throw new Error('Failed to save order');
    }

    console.log('Order saved:', { order_id: order.id, payment_id: order.payment_id });

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
        error: 'Payment creation failed. Please try again.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
