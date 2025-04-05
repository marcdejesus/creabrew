import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { stripe, getCheckoutSession } from "@/lib/stripe";
import { supabase as serverSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get session ID from query parameter
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get order from database
    const { data: order, error } = await serverSupabase
      .from("orders")
      .select("*")
      .eq("stripe_checkout_id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (error || !order) {
      // If not found in our database, try to get information from Stripe
      try {
        const stripeSession = await getCheckoutSession(sessionId);
        
        // Check if the user id in metadata matches the current user
        if (stripeSession.metadata?.user_id !== user.id) {
          return NextResponse.json(
            { error: "Unauthorized access to this order" },
            { status: 403 }
          );
        }

        // Return basic info from Stripe
        return NextResponse.json({
          order: {
            id: stripeSession.id,
            created_at: new Date(stripeSession.created * 1000).toISOString(),
            status: stripeSession.payment_status,
            total: stripeSession.amount_total ? stripeSession.amount_total / 100 : 0,
          }
        });
      } catch (stripeError) {
        console.error("Error fetching session from Stripe:", stripeError);
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }
    }

    // Get order items with product details
    const { data: items } = await serverSupabase
      .from("order_items")
      .select(`
        id,
        quantity,
        price_at_purchase,
        product: product_id (
          id,
          name,
          description,
          image_url
        )
      `)
      .eq("order_id", order.id);

    return NextResponse.json({
      order: {
        ...order,
        items: items || []
      }
    });
  } catch (error) {
    console.error("Error retrieving order:", error);
    return NextResponse.json(
      { error: "An error occurred retrieving the order" },
      { status: 500 }
    );
  }
} 