"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Filter, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { Tables } from "@/lib/supabase";

type Product = Tables<"products"> | {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  image_url?: string;
  stock?: number;
  created_at: string;
};

export default function ProductsListing({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addItem } = useCartStore();

  // Get unique categories from products
  const categories = Array.from(
    new Set(initialProducts.map((product) => product.category).filter(Boolean) as string[])
  );

  // Filter products based on search term and selected category
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || undefined,
    });
  };
  
  // Function to handle image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm whitespace-nowrap">Filter by:</span>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found. Try changing your search criteria.</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 sm:h-64 bg-slate-100">
                  {product.image_url && !imageErrors[product.id] ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(product.id)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Coffee className="h-12 w-12 mb-2 opacity-30" />
                      <span className="text-sm">Coffee</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  {product.category && (
                    <span className="inline-block px-2 py-1 rounded-full bg-slate-100 text-xs mb-2">
                      {product.category}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 