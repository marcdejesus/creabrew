import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJs } from '@stripe/stripe-js';

// Initialize Stripe client (server-side)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any, // Cast to any to prevent type error with the API version
});

// Initialize Stripe client (client-side)
let stripePromise: Promise<StripeJs | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Function to create a checkout session
export async function createCheckoutSession({
  priceId,
  customerId,
  quantity = 1,
  mode = 'payment',
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId?: string;
  quantity?: number;
  mode?: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [
      {
        price: priceId,
        quantity,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer: customerId,
  });

  return session;
}

// Function to retrieve a checkout session
export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer'],
  });
  
  return session;
}

// Function to create a product in Stripe
export async function createStripeProduct({
  name,
  description,
  images,
  unitAmount,
  currency = 'usd',
}: {
  name: string;
  description?: string;
  images?: string[];
  unitAmount: number;
  currency?: string;
}) {
  // Create the product
  const product = await stripe.products.create({
    name,
    description,
    images,
  });

  // Create the price for the product
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: unitAmount,
    currency,
  });

  return { product, price };
} 