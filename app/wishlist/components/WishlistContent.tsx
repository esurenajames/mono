"use client";

import { useShop } from "@/context/ShopContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

export default function WishlistContent() {
    const { wishlist, removeFromWishlist, addToCart } = useShop();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen f flex flex-col items-center justify-center p-6 text-center bg-white pt-24">
                <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                    <svg
                        className="w-10 h-10 text-zinc-300"
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
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">Your wishlist is empty</h1>
                <p className="text-zinc-500 mb-8 max-w-md">
                    Start exploring our collection and save your favorite items for later.
                </p>
                <Link
                    href="/headphones"
                    className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98]"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-2">
                            Wishlist
                        </h1>
                        <p className="text-zinc-500">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
                    </div>
                    <Link href="/headphones" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors">
                        <ArrowLeft size={18} />
                        Continue Shopping
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {wishlist.map((product) => (
                        <div key={product.id} className="group flex flex-col">
                            <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-zinc-50 rounded-[2.5rem] overflow-hidden mb-6">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-10 group-hover:scale-110 transition-transform duration-500"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWishlist(product.id);
                                    }}
                                    className="absolute top-6 right-6 w-10 h-10 bg-white text-zinc-900 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 hover:bg-red-50 z-10"
                                    title="Remove from Wishlist"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </Link>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <Link href={`/shop/${product.id}`}>
                                        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 leading-tight group-hover:text-zinc-600 transition-colors">
                                            {product.name}
                                        </h2>
                                    </Link>
                                    <p className="text-zinc-500 mt-1 line-clamp-2">{product.description}</p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-lg md:text-xl font-bold text-zinc-900">{product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-full font-bold hover:bg-zinc-800 transition-all shadow-md active:scale-[0.98]"
                                    >
                                        <ShoppingBag size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
