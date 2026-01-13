"use client";

import Image from "next/image";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRef } from "react";

const reviews = [
    {
        id: 1,
        text: "The noise cancellation is absolutely mind-blowing. I can finally focus in my open office.",
        author: "Ryan Almeida",
        time: "1 day ago",
        avatar: "/assets/images/Recommendations/man-headphones.png" // using existing assets as placeholders
    },
    {
        id: 2,
        text: "Battery life that actually lasts all day. I've gone distinct days without charging. Game changer.",
        author: "Blossom Menezes",
        time: "3 days ago",
        avatar: "/assets/images/Recommendations/woman-earbuds-1.png"
    },
    {
        id: 3,
        text: "The sleek design fits perfectly with my aesthetic. Sound quality matches the premium look.",
        author: "Jason Wu",
        time: "1 week ago",
        avatar: "/assets/images/Shop/Mono-one-shop.png"
    },
    {
        id: 4,
        text: "Comfortable enough to wear for my entire 8-hour shift. No ear fatigue at all.",
        author: "Sarah Jenkins",
        time: "2 weeks ago",
        avatar: "/assets/images/Recommendations/woman-earbuds-1.png"
    }
];

export default function ReviewsSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-12 md:py-16 bg-zinc-50/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
                        Reviews from real people
                    </h2>
                    <div className="inline-flex items-center gap-2 text-zinc-600 font-medium">
                        <span className="font-bold">4.9/5</span>
                        <div className="flex gap-0.5">
                            <Star size={20} className="fill-[#00B67A] text-[#00B67A]" />
                        </div>
                        <span className="font-bold">Trustpilot</span>
                        <span className="text-zinc-400">Based on 3,987 reviews</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Branding / Controls */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-8">
                        <Quote size={64} className="text-zinc-200 fill-zinc-200" />
                        <h3 className="text-3xl font-bold text-zinc-900 leading-tight">
                            What our<br /> customers are<br /> saying
                        </h3>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full text-black border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-black bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Right Carousel */}
                    <div className="lg:col-span-8">
                        <div
                            ref={scrollRef}
                            className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="min-w-[85vw] md:min-w-[400px] bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 snap-start flex flex-col justify-between"
                                >
                                    <div className="space-y-6">
                                        <p className="text-zinc-600 leading-relaxed text-lg">
                                            &quot;{review.text}&quot;
                                        </p>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={16} className="fill-[#00B67A] text-[#00B67A]" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-zinc-50">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100">
                                            {/* Placeholder Avatar logic if no image */}
                                            <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 text-sm">{review.author}</p>
                                            <p className="text-zinc-400 text-xs">{review.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
