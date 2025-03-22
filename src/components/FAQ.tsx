"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "What makes Creabrew different from regular coffee?",
    answer:
      "Creabrew combines premium coffee with creatine monohydrate, offering performance benefits while maintaining the great taste of coffee you love. Our patent-pending process ensures perfect dissolution with no grittiness.",
  },
  {
    question: "How much creatine is in each serving?",
    answer:
      "Each serving contains 3g of pharmaceutical-grade creatine monohydrate, the scientifically recommended daily dose for optimal benefits.",
  },
  {
    question: "Will I experience the jitters or crash like with other coffees?",
    answer:
      "Creabrew is specifically formulated to provide clean, sustained energy without the typical coffee crash or jitters. Our unique blend balances caffeine with other ingredients for a smooth experience.",
  },
  {
    question: "Is Creabrew suitable for athletes and fitness enthusiasts?",
    answer:
      "Absolutely! Creabrew was designed with athletes and fitness enthusiasts in mind. The combination of coffee and creatine supports performance, recovery, and focus for an effective workout.",
  },
  {
    question: "How do I prepare Creabrew?",
    answer:
      "Prepare Creabrew just like your regular coffee. For hot brew, simply add hot water and stir. For cold brew, mix with cold water and ice. No special equipment needed!",
  },
  {
    question: "Is creatine safe for daily consumption?",
    answer:
      "Yes, creatine monohydrate is one of the most researched and safest supplements available. It has been extensively studied for decades with an excellent safety profile when consumed at recommended doses.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Questions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to know about Creabrew
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
} 