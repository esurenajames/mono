"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search } from "lucide-react";
import { useEffect, useState } from "react";
import CartSidebar from "./Cart/CartSidebar";
import { useShop } from "@/context/ShopContext";
import { useNavbarContext } from "@/context/NavbarContext";
import { products } from "@/data/products";

export default function Navbar() {
    const { isCartOpen, openCart, closeCart, cart, addToCart } = useShop();
    const { isScrolled } = useNavbarContext();
    const router = useRouter();

    const handleOrderNow = () => {
        const product = products.find(p => p.id === 1);
        if (product) {
            addToCart(product, 1, "Standard", true); // silent = true, no cart animation
        }
        router.push("/checkout");
    };

    const scrollToSpecs = (e: React.MouseEvent) => {
        e.preventDefault();
        const specsSection = document.getElementById("specs");
        if (specsSection) {
            specsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black/80 backdrop-blur-md border-b border-white/5"
            >
                <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between text-xs font-medium text-gray-400 tracking-wide">

                    {/* Condition: Default / Top State */}
                    {!isScrolled ? (
                        <>
                            {/* Logo - First Item */}
                            <Link
                                href="/"
                                className="text-white hover:text-gray-100 transition-colors uppercase tracking-widest font-bold"
                            >
                                MONO
                            </Link>

                            {/* Desktop Menu - Distributed Links */}
                            <div className="hidden md:flex items-center justify-center gap-10">
                                <Link href="/shop" className="hover:text-white transition-colors">
                                    Shop
                                </Link>
                                <Link href="/headphones" className="hover:text-white transition-colors">
                                    Headphones
                                </Link>
                                <Link href="/earbuds" className="hover:text-white transition-colors">
                                    Earbuds
                                </Link>
                                <Link href="/accessories" className="hover:text-white transition-colors">
                                    Accessories
                                </Link>
                                <Link href="/support" className="hover:text-white transition-colors">
                                    Support
                                </Link>
                            </div>

                            {/* Right Side Icons */}
                            <div className="flex items-center gap-8">
                                <Link href="/wishlist" className="hover:text-white transition-colors">
                                    My Wishlist
                                </Link>
                                <button
                                    onClick={openCart}
                                    className="hover:text-white mt-1 transition-colors relative cursor-pointer"
                                >
                                    <ShoppingBag size={14} />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Condition: Scrolled / Product State */
                        <>
                            {/* Product Name */}
                            <Link
                                href="/"
                                className="text-white hover:text-gray-100 transition-colors uppercase tracking-widest font-bold"
                            >
                                MONO ONE
                            </Link>

                            {/* Product Links & CTA */}
                            <div className="flex items-center gap-6 md:gap-8">
                                <Link href="#overview" className="hover:text-white transition-colors hidden md:block">
                                    Overview
                                </Link>
                                <Link
                                    href="#specs"
                                    onClick={scrollToSpecs}
                                    className="hover:text-white transition-colors hidden md:block"
                                >
                                    Tech Specs
                                </Link>

                                <button
                                    onClick={handleOrderNow}
                                    className="bg-white hover:bg-[#0077ed] hover:text-white text-black px-4 py-1 rounded-full font-normal transition-all text-xs cursor-pointer"
                                >
                                    Order Now
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
        </>
    );
}
