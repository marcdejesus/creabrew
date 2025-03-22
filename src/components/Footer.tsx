import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 border-t bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Creabrew
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Premium coffee infused with creatine for enhanced performance
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="font-medium">Shop</div>
            <Link href="#products" className="text-muted-foreground hover:text-primary">
              All Products
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Subscriptions
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Gifts
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="font-medium">Company</div>
            <Link href="#about" className="text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Blog
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Careers
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="font-medium">Support</div>
            <Link href="#faq" className="text-muted-foreground hover:text-primary">
              FAQ
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Shipping
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Creabrew Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 