"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createClient_browser } from "@/lib/supabase";
import { ComponentProps } from "react";

interface SignOutButtonProps extends ComponentProps<typeof Button> {
  redirectTo?: string;
}

export function SignOutButton({ 
  children = "Sign Out", 
  redirectTo = "/", 
  ...props 
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient_browser();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push(redirectTo);
      // Force refresh to update any server components
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignOut} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
} 