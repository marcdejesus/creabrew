import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="cta" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-primary/5"></div>
      
      {/* Coffee bean pattern decoration - replaced with simple pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#8B5A2B_1px,transparent_6px)] [background-size:24px_24px] opacity-5"></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start Your Day with <span className="text-primary">Strength</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] mx-auto">
              Join thousands of fitness enthusiasts who trust Creabrew to power their workouts and fuel their day.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-lg border-2 border-primary/20 w-full max-w-2xl">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Exclusive Launch Offer</h3>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <p>Get 15% off your first order</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <p>Free shipping on orders over $50</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                  <p>30-day satisfaction guarantee</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="#shop">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="#learn">Learn More</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Offer valid for new customers only. Expires soon.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <p className="font-medium">4.9/5 from over 500 reviews</p>
            <span className="hidden sm:inline-block">•</span>
            <p>Trusted by fitness professionals worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function StarIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
} 