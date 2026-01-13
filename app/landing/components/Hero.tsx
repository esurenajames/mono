"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 80;

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const textRef3 = useRef<HTMLDivElement>(null);
    const textRef4 = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/assets/images/Create_a_video_1080p_202601100745_${frameNumber}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = images[0].width;
        canvas.height = images[0].height;

        const render = (index: number) => {
            if (images[index]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[index], 0, 0);
            }
        };
        render(0);

        const animationState = { frame: 0 };
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: 1,
            }
        });

        tl.to(animationState, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 10,
            onUpdate: () => render(Math.round(animationState.frame))
        }, 0);

        tl.to(textRef1.current, { opacity: 0, duration: 1, ease: "power1.inOut" }, 1.5);
        tl.fromTo(textRef2.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1, ease: "power1.out" }, 2);
        tl.to(textRef2.current, { opacity: 0, duration: 1, ease: "power1.in" }, 4);
        tl.fromTo(textRef3.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1, ease: "power1.out" }, 4.5);
        tl.to(textRef3.current, { opacity: 0, duration: 1, ease: "power1.in" }, 6.5);
        tl.fromTo(textRef4.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1, ease: "power1.out" }, 7);
        tl.fromTo(buttonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power1.out", pointerEvents: "auto" }, 7.5);

        return () => {
            // Cleanup ScrollTrigger
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, [isLoaded, images]);

    return (
        <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-4">
                <div ref={textRef1} className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-[15vw] md:text-[12rem] font-bold tracking-tighter text-zinc-50 leading-none mix-blend-overlay">
                        TIMELESS
                    </h1>
                </div>

                <div ref={textRef2} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
                    <h2 className="text-6xl md:text-9xl font-bold text-zinc-50 text-center shadow-zinc-950 drop-shadow-lg tracking-tight">
                        PURE SOUND
                    </h2>
                </div>

                <div ref={textRef3} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
                    <h2 className="text-6xl md:text-9xl font-bold text-zinc-50 text-center shadow-zinc-950 drop-shadow-lg tracking-tight">
                        ZERO NOISE
                    </h2>
                </div>

                <div ref={textRef4} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
                    <h2 className="text-6xl md:text-9xl font-bold text-zinc-50 text-center shadow-zinc-950 drop-shadow-lg tracking-tight mb-10">
                        MONO ONE
                    </h2>
                    <button
                        ref={buttonRef}
                        className="opacity-0 px-12 py-5 bg-zinc-50 text-zinc-950 text-xl font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all hover:scale-105 rounded-full shadow-2xl shadow-zinc-50/20"
                    >
                        Order Now
                    </button>
                </div>

            </div>
        </div>
    );
}
