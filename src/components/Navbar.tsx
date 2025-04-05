"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, User, Heart, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCartStore } from "@/lib/store";
import { createClient_browser } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton } from "@/components/ui/auth/SignOutButton";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCartStore();
  const supabase = createClient_browser();

  // Load user on initial render and when auth state changes
  useEffect(() => {
    // Initial user fetch
    const getInitialUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Update user state when auth state changes
        setUser(session?.user || null);
        
        // Redirect to home page after sign out
        if (event === 'SIGNED_OUT') {
          router.push('/');
          router.refresh();
        } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          // Refresh the current page to update UI after sign in
          router.refresh();
        }
      }
    );
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 mr-4 lg:mr-8">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
            <Coffee className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">Creabrew</span>
        </Link>
        <nav className="hidden md:flex gap-6 flex-1">
          <Link 
            href="/#benefits" 
            className="text-sm font-medium hover:text-primary"
          >
            Benefits
          </Link>
          <Link 
            href="/#products" 
            className="text-sm font-medium hover:text-primary"
          >
            Products
          </Link>
          <Link 
            href="/#testimonials" 
            className="text-sm font-medium hover:text-primary"
          >
            Testimonials
          </Link>
          <Link 
            href="/#faq" 
            className="text-sm font-medium hover:text-primary"
          >
            FAQ
          </Link>
          <Link 
            href="/nvc" 
            className={`text-sm font-medium hover:text-primary flex items-center ${isActive('/nvc') ? 'text-primary font-semibold' : ''}`}
          >
            <Heart className="mr-1 h-3 w-3" /> NVC
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => router.push("/cart")}
                    className="relative"
                    aria-label="View cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={isActive('/profile') ? 'default' : 'outline'} 
                      size="sm" 
                      onClick={() => router.push("/profile")}
                      className="flex items-center gap-1"
                    >
                      <User className="h-4 w-4 mr-1" />
                      My Account
                    </Button>
                    
                    <SignOutButton 
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      redirectTo="/"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Button 
                    variant={isActive('/auth/signin') ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => router.push("/auth/signin")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant={isActive('/auth/signup') ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign Up
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => router.push("/products")}
                  >
                    Shop Now
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 sm:w-80">
            <div className="flex flex-col h-full">
              <Link href="/" className="flex items-center gap-2 py-4">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary text-primary-foreground">
                  <Coffee className="h-4 w-4" />
                </div>
                <span className="font-bold">Creabrew</span>
              </Link>
              
              {!loading && user && (
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">Signed in as:</p>
                  <p className="font-medium truncate">{user.email}</p>
                </div>
              )}
              
              <nav className="flex flex-col gap-4 flex-1 pt-4">
                <Link href="/#benefits" className="text-sm font-medium hover:text-primary">
                  Benefits
                </Link>
                <Link href="/#products" className="text-sm font-medium hover:text-primary">
                  Products
                </Link>
                <Link href="/#testimonials" className="text-sm font-medium hover:text-primary">
                  Testimonials
                </Link>
                <Link href="/#faq" className="text-sm font-medium hover:text-primary">
                  FAQ
                </Link>
                <Link 
                  href="/nvc" 
                  className={`text-sm font-medium hover:text-primary flex items-center ${isActive('/nvc') ? 'text-primary font-semibold' : ''}`}
                >
                  <Heart className="mr-1 h-3 w-3" /> NVC
                </Link>
              </nav>
              <div className="border-t pt-4 pb-6 flex flex-col gap-2">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <Button 
                          variant={isActive('/cart') ? 'default' : 'outline'} 
                          className="w-full justify-start"
                          onClick={() => router.push("/cart")}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" /> Cart
                          {totalItems > 0 && (
                            <span className="ml-auto bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                              {totalItems}
                            </span>
                          )}
                        </Button>
                        <Button 
                          variant={isActive('/profile') ? 'default' : 'outline'} 
                          className="w-full justify-start"
                          onClick={() => router.push("/profile")}
                        >
                          <User className="mr-2 h-4 w-4" /> My Account
                        </Button>
                        <SignOutButton 
                          variant="destructive"
                          className="w-full justify-start mt-2"
                          redirectTo="/"
                        />
                      </>
                    ) : (
                      <>
                        <Button 
                          variant={isActive('/auth/signin') ? 'default' : 'outline'} 
                          className="w-full justify-start"
                          onClick={() => router.push("/auth/signin")}
                        >
                          Sign In
                        </Button>
                        <Button 
                          variant={isActive('/auth/signup') ? 'default' : 'outline'} 
                          className="w-full justify-start"
                          onClick={() => router.push("/auth/signup")}
                        >
                          Sign Up
                        </Button>
                        <Button 
                          className="w-full justify-start"
                          onClick={() => router.push("/products")}
                        >
                          Shop Now
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 