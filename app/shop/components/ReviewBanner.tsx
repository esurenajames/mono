"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ReviewBanner() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    return (
        <section ref={sectionRef} className="py-16 pb-24 px-6 md:px-0 bg-white">
            <div className="bg-zinc-200 rounded-[3rem] overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-12 relative min-h-[500px]">
                    <div ref={contentRef} className="flex-1 space-y-8 z-20 relative max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tighter text-zinc-900">
                            Ready for <br />
                            Better Sound?
                        </h2>

                        <div className="relative inline-block">
                            <Link
                                href="/shop"
                                className="group bg-black text-white px-9 py-4 rounded-full text-lg font-bold hover:scale-105 hover:shadow-2xl hover:bg-zinc-900 transition-all duration-300 flex items-center gap-2"
                            >
                                Shop Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div ref={imageRef} className="absolute right-0 bottom-0 w-[60%] h-[100%] z-10 translate-y-10 md:translate-x-10 pointer-events-none">
                        <div className="relative w-full h-full">
                            <Image
                                src="/assets/images/Shop/Show.png"
                                alt="NIYO Buds"
                                fill
                                className="object-contain object-bottom-right scale-125"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
