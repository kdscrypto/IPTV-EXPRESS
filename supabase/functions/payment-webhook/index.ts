import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-nowpayments-sig',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const ipnSecret = Deno.env.get('NOWPAYMENTS_IPN_SECRET')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the signature from headers
    const signature = req.headers.get('x-nowpayments-sig');
    const body = await req.text();
    
    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(ipnSecret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign']
    );
    
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(body)
    );
    
    const calculatedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (signature && signature !== calculatedSignature) {
      console.error('Invalid signature');
      return new Response('Invalid signature', { status: 401 });
    }

    const webhookData = JSON.parse(body);
    console.log('Webhook received:', webhookData);

    const { payment_id, payment_status } = webhookData;

    // Update order status
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status,
        updated_at: new Date().toISOString(),
        ...(payment_status === 'finished' && {
          activated_at: new Date().toISOString(),
        }),
      })
      .eq('payment_id', payment_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw updateError;
    }

    console.log('Order updated:', order);

    // If payment is confirmed, send confirmation (WhatsApp or email)
    if (payment_status === 'finished' && order) {
      console.log('Payment confirmed for order:', order.id);
      
      // Here you can add logic to:
      // 1. Send WhatsApp message
      // 2. Send email confirmation
      // 3. Activate the subscription
      
      // For now, we'll just log it
      console.log('Activation needed for:', {
        email: order.email,
        plan: order.plan_name,
        device: order.device,
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in payment-webhook:', error);
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
