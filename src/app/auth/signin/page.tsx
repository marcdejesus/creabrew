"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { SignInForm } from "@/components/ui/auth/SignInForm";
import { createClient_browser } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient_browser();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);

      if (data.user) {
        // If user is already logged in, redirect to the specified URL
        router.push(redirectUrl);
      }
    }
    getUser();
  }, [redirectUrl, router, supabase.auth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <div className="text-center mb-8">
        <Image 
          src="/logo.svg" 
          alt="Creabrew Logo" 
          width={80} 
          height={80} 
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
      
      <SignInForm redirectTo={redirectUrl} />
    </div>
  );
} 