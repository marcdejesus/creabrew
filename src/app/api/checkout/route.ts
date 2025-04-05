import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { stripe } from "@/lib/stripe";
import { supabase as serverSupabase } from "@/lib/supabase";

// Define the request body type
type CheckoutItem = {
  id: string;
  quantity: number;
};

export async function POST(request: NextRequest) {
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
        { error: "You must be logged in to checkout" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const items: CheckoutItem[] = body.items;

    if (!items || !items.length) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Fetch product details from database
    const productIds = items.map(item => item.id);
    const { data: products, error } = await serverSupabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (error || !products) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Could not fetch product details" },
        { status: 500 }
      );
    }

    // Create a Stripe customer or retrieve existing one
    let customerId: string | undefined;
    
    // Check if user has a Stripe customer ID in our database
    const { data: customerData } = await serverSupabase
      .from("customers")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (customerData?.stripe_customer_id) {
      customerId = customerData.stripe_customer_id;
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Store the customer ID in our database
      await serverSupabase
        .from("customers")
        .insert({
          id: user.id,
          stripe_customer_id: customer.id,
        });
    }

    // Create line items for the checkout session
    const lineItems = items.map(item => {
      const product = products.find(p => p.id === item.id);
      
      if (!product) {
        throw new Error(`Product not found: ${item.id}`);
      }
      
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description || undefined,
            images: product.image_url ? [product.image_url] : [],
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      metadata: {
        user_id: user.id,
      },
    });

    // Store order in database
    const { data: order, error: orderError } = await serverSupabase
      .from("orders")
      .insert({
        user_id: user.id,
        status: "pending",
        total: lineItems.reduce(
          (sum, item) => sum + (item.price_data.unit_amount * (item.quantity || 1)) / 100,
          0
        ),
        stripe_checkout_id: session.id,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { error: "Could not create order" },
        { status: 500 }
      );
    }

    // Store order items
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.id)!;
      return {
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: product.price,
      };
    });

    const { error: orderItemsError } = await serverSupabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError);
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "An error occurred during checkout" },
      { status: 500 }
    );
  }
} 