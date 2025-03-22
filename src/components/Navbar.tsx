"use client";

import Link from "next/link";
import { Menu, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 mr-4 lg:mr-8">
          <Coffee className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Creabrew</span>
        </Link>
        <nav className="hidden md:flex gap-6 flex-1">
          <Link href="#benefits" className="text-sm font-medium hover:text-primary">
            Benefits
          </Link>
          <Link href="#products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Shop Now</Button>
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
                <Coffee className="h-5 w-5 text-primary" />
                <span className="font-bold">Creabrew</span>
              </Link>
              <nav className="flex flex-col gap-4 flex-1 pt-4">
                <Link href="#benefits" className="text-sm font-medium hover:text-primary">
                  Benefits
                </Link>
                <Link href="#products" className="text-sm font-medium hover:text-primary">
                  Products
                </Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                  Testimonials
                </Link>
                <Link href="#faq" className="text-sm font-medium hover:text-primary">
                  FAQ
                </Link>
              </nav>
              <div className="border-t pt-4 pb-6 flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full justify-start">Shop Now</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
} 