import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PaymentStatus {
  status: string;
  isLoading: boolean;
  error: string | null;
  order: any | null;
}

export const usePaymentStatus = (paymentId: string | null): PaymentStatus => {
  const [status, setStatus] = useState<string>('pending');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!paymentId) {
      setIsLoading(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const { data, error: queryError } = await supabase
          .from('orders')
          .select('*')
          .eq('payment_id', paymentId)
          .single();

        if (queryError) throw queryError;

        if (data) {
          setStatus(data.payment_status);
          setOrder(data);
          
          // Stop polling if payment is finished or failed
          if (data.payment_status === 'finished' || data.payment_status === 'failed' || data.payment_status === 'expired') {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    // Initial check
    checkPaymentStatus();

    // Poll every 30 seconds
    const interval = setInterval(checkPaymentStatus, 30000);

    return () => clearInterval(interval);
  }, [paymentId]);

  return { status, isLoading, error, order };
};
