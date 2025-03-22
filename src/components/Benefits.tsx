import { Dumbbell, Brain, Heart, Zap, Coffee, Droplets } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Enhanced Athletic Performance",
    description: "Creatine improves high-intensity exercise performance and increases strength gains from training.",
    icon: Dumbbell,
  },
  {
    title: "Improved Mental Focus",
    description: "Our blend combines the cognitive benefits of caffeine with creatine&apos;s support for brain function.",
    icon: Brain,
  },
  {
    title: "Muscle Recovery",
    description: "Creatine aids in faster recovery between workouts, reducing muscle soreness and fatigue.",
    icon: Heart,
  },
  {
    title: "Clean, Sustained Energy",
    description: "Enjoy hours of smooth energy without the typical coffee crash or jitters.",
    icon: Zap,
  },
  {
    title: "Premium Coffee Quality",
    description: "We use only ethically sourced, high-quality coffee beans from sustainable farms.",
    icon: Coffee,
  },
  {
    title: "Perfect Mixture",
    description: "Our patent-pending process ensures creatine dissolves completely with no gritty texture.",
    icon: Droplets,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Why Creabrew?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Performance Benefits in Every Cup
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We&apos;ve combined the best of both worlds: premium coffee and performance-enhancing creatine.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 border-muted hover:border-primary/50 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-2 mt-1 shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 