"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight, ShoppingBag, Eye, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

interface HeadphonesContentProps {
    products: Product[];
}

export default function HeadphonesContent({ products }: HeadphonesContentProps) {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const { addToCart } = useShop();

    // Split products: Hero (First one) vs Rest
    const heroProduct = products[0];
    const gridProducts = products.slice(1);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-content",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
            );

            gsap.fromTo(".product-item",
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 }
            );
        });

        return () => ctx.revert();
    }, []);

    if (!heroProduct) return <div>Loading...</div>;

    return (
        <main className="bg-white min-h-screen pt-20">
            {/* Hero Section - Highlighted Product */}
            <section ref={heroRef} className="py-12 md:py-24 px-6 md:px-12 bg-white border-b border-zinc-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Text Content */}
                        <div className="flex-1 space-y-8 order-2 lg:order-1">
                            <div className="hero-content">
                                <span className="inline-block bg-zinc-100 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-6">
                                    Featured Product
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-[0.95]">
                                    {heroProduct.name}
                                </h1>
                            </div>
                            <p className="hero-content text-zinc-500 text-xl leading-relaxed max-w-lg">
                                {heroProduct.description}. Experience sound like never before with our signature audio technology.
                            </p>
                            <div className="hero-content flex flex-wrap gap-4 pt-4">
                                <Link
                                    href={`/shop/${heroProduct.id}`}
                                    className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/20"
                                >
                                    View Product
                                    <Eye size={18} />
                                </Link>
                                <button
                                    onClick={() => addToCart(heroProduct)}
                                    className="inline-flex items-center gap-2 bg-white text-black border border-zinc-200 px-8 py-4 rounded-full font-bold hover:bg-zinc-50 transition-all duration-300 cursor-pointer"
                                >
                                    Add to Cart - {heroProduct.price}
                                    <ShoppingBag size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="hero-content flex-1 relative order-1 lg:order-2 w-full">
                            <div className="relative aspect-square w-full max-w-xl mx-auto bg-zinc-50 rounded-[3rem]">
                                <Image
                                    src={heroProduct.image}
                                    alt={heroProduct.name}
                                    fill
                                    className="object-contain p-12 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid - The Rest */}
            <section ref={gridRef} className="py-24 px-6 md:px-12 bg-zinc-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                                More Headphones
                            </h2>
                            <p className="text-zinc-500 mt-2">Explore the full collection</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {gridProducts.map((product) => (
                            <Link
                                href={`/shop/${product.id}`}
                                key={product.id}
                                className="product-item group block bg-white rounded-[2rem] p-4 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative aspect-square bg-zinc-50 rounded-[1.5rem] overflow-hidden mb-6">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Quick Add Button - Hover Only (Recommendations Style) */}
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            className="flex items-center justify-center w-full h-full text-zinc-900 hover:text-zinc-600 cursor-pointer"
                                        >
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 px-2 pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-zinc-400 text-sm mt-1">{product.description}</p>
                                        </div>
                                        <span className="text-lg font-bold text-zinc-900">{product.price}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
