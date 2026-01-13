"use client";

import Image from "next/image";
import { Feather, Battery, Wifi, LucideIcon, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Feather,
        title: "Feather-Light",
        description: "Weighing just 250g, MONO ONE disappears on your ear while delivering premium sound quality all day long."
    },
    {
        icon: Battery,
        title: "All-Day Listening Power",
        description: "40 hours of battery life means you can go from morning commute to evening workout without missing a beat."
    },
    {
        icon: Wifi,
        title: "Seamless Instant Pairing",
        description: "One-tap Bluetooth 5.3 connectivity gets you listening in seconds, switching between devices effortlessly."
    }
];

export default function ActiveLifestyle() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const manImageRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { addToCart } = useShop();

    const handleBuyNow = () => {
        const product = products.find(p => p.id === 1);
        if (product) addToCart(product);
    };

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % features.length);
        }, 3000);
    }, []);

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startTimer]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });

            revealTl.fromTo(".animate-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
            );

            revealTl.fromTo(imageContainerRef.current,
                { scaleY: 0, transformOrigin: "bottom" },
                { scaleY: 1, duration: 1, ease: "expo.out" },
                "-=0.8"
            );

            revealTl.fromTo(manImageRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
                "-=0.8"
            );

            revealTl.fromTo(".feature-wrapper",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-32 pb-0 px-6 md:px-12 text-zinc-900 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-0 md:gap-32 w-full">

                <div className="md:w-1/2 relative space-y-8">
                    <div className="relative z-10">
                        <h2 className="animate-text text-5xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tighter mb-8">
                            MONO ONE Comfort All Day
                        </h2>

                        <p className="animate-text text-zinc-500 text-md leading-relaxed max-w-lg font-medium">
                            Designed for your everyday life, delivering lightweight comfort, immersive sound, and reliable all-day battery so you can move freely.
                        </p>
                    </div>

                    <div className="feature-wrapper space-y-1">
                        <div className="relative h-28">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 flex items-start gap-4 transition-all duration-500 ease-out ${activeIndex === index
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-4 pointer-events-none'
                                            }`}
                                    >
                                        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 shrink-0 shadow-lg shadow-zinc-900/20">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-1 ml-2">
                                            <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                                            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                <div className="w-full md:w-1/2 relative flex justify-center h-[600px] items-end pb-12">
                    <div
                        ref={imageContainerRef}
                        className="relative w-full max-w-lg h-[32rem] md:h-[450px] bg-zinc-100 rounded-[3rem] p-8 shadow-inner"
                    >
                        <div ref={manImageRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35rem] md:w-[115%] h-[450px] md:h-[140%] z-10 filter drop-shadow-2xl">
                            <Image
                                src="/assets/images/Advertisement/man1.png"
                                alt="Man wearing MONO ONE headphones"
                                fill
                                className="object-contain object-bottom"
                                priority
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-32 -right-4 md:right-0 z-20 animate-text opacity-0">
                        <button
                            onClick={handleBuyNow}
                            className="bg-white text-black cursor-pointer px-8 py-4 rounded-full font-bold shadow-2xl border border-zinc-200 hover:scale-105 hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
                        >
                            Buy Now
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
