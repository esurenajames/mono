"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSound() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });

            // Animate Text
            tl.fromTo(contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            // Animate Card
            tl.fromTo(cardRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 px-6 md:px-12 bg-white">
            <div className="max-w-[1400px] mx-auto relative h-[600px] md:h-[800px] rounded-[3rem] overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/assets/images/experience_hero.png"
                    alt="Experience Sound"
                    fill
                    className="object-cover"
                />

                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Big Text 'Experience Sound' - Emulating the background text in reference */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none opacity-80 mix-blend-overlay">
                    <h2 className="text-[12vw] font-bold text-white tracking-tighter leading-none whitespace-nowrap">
                        Experience Sound
                    </h2>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-10 transition-opacity">

                    {/* Top Section (Empty for now to let image shine) */}
                    <div></div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-0">

                        {/* Left Side: Description & Button */}
                        <div ref={contentRef} className="max-w-md space-y-8">
                            {/* Mobile Only Title (Since big BG text might be hard to read on mobile) */}
                            <h2 className="md:hidden text-4xl font-bold text-white mb-4">
                                Experience <br /> Sound
                            </h2>

                            <p className="text-zinc-200 text-lg md:text-xl font-light leading-relaxed">
                                Advanced noise cancellation & studio-quality audio designed for true music lovers.
                            </p>

                            <button className="bg-[#FF4D30] text-white px-8 py-3 rounded-full font-medium hover:bg-[#e03e23] transition-colors duration-300">
                                Shop Now
                            </button>
                        </div>

                        {/* Right Side: Product Card */}
                        <div ref={cardRef} className="bg-white p-4 rounded-[2rem] shadow-2xl w-full md:w-64 flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 group">
                            <div className="relative w-full aspect-square bg-zinc-50 rounded-[1.5rem] overflow-hidden p-4">
                                <Image
                                    src="/assets/images/headphones_product.png"
                                    alt="Black Headphones"
                                    fill
                                    className="object-contain p-2 mix-blend-multiply"
                                />
                            </div>

                            <div className="w-full flex items-center justify-between px-2 pb-2">
                                <span className="text-base font-bold text-zinc-900 leading-tight">
                                    See the product<br />details
                                </span>
                                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
