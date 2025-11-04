import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-nowpayments-sig',
};

// Validate payment status
const isValidPaymentStatus = (status: string): boolean => {
  const validStatuses = ['waiting', 'confirming', 'confirmed', 'sending', 'partially_paid', 'finished', 'failed', 'refunded', 'expired'];
  return validStatuses.includes(status);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const ipnSecret = Deno.env.get('NOWPAYMENTS_IPN_SECRET')!;

    // Validate environment variables
    if (!supabaseUrl || !supabaseKey || !ipnSecret) {
      console.error('Missing required environment variables');
      return new Response('Configuration error', { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the signature from headers
    const signature = req.headers.get('x-nowpayments-sig');
    const body = await req.text();
    
    // Verify signature using Web Crypto API (CRITICAL SECURITY)
    if (signature) {
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

      if (signature !== calculatedSignature) {
        console.error('Invalid signature - possible security breach attempt');
        return new Response('Invalid signature', { status: 401 });
      }
      
      console.log('Signature verified successfully');
    } else {
      console.warn('No signature provided - webhook may not be from NOWPayments');
    }

    const webhookData = JSON.parse(body);
    console.log('Webhook received:', { payment_id: webhookData.payment_id, status: webhookData.payment_status });

    // Validate webhook data
    if (!webhookData.payment_id || typeof webhookData.payment_id !== 'string') {
      console.error('Invalid payment_id in webhook');
      return new Response('Invalid payment_id', { status: 400 });
    }

    if (!webhookData.payment_status || !isValidPaymentStatus(webhookData.payment_status)) {
      console.error('Invalid payment_status in webhook:', webhookData.payment_status);
      return new Response('Invalid payment_status', { status: 400 });
    }

    const { payment_id, payment_status } = webhookData;

    // Check if order exists
    const { data: existingOrder, error: checkError } = await supabase
      .from('orders')
      .select('id, payment_status, email, plan_name')
      .eq('payment_id', payment_id)
      .single();

    if (checkError || !existingOrder) {
      console.error('Order not found:', payment_id);
      return new Response('Order not found', { status: 404 });
    }

    // Prevent duplicate processing
    if (existingOrder.payment_status === payment_status) {
      console.log('Status unchanged, skipping update:', payment_id);
      return new Response(JSON.stringify({ success: true, message: 'Status unchanged' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

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

    console.log('Order updated successfully:', { 
      order_id: order.id, 
      old_status: existingOrder.payment_status,
      new_status: payment_status 
    });

    // If payment is confirmed, trigger activation
    if (payment_status === 'finished' && order) {
      console.log('Payment confirmed for order:', {
        order_id: order.id,
        email: order.email,
        plan: order.plan_name,
      });
      
      // TODO: Here you can add logic to:
      // 1. Send email confirmation via Resend
      // 2. Send WhatsApp notification with credentials
      // 3. Create user account in your IPTV system
      // 4. Log activation for analytics
    }

    // Log failed payments for manual review
    if (payment_status === 'failed' || payment_status === 'expired') {
      console.warn('Payment failed/expired:', {
        order_id: order.id,
        email: order.email,
        payment_id: payment_id,
        status: payment_status
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
        error: 'Webhook processing failed',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
