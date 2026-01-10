"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useNavbarContext } from "@/context/NavbarContext";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        label: "Audio Performance",
        title: "The sound of science.",
        description: "Powered by advanced acoustic engineering, MONO ONE features a completely redesigned architecture that brings breathtaking, all-around-you audio to everything you listen to — from your pump-up playlist to your weekly FaceTime call with family."
    },
    {
        label: "Active Noise Cancellation",
        title: "Silence is golden.",
        description: "MONO ONE uses computational audio and dual microphones to continuously adapt to your ear and environment, blocking out the world so you can focus on what matters most to you."
    },
    {
        label: "Transparency Mode",
        title: "Hear the world around you.",
        description: "Need to stay aware of your surroundings? With Transparency mode, outside sound is seamlessly blended with your audio, so you never miss an announcement or a conversation."
    },
    {
        label: "Spatial Audio",
        title: "Sound all around.",
        description: "Personalized Spatial Audio with dynamic head tracking places sound all around you, creating an immersive experience that makes you feel like you're inside the music, movie, or game."
    },
];

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { categorySectionRef, setIsScrolled } = useNavbarContext();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrolled(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            setIsScrolled(false); // Reset on unmount
            observer.disconnect();
        };
    }, [setIsScrolled]);

    useEffect(() => {
        if (!containerRef.current) return;
        // ... (GSAP code remains)

        const ctx = gsap.context(() => {
            // Animate each feature block
            featureRefs.current.forEach((feature, index) => {
                if (!feature) return;

                const label = feature.querySelector('.feature-label');
                const title = feature.querySelector('.feature-title');
                const desc = feature.querySelector('.feature-desc');

                gsap.fromTo([label, title, desc],
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: feature,
                            start: "top 70%",
                            end: "top 30%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="category-section"
            ref={(el) => {
                containerRef.current = el;
                categorySectionRef.current = el;
            }}
            className="bg-zinc-950 relative"
        >
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">

                    {/* Left Side - Sticky */}
                    <div
                        className="md:w-1/2 h-screen sticky top-0 flex flex-col justify-center"
                    >
                        <p className="text-zinc-400 text-sm uppercase tracking-[0.3em] font-semibold mb-4">
                            MONO ONE
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold text-zinc-50 leading-tight tracking-tight mb-12">
                            Experience<br />
                            <span className="text-zinc-500">pure audio.</span>
                        </h2>

                        {/* Science Image */}
                        <div className="relative w-full max-w-sm h-64 md:h-80 overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
                            <Image
                                src="/assets/images/Advertisement/science.png"
                                alt="Acoustic engineering visualization"
                                fill
                                className="object-cover opacity-80 mix-blend-screen"
                            />
                        </div>
                    </div>

                    {/* Right Side - Scrolling Content */}
                    <div className="md:w-1/2 py-32">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                ref={(el) => { featureRefs.current[index] = el; }}
                                className="min-h-screen flex flex-col justify-center"
                            >
                                <p className="feature-label text-zinc-500 text-sm uppercase tracking-[0.3em] font-medium mb-4">
                                    {feature.label}
                                </p>
                                <h3 className="feature-title text-3xl md:text-5xl font-bold text-zinc-50 leading-tight mb-8 tracking-tight">
                                    {feature.title}
                                </h3 >
                                <p className="feature-desc text-lg md:text-xl text-zinc-400 leading-relaxed max-w-lg">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
