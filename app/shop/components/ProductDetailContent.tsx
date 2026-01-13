"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ShoppingBag, Star, Share2 } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/products";

interface ProductDetailContentProps {
    product: Product;
    allProducts: Product[];
}

export default function ProductDetailContent({ product, allProducts }: ProductDetailContentProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();

    const inWishlist = product ? isInWishlist(product.id) : false;

    const toggleWishlist = () => {
        if (!product) return;
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    if (!product) return null;

    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    let backLink =
        product.category === "Earbuds" ? "/earbuds" :
            product.category === "Accessories" ? "/accessories" :
                "/headphones";

    let backText =
        product.category === "Earbuds" ? "Back to Earbuds" :
            product.category === "Accessories" ? "Back to Accessories" :
                "Back to Headphones";

    if (from) {
        if (from === "landing") {
            backLink = "/";
            backText = "Back to Home";
        } else if (from.startsWith("/")) {
            backLink = from;
            backText = "Back";
        }
    }

    return (
        <main className="bg-white min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link
                        href={backLink}
                        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        {backText}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left: Gallery */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-zinc-50 rounded-[2.5rem] overflow-hidden">
                            <Image
                                src={product.images && product.images.length > 0 ? product.images[selectedImage] : product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-12"
                                priority
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-black" : "border-transparent hover:border-zinc-200"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            className="object-contain p-4"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-500">
                                    <Share2 size={20} />
                                </button>
                            </div>


                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-xl md:text-2xl font-bold text-zinc-900">{product.price}</span>
                                <div className="flex items-center gap-1 ml-4 border-l border-zinc-200 pl-4">
                                    <Star size={16} className="fill-black text-black" />
                                    <span className="font-bold text-sm">4.9</span>
                                    <span className="text-zinc-400 text-sm">(128 reviews)</span>
                                </div>
                            </div>

                            <p className="text-zinc-600 text-base  md:text-lg leading-relaxed">
                                {product.featuredDescription || product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 pt-8 border-t border-zinc-100">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-1 bg-black text-white h-14 rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                                >
                                    <ShoppingBag size={20} />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={toggleWishlist}
                                    className={`h-14 w-14 border rounded-full flex items-center justify-center transition-colors cursor-pointer ${inWishlist ? "bg-red-50 border-red-200" : "border-zinc-200 hover:bg-zinc-50"}`}
                                >
                                    <span className="sr-only">{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
                                    <svg
                                        className={`w-6 h-6 transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-zinc-900"}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-center text-xs text-zinc-400">
                                Free shipping on all orders over $100. 30-day return policy.
                            </p>
                        </div>

                        {/* Features List (Mock) */}
                        <div className="grid grid-cols-2 gap-4 pt-8">
                            {[
                                "Active Noise Cancellation",
                                "Transparency Mode",
                                "Spatial Audio",
                                "20 Hours Battery Life"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Recommendations Section */}
                <div className="mt-24 pt-24 border-t border-zinc-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">You might also like</h2>
                    <div className="flex overflow-x-auto pb-4 -mx-6 px-6 snap-x md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0 no-scrollbar">
                        {allProducts
                            .filter(p => p.id !== product.id)
                            .slice(0, 3)
                            .map((recProduct) => (
                                <Link
                                    href={`/shop/${recProduct.id}?from=/shop/${product.id}`}
                                    key={recProduct.id}
                                    className="group block bg-zinc-50 rounded-[2rem] p-6 hover:bg-zinc-100 transition-colors min-w-[90vw] w-[90vw] md:min-w-0 md:w-auto snap-center flex-shrink-0 mr-4 md:mr-0 border border-transparent hover:border-zinc-200"
                                >
                                    <div className="relative aspect-square mb-6">
                                        <Image
                                            src={recProduct.image}
                                            alt={recProduct.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-zinc-900">{recProduct.name}</h3>
                                        <p className="text-zinc-500 text-sm">{recProduct.price}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </main >
    );
}
