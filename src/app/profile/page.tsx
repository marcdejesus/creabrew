"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/ui/auth/SignOutButton";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient_browser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient_browser();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/auth/signin?redirect=/profile");
        return;
      }
      
      setUser(session.user);
      setIsLoading(false);
    };

    getUser();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-bold">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Account Created</h3>
                  <p className="text-gray-600">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Last Sign In</h3>
                  <p className="text-gray-600">
                    {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Edit Profile</Button>
              <SignOutButton variant="destructive">Sign Out</SignOutButton>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-10 text-center text-muted-foreground">
                You haven't placed any orders yet.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => router.push('/products')}>
                Start Shopping
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-10 text-center text-muted-foreground">
                You don't have any saved payment methods.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Add Payment Method
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 