"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient_browser } from "@/lib/supabase";
import ProductsListing from "@/components/ProductsListing";
import { Tables } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

// Sample product data as fallback
const sampleProducts = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    description: "A light roast coffee with bright acidity, floral notes, and a clean finish.",
    price: 14.99,
    image_url: "/products/ethiopian.svg",
    category: "Light Roast",
    stock: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Colombian Supremo",
    description: "A medium roast with rich chocolate notes and a nutty finish.",
    price: 12.99,
    image_url: "/products/colombian.svg",
    category: "Medium Roast",
    stock: 150,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Espresso Blend",
    description: "A dark roast blend specifically formulated for espresso with notes of chocolate and caramel.",
    price: 15.99,
    image_url: "/products/espresso.svg",
    category: "Dark Roast",
    stock: 100,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Organic Decaf",
    description: "Swiss Water Process decaffeinated coffee with notes of chocolate and nuts.",
    price: 16.99,
    image_url: "/products/decaf.svg",
    category: "Decaf",
    stock: 75,
    created_at: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Tables<"products">[]>(sampleProducts as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem } = useCartStore();
  const supabase = createClient_browser();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("name");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Using sample data instead.");
        // Fall back to sample data - already set as default
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [supabase]);

  const handleAddToCart = (product: Tables<"products">) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || undefined,
    });
    
    // Show toast or notification here if needed
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-2">Our Coffee</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Explore our selection of premium, ethically sourced coffee beans. Each variety is carefully roasted to bring out its unique flavor profile.
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductsListing 
          products={products} 
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
} 