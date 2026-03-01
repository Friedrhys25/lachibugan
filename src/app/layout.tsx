import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RESTAURANT_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: `${RESTAURANT_INFO.name} - ${RESTAURANT_INFO.motto}`,
  description: `${RESTAURANT_INFO.name} offers the best grill and fastfood in LA. ${RESTAURANT_INFO.motto}.`,
  keywords: ["restaurant", "grill", "fastfood", "LA", "lachibugan", "food"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-white text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
