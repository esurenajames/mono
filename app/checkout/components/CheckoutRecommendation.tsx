"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

interface CheckoutRecommendationProps {
    product: Product;
}

export default function CheckoutRecommendation({ product }: CheckoutRecommendationProps) {
    const { addToCart } = useShop();

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Recommended for you</h3>
            <div className="flex items-center justify-between gap-4">
                <Link href={`/shop/${product.id}`} className="flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-zinc-50 rounded-xl relative overflow-hidden flex-shrink-0">
                        <Image
                            src={product.images[1] || product.images[0] || product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-110 transition-transform"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-zinc-900 group-hover:text-zinc-600 transition-colors">{product.name}</h4>
                        <p className="text-xs text-zinc-500 max-w-[200px]">{product.description}</p>
                    </div>
                </Link>
                <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-bold text-zinc-900">{product.price}</span>
                    <button
                        onClick={() => addToCart({ ...product, image: product.images[1] || product.images[0] || product.image }, 1, "Standard", true)} // silent = true
                        className="text-xs font-bold bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors text-zinc-900 cursor-pointer"
                    >
                        <Plus size={12} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}
