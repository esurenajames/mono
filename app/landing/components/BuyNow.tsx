"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function BuyNow() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const { addToCart } = useShop();

    const handleBuyNow = () => {
        const product = products.find(p => p.id === 1);
        if (product) addToCart(product);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(imageRef.current,
                { x: -50, opacity: 0, rotate: -10 },
                { x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" }
            )
                .fromTo(contentRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=1"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto bg-[#ced6dc] rounded-[3rem] overflow-hidden relative shadow-sm">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center p-12 md:p-20 gap-16 md:gap-24 relative z-10">
                    <div ref={imageRef} className="flex-1 w-full max-w-md relative">
                        <div className="relative aspect-square">
                            <Image
                                src="/assets/images/Shop/Mono-one-shop.png"
                                alt="AI-Powered Headphones"
                                fill
                                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div ref={contentRef} className="flex-1 space-y-8">
                        <div>
                            <span className="text-zinc-500 font-medium text-sm tracking-wide block mb-2">
                                Introducing
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-zinc-900 leading-[1.1] tracking-tight">
                                <span className="text-black">MONO ONE</span>
                            </h2>
                        </div>

                        <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                            Experience premium sound, all-day comfort, and sleek design — the wireless earbud made for your lifestyle.
                        </p>

                        <div className="pt-4">
                            <div className="inline-flex items-center bg-white rounded-full p-1.5 pl-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 gap-4 transition-transform hover:scale-105 duration-300">
                                <span className="text-lg font-bold text-zinc-900 tracking-tight">$560</span>
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-black text-white px-8 py-3 cursor-pointer rounded-full text-sm font-bold tracking-wide hover:bg-zinc-800 transition-all shadow-lg shadow-black/20"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
