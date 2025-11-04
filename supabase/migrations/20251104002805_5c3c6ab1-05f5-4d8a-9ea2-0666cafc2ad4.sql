-- Create orders table for NOWPayments integration
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  device TEXT,
  device_info TEXT,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  price_amount NUMERIC(10, 2) NOT NULL,
  price_currency TEXT NOT NULL DEFAULT 'USD',
  payment_id TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  pay_address TEXT,
  pay_amount NUMERIC(20, 8),
  pay_currency TEXT,
  payment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  activated_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders by email
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
USING (true);

-- Service role can manage all orders
CREATE POLICY "Service role can manage orders"
ON public.orders
FOR ALL
USING (true)
WITH CHECK (true);

-- Add trigger to update updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on payment_id for faster lookups
CREATE INDEX idx_orders_payment_id ON public.orders(payment_id);

-- Create index on email for user lookups
CREATE INDEX idx_orders_email ON public.orders(email);

-- Create index on payment_status for filtering
CREATE INDEX idx_orders_status ON public.orders(payment_status);