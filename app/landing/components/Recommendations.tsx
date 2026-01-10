"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

gsap.registerPlugin(ScrollTrigger);

// Recommendation display images handled via product.images[0] from data/products.ts
const categories = ["All", "Earbuds", "Headphones", "Accessories"];

export default function Recommendations() {
    const [activeCategory, setActiveCategory] = useState("All");
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const { addToCart } = useShop();

    // Filter products by category
    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            tl.fromTo(".product-card",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
                "-=0.5"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <section ref={sectionRef} className="bg-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-16">

                <div ref={headerRef} className="text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900">
                        EXPLORE THE FUTURE OF EVERYDAY AUDIO.
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                        Discover earbuds and headphones designed for comfort, clarity, and every moment in between.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer ${activeCategory === cat
                                    ? "bg-zinc-900 text-white border-zinc-900"
                                    : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-900 hover:text-zinc-900"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Link href={`/shop/${product.id}?from=landing`} key={product.id} className="product-card group cursor-pointer block">
                            <div className="relative aspect-[4/5] bg-zinc-100 rounded-[2rem] overflow-hidden mb-6">
                                <Image
                                    src={product.images[0] || product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Shopping Bag Button - Add to Cart */}
                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-zinc-100 cursor-pointer"
                                    title="Add to Cart"
                                >
                                    <ShoppingBag size={18} className="text-zinc-900" />
                                </button>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-lg font-medium text-zinc-900">{product.name}</h3>
                                <span className="text-lg font-bold text-zinc-900">{product.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98]"
                    >
                        View More
                    </Link>
                </div>

            </div>
        </section>
    );
}
