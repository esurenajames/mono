"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const categories = [
    {
        id: "headphones",
        title: "Headphones",
        description: "Immersive sound. No distractions.",
        href: "/headphones",
        image: "/assets/images/Shop/Mono-one-shop.png", // Using product image
        bg: "bg-zinc-50"
    },
    {
        id: "earbuds",
        title: "Earbuds",
        description: "Pure audio. In your pocket.",
        href: "/earbuds", // Matching Navbar link
        image: "/assets/images/Recommendations/woman-earbuds-1.png",
        bg: "bg-black text-white"
    },
    {
        id: "accessories",
        title: "Accessories",
        description: "Enhance your experience.",
        href: "/accessories",
        image: "/assets/images/Recommendations/man-headphones.png", // Placeholder
        bg: "bg-white border border-zinc-200"
    }
];

export default function ShopHub() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".category-card",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-4">
                        Choose your sound.
                    </h1>
                    <p className="text-zinc-500 text-lg md:text-xl">
                        Discover our premium collection of audio devices designed for every lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] md:h-[500px]">
                    {categories.map((cat, i) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className={`category-card group relative rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 hover:scale-[1.02] transition-transform duration-500 ${cat.bg}`}
                        >
                            <div className="relative z-10">
                                <h2 className={`text-2xl font-bold mb-2 ${cat.id === 'earbuds' ? 'text-white' : 'text-zinc-900'}`}>{cat.title}</h2>
                                <p className={`text-sm ${cat.id === 'earbuds' ? 'text-zinc-400' : 'text-zinc-500'}`}>{cat.description}</p>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center translate-y-12 group-hover:interpret-y-4 transition-transform duration-700">
                                <div className="relative w-4/5 aspect-square">
                                    <Image
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="relative z-10 self-end">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${cat.id === 'earbuds' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                    }`}>
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
