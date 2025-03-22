import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Products } from "@/components/Products";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Benefits />
      <Products />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
