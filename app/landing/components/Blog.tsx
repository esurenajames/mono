"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = {
    leftCard: {
        image: "/assets/images/Blog/man-listening.png",
        title: <>HOW TO USE<br />YOUR HEADPHONE?</>,
        description: "Using headphones is a simple yet important process to maximize the audio listening experience.",
        theme: "dark"
    },
    topRightCard: {
        image: "/assets/images/Blog/colorful-cases.png",
        title: "COLOR YOUR SOUND",
        description: "Express yourself with our vibrant new color collection.",
        theme: "dark"
    },
    bottomRightCard: {
        image: "/assets/images/Blog/white-case.png",
        title: "PURE MINIMALISM",
        description: "Simplicity meets performance in our lightest design yet.",
        theme: "light"
    }
};

export default function Blog() {
    const sectionRef = useRef(null);
    const leftCardRef = useRef(null);
    const rightTopRef = useRef(null);
    const rightBottomRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(leftCardRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );

            tl.fromTo([rightTopRef.current, rightBottomRef.current],
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
                "-=0.8"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-16 px-6 md:px-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-zinc-900">
                    DISCOVER
                </h2>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
                <div
                    ref={leftCardRef}
                    className="relative w-full h-[500px] md:h-full rounded-[2.5rem] overflow-hidden group cursor-pointer"
                >
                    <Image
                        src={content.leftCard.image}
                        alt="How to use headphone"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
                        <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 leading-tight">
                            {content.leftCard.title}
                        </h3>
                        <p className="text-zinc-300 max-w-sm text-sm md:text-base mb-8 leading-relaxed">
                            {content.leftCard.description}
                        </p>
                    </div>

                    {/* Learn More Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                        <span className="text-white text-xs font-bold uppercase tracking-widest text-center">
                            Learn<br />More
                        </span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="grid grid-rows-2 gap-6 h-full">

                    {/* Top Right Card */}
                    <div
                        ref={rightTopRef}
                        className="relative w-full h-[300px] md:h-full rounded-[2.5rem] overflow-hidden group cursor-pointer bg-zinc-100"
                    >
                        <Image
                            src={content.topRightCard.image}
                            alt="Colorful charging cases"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-2xl font-bold uppercase tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                {content.topRightCard.title}
                            </h3>
                            <p className="text-sm text-zinc-100 mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                {content.topRightCard.description}
                            </p>
                        </div>

                        {/* Learn More Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest text-center">
                                Learn<br />More
                            </span>
                        </div>
                    </div>

                    {/* Bottom Right Card */}
                    <div
                        ref={rightBottomRef}
                        className="relative w-full h-[300px] md:h-full rounded-[2.5rem] overflow-hidden group cursor-pointer bg-zinc-50"
                    >
                        <Image
                            src={content.bottomRightCard.image}
                            alt="White earbuds case"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Darker overlay on hover to make white text readable */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />

                        {/* Overlay Content - White text */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-2xl font-bold uppercase tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                {content.bottomRightCard.title}
                            </h3>
                            <p className="text-sm font-medium mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                {content.bottomRightCard.description}
                            </p>
                        </div>

                        {/* Learn More Button - White text */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                            <span className="text-white text-[10px] font-bold uppercase tracking-widest text-center transition-colors duration-500">
                                Learn<br />More
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
