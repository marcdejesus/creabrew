import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Browser client (for client components)
export const createClient_browser = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: supabaseUrl,
    supabaseKey: supabaseKey,
  });
};

// Types
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
          created_at?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          created_at: string | null;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          category: string | null;
          inventory: number | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          created_at?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          category?: string | null;
          inventory?: number | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          created_at?: string | null;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          category?: string | null;
          inventory?: number | null;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          created_at: string | null;
          status: string | null;
          total: number | null;
          stripe_checkout_id: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string | null;
          status?: string | null;
          total?: number | null;
          stripe_checkout_id?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string | null;
          status?: string | null;
          total?: number | null;
          stripe_checkout_id?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price_at_purchase: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price_at_purchase?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price_at_purchase?: number | null;
          created_at?: string | null;
        };
      };
    };
  };
} 