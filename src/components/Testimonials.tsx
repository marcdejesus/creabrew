import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { User } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    title: "Fitness Coach",
    testimonial:
      "I've been recommending Creabrew to all my clients. The combination of coffee and creatine has been a game-changer for their morning workouts.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    title: "Marathon Runner",
    testimonial:
      "Creabrew has become an essential part of my training routine. I love that I get both my coffee fix and my creatine in one delicious cup!",
    rating: 5,
  },
  {
    name: "Mark Wilson",
    title: "Weightlifting Enthusiast",
    testimonial:
      "I was skeptical at first, but after two weeks of using Creabrew, I noticed a significant improvement in my strength training. Plus, it tastes amazing!",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Customer Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Community Says
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of satisfied customers who&apos;ve experienced the Creabrew difference.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-2 border-muted">
              <CardHeader className="pb-0">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="grid gap-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-6">
                <div className="font-italic relative">
                  <svg
                    className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative pl-6 text-base">{testimonial.testimonial}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 px-6 py-3">
                <div className="flex items-center">
                  <StarRating rating={testimonial.rating} />
                </div>
              </CardFooter>
              <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
                <div className="absolute top-0 right-0 h-8 w-8 translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-primary"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-500" : "text-muted"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
} 