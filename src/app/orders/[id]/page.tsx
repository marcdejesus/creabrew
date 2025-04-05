"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient_browser } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";

interface OrderItem {
  id: string;
  product_id: string;
  order_id: string;
  quantity: number;
  price_at_purchase: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  order_items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient_browser();

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      
      try {
        // First check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          router.push(`/auth/signin?redirect=/orders/${params.id}`);
          return;
        }
        
        // Fetch order details
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items:order_items (
              *,
              product:products (*)
            )
          `)
          .eq('id', params.id)
          .single();
        
        if (error) throw error;
        
        // Check if the order belongs to the current user
        if (data.user_id !== session.user.id) {
          setError("You don't have permission to view this order");
          return;
        }
        
        setOrder(data);
      } catch (error: any) {
        console.error('Error fetching order:', error);
        setError(error.message || "Couldn't load order details");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [params.id, router, supabase]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold">Loading order details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
            <p className="text-red-700">{error}</p>
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => router.push('/profile')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-center">
            <p className="text-amber-700">Order not found</p>
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => router.push('/profile')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-4" 
          onClick={() => router.push('/profile')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.id.slice(0, 8)}</h1>
              <p className="text-muted-foreground">
                Placed on {new Date(order.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className={`inline-block px-3 py-1 text-sm rounded-full capitalize
                ${order.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : order.status === 'pending' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" /> Order Summary
              </CardTitle>
              <CardDescription>
                Details of items in your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${(item.price_at_purchase * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {(order.address_line1 || order.city) && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  {order.address_line1 && <p>{order.address_line1}</p>}
                  {order.address_line2 && <p>{order.address_line2}</p>}
                  {order.city && (
                    <p>
                      {order.city}, {order.state} {order.postal_code}
                    </p>
                  )}
                  {order.country && <p>{order.country}</p>}
                </address>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 