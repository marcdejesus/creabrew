import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Creabrew | Premium Coffee with Creatine",
  description: "Premium coffee infused with creatine for improved performance, focus, and energy. Fuel your workouts and your day with Creabrew.",
  keywords: ["coffee", "creatine", "performance", "workout", "energy", "focus", "fitness", "supplement"],
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: { url: "/logo.png", sizes: "180x180", type: "image/png" },
    shortcut: { url: "/icon.png" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#75513d" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
