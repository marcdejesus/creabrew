import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5d6c6_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
      
      {/* Coffee beans decoration */}
      <div className="absolute top-20 right-4 md:right-20 opacity-10">
        <div className="relative h-40 w-40 md:h-64 md:w-64">
          <Image
            src="/images/coffee-beans.png"
            alt="Coffee beans decoration"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Brew Your <span className="text-primary">Strength</span> with Every Cup
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Creabrew combines premium coffee with creatine for a delicious energy boost that supports your active lifestyle.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="font-medium">
                <Link href="#shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#benefits">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="rounded-sm px-1 font-normal">
                  New
                </Badge>
                <span className="font-medium">Guilt-free Energy</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Natural Ingredients</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <span className="font-medium">Performance Focus</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-square overflow-hidden rounded-full w-full max-w-[400px] border-8 border-muted/20 bg-primary/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                <div className="flex flex-col items-center">
                  <div className="relative h-12 w-12">
                    <span className="animate-steam absolute -top-8 left-1/2 h-6 w-1 rounded-full bg-primary/20"></span>
                    <span className="animate-steam absolute -top-8 left-1/3 h-6 w-1 rounded-full bg-primary/20" style={{ animationDelay: '0.4s' }}></span>
                    <span className="animate-steam absolute -top-8 left-2/3 h-6 w-1 rounded-full bg-primary/20" style={{ animationDelay: '0.8s' }}></span>
                  </div>
                  <div className="rounded-full bg-primary/10 p-4 mt-2">
                    <p className="font-bold text-primary">MORE THAN COFFEE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ variant, className, ...props }: React.ComponentProps<"div"> & { variant?: "default" | "outline" }) {
  return (
    <div
      className={
        "inline-flex items-center rounded-md border border-secondary px-2.5 py-0.5 text-xs font-semibold transition-colors " +
        (variant === "outline" ? "bg-transparent text-foreground hover:bg-secondary/10" : "bg-secondary text-secondary-foreground hover:bg-secondary/80") +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  );
} 