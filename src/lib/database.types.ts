export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category: string | null;
          stock: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category?: string | null;
          stock?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category?: string | null;
          stock?: number | null;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          status: string;
          total: number;
          stripe_checkout_id: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          postal_code: string | null;
          country: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          status: string;
          total: number;
          stripe_checkout_id?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          status?: string;
          total?: number;
          stripe_checkout_id?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price_at_purchase: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price_at_purchase: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price_at_purchase?: number;
        };
      };
      customers: {
        Row: {
          id: string;
          created_at: string;
          stripe_customer_id: string | null;
          name: string | null;
          email: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          stripe_customer_id?: string | null;
          name?: string | null;
          email?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          stripe_customer_id?: string | null;
          name?: string | null;
          email?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 