import Image from "next/image";
import { Tables } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductsListingProps {
  products: Tables<"products">[];
  onAddToCart: (product: Tables<"products">) => void;
}

export default function ProductsListing({ products, onAddToCart }: ProductsListingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border transition-shadow hover:shadow-md">
          <div className="relative h-64 bg-slate-50">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-contain p-4"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  (e.target as HTMLImageElement).src = "/products/placeholder.svg";
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-100">
                <Image
                  src="/products/placeholder.svg"
                  alt="Placeholder"
                  width={120}
                  height={120}
                  className="opacity-30"
                />
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            
            {product.category && (
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 mb-2">
                {product.category}
              </span>
            )}
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold">${product.price.toFixed(2)}</span>
              
              <Button 
                onClick={() => onAddToCart(product)} 
                size="sm" 
                className="text-xs"
              >
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 