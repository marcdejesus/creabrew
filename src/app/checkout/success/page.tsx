"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get the session_id from the URL
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Clear the cart when the success page loads
    clearCart();
    
    async function getOrderDetails() {
      if (!sessionId) {
        setError("No session ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/checkout/session?sessionId=${sessionId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch order details: ${response.status}`);
        }
        
        const data = await response.json();
        setOrderDetails(data);
      } catch (err: any) {
        console.error("Error fetching order details:", err);
        setError(err.message || "Failed to retrieve order details");
      } finally {
        setIsLoading(false);
      }
    }

    getOrderDetails();
  }, [sessionId, clearCart]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 px-4 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 px-4 min-h-[70vh]">
        <div className="max-w-md mx-auto bg-red-50 p-6 rounded-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Error</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4 min-h-[70vh]">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg border shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase
          </p>
        </div>
        
        {orderDetails && (
          <div className="space-y-4 mb-6">
            <div className="border-t border-b py-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Order ID</span>
                <span className="text-muted-foreground">
                  {orderDetails.orderId || sessionId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Date</span>
                <span className="text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {orderDetails.items && orderDetails.items.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <ul className="space-y-2">
                  {orderDetails.items.map((item: any, index: number) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name || item.description} × {item.quantity}
                      </span>
                      <span>${item.amount_total / 100}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ${orderDetails.amount_total
                    ? (orderDetails.amount_total / 100).toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push("/profile")}
          >
            View Your Orders
          </Button>
        </div>
      </div>
    </div>
  );
} 