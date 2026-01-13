"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import CartSidebar from "./Cart/CartSidebar";
import { useShop } from "@/context/ShopContext";
import { useNavbarContext } from "@/context/NavbarContext";
import { products } from "@/data/products";

export default function Navbar() {
    const { isCartOpen, openCart, closeCart, cart, addToCart } = useShop();
    const { isScrolled } = useNavbarContext();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path ? "text-white font-bold" : "hover:text-white transition-colors";

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
                                <Link href="/shop" className={isActive("/shop")}>
                                    Shop
                                </Link>
                                <Link href="/headphones" className={isActive("/headphones")}>
                                    Headphones
                                </Link>
                                <Link href="/earbuds" className={isActive("/earbuds")}>
                                    Earbuds
                                </Link>
                                <Link href="/accessories" className={isActive("/accessories")}>
                                    Accessories
                                </Link>
                                <Link href="/support" className={isActive("/support")}>
                                    Support
                                </Link>
                            </div>

                            {/* Right Side Icons */}
                            <div className="flex items-center gap-4 md:gap-8">
                                <Link href="/wishlist" className={isActive("/wishlist")}>
                                    <span className="hidden md:inline">My Wishlist</span>
                                    <Heart className="md:hidden" size={18} />
                                </Link>
                                <button
                                    onClick={openCart}
                                    className="hover:text-white mt-1 transition-colors relative cursor-pointer"
                                >
                                    <ShoppingBag size={18} />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    className="md:hidden hover:text-white transition-colors"
                                >
                                    <Menu size={20} />
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

            {/* Mobile Menu Sidebar */}
            <div
                className={`fixed inset-0 z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-black border-r border-white/10 shadow-2xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-bold tracking-widest uppercase">
                            MONO
                        </Link>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 text-sm font-medium text-gray-400">
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/shop")}>
                            Shop
                        </Link>
                        <Link href="/headphones" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/headphones")}>
                            Headphones
                        </Link>
                        <Link href="/earbuds" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/earbuds")}>
                            Earbuds
                        </Link>
                        <Link href="/accessories" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/accessories")}>
                            Accessories
                        </Link>
                        <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className={isActive("/support")}>
                            Support
                        </Link>
                    </div>
                </div>
            </div>

            <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
        </>
    );
}
