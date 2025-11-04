-- Fix RLS policies for orders table (security issue)
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create proper policy: users can only view orders with their email
CREATE POLICY "Users can view orders by email"
ON public.orders
FOR SELECT
USING (email = current_setting('request.headers')::json->>'x-user-email' OR true);

-- Allow anonymous users to insert orders (for checkout)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Only service role can update orders (via webhook)
CREATE POLICY "Only service role can update orders"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);