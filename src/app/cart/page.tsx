"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/lib/store";
import { createClient_browser } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export default function CartPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const supabase = createClient_browser();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, [supabase.auth]);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/auth/signin?redirect=cart");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Starting checkout process...");
      console.log("Sending items to checkout API:", items);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Checkout API error:", errorData);
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const { sessionId } = await response.json();
      console.log("Got session ID:", sessionId);
      
      const stripe = await getStripe();
      
      if (stripe) {
        console.log("Redirecting to Stripe checkout...");
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe redirect error:", error);
          throw error;
        }
      } else {
        throw new Error("Failed to load Stripe");
      }
    } catch (error: any) {
      console.error("Error during checkout:", error);
      setError(error.message || "An error occurred during checkout");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any coffee to your cart yet.
        </p>
        <Button onClick={() => router.push("/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-10">Your Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                {item.image && (
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-slate-50 p-6 rounded-lg h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>
          
          {!user && (
            <p className="mt-4 text-sm text-center text-muted-foreground">
              You'll need to sign in to complete your purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 