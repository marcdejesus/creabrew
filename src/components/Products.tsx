import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const products = [
  {
    id: 1,
    name: "Classic Creabrew",
    description: "Our signature medium roast blend with 5g of creatine per serving.",
    price: 24.99,
    popular: false,
  },
  {
    id: 2,
    name: "Dark Roast Power",
    description: "Bold and robust dark roast with 5g of creatine. Perfect for morning workouts.",
    price: 27.99,
    popular: true,
  },
  {
    id: 3,
    name: "Espresso Intensity",
    description: "Concentrated espresso blend with 3g of creatine per shot for pre-workout focus.",
    price: 29.99,
    popular: false,
  },
  {
    id: 4,
    name: "Decaf Strength",
    description: "All the benefits of creatine without the caffeine. Ideal for evening consumption.",
    price: 26.99,
    popular: false,
  },
];

export function Products() {
  return (
    <section id="products" className="py-16 md:py-24 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Our Premium <span className="text-primary">Creabrew</span> Collection
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover our range of strength-enhancing coffee blends, each perfectly balanced with creatine.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="relative aspect-square overflow-hidden bg-primary/5 flex items-center justify-center">
                <div className="text-primary/30 text-5xl font-bold">CB</div>
                {product.popular && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-sm">
                    POPULAR
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-xl">${product.price}</div>
                  <div className="text-sm text-muted-foreground">/ bag</div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href="/products">Add to Cart</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 