import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { NavbarProvider } from "@/context/NavbarContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mono",
  description: "Best audio gear for music enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased bg-[#0e0e0e] text-white`}>
        <ShopProvider>
          <NavbarProvider>
            <Navbar />
            {children}
            <Footer />
          </NavbarProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
