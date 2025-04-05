import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileText, Download, ArrowLeft, Briefcase, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "New Venture Challenge - Creabrew",
  description: "Central Michigan New Venture Challenge 2025 Information",
};

export default function NVCPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="flex flex-col items-start gap-4 mb-8">
          <h1 className="text-3xl font-bold">Central Michigan New Venture Challenge 2025</h1>
          <p className="text-muted-foreground">
            Creabrew Coffee is proud to participate in the Central Michigan New Venture Challenge 2025, 
            presenting our innovative approach to sustainable and ethical coffee production and distribution.
          </p>
        </div>

        <div className="bg-slate-50 border rounded-lg p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Business One-Pager</h2>
            </div>
            <Link href="/nvc/1.png" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Our comprehensive business overview highlighting our mission, vision, and unique value proposition.
          </p>
          
          <div className="relative border rounded-md overflow-hidden mb-4">
            <Image 
              src="/nvc/1.png" 
              alt="Business One-Pager"
              width={800}
              height={1000}
              className="w-full h-auto"
            />
          </div>

          <div className="flex items-center justify-between mb-4 mt-8">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Venture Highlights</h2>
            </div>
            <Link href="/nvc/2.png" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Key differentiators and competitive advantages of our coffee business venture.
          </p>
          
          <div className="relative border rounded-md overflow-hidden">
            <Image 
              src="/nvc/2.png" 
              alt="Venture Highlights"
              width={800}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-slate-50 border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Business Forecast 2025</h2>
            </div>
            <Link href="/nvc/NVC Forecast 2025.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Detailed financial projections and growth strategy for Creabrew Coffee from 2025 onwards.
          </p>
          
          <div className="relative aspect-[1/1.3] w-full h-auto border rounded-md overflow-hidden">
            <iframe 
              src="/nvc/NVC Forecast 2025.pdf" 
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "none" }}
              title="Business Forecast 2025 PDF"
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Why Creabrew for NVC 2025</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Sustainable Model</h3>
              <p className="text-muted-foreground">
                Our business integrates ethical sourcing, eco-friendly packaging, and low-waste operations 
                to create a sustainable coffee production and distribution model.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Community Impact</h3>
              <p className="text-muted-foreground">
                We prioritize fair compensation for farmers while creating community spaces 
                that foster connection and collaboration in Central Michigan.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Innovative Technology</h3>
              <p className="text-muted-foreground">
                Our digital platform connects consumers directly with their coffee's origin, 
                showcasing transparency and educating about sustainable coffee practices.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Growth Potential</h3>
              <p className="text-muted-foreground">
                With a scalable business model and plans for expansion beyond Central Michigan, 
                Creabrew offers significant growth and investment opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 