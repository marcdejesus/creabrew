"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient_browser } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignInValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  redirectTo?: string;
}

export function SignInForm({ redirectTo = "/" }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient_browser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      router.refresh();
      router.push(redirectTo);
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={async () => {
          setIsLoading(true);
          try {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
              },
            });
            if (error) throw error;
          } catch (error: any) {
            setError(error.message || "Something went wrong with Google sign in");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M12.0001 2C17.5231 2 22.0001 6.477 22.0001 12C22.0001 17.523 17.5231 22 12.0001 22C6.47707 22 2.00007 17.523 2.00007 12C2.00007 6.477 6.47707 2 12.0001 2Z"
              fill="#FFC107"
            />
            <path
              d="M12.0001 2C14.4001 2 16.6001 2.859 18.3501 4.344L15.3501 7.344C14.3501 6.469 13.2001 6 12.0001 6C8.69007 6 6.00007 8.691 6.00007 12C6.00007 15.309 8.69007 18 12.0001 18C14.6001 18 16.8001 16.5 17.7301 14.367H12.0001V10H22.0001V12C22.0001 17.523 17.5231 22 12.0001 22C6.47707 22 2.00007 17.523 2.00007 12C2.00007 6.477 6.47707 2 12.0001 2Z"
              fill="#4CAF50"
            />
            <path
              d="M12.0001 2C14.4001 2 16.6001 2.859 18.3501 4.344L15.3501 7.344C14.3501 6.469 13.2001 6 12.0001 6C8.69007 6 6.00007 8.691 6.00007 12C6.00007 15.309 8.69007 18 12.0001 18C14.6001 18 16.8001 16.5 17.7301 14.367H12.0001V10H22.0001V12C22.0001 17.523 17.5231 22 12.0001 22C6.47707 22 2.00007 17.523 2.00007 12C2.00007 6.477 6.47707 2 12.0001 2Z"
              fill="#F44336"
            />
            <path
              d="M3.15405 7.3455L6.44005 9.755C7.32005 7.554 9.48005 6 12.0001 6C13.2001 6 14.3501 6.469 15.3501 7.344L18.3501 4.344C16.6001 2.859 14.4001 2 12.0001 2C8.16405 2 4.82805 4.168 3.15405 7.3455Z"
              fill="#DD2C00"
            />
          </svg>
        )}
        Google
      </Button>
    </div>
  );
} 