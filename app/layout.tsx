import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAHTA PRINTING | Premium Custom Printing Solutions",
  description:
    "Solusi printing terbaik untuk bisnis Anda. Kertas nasi, box makanan, paper bag, sticker, kartu nama, dan cup paper custom dengan kualitas premium.",
  keywords: [
    "printing",
    "custom printing",
    "kertas nasi",
    "box makanan",
    "packaging",
    "Jakarta",
    "Indonesia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
