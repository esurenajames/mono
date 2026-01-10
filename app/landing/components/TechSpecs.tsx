"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const specs = [
    {
        category: "Audio Technology",
        details: [
            "Custom high-excursion driver",
            "High dynamic range amplifier",
            "Spatial Audio with dynamic head tracking",
            "Adaptive EQ",
        ]
    },
    {
        category: "Sensors",
        details: [
            "Dual beamforming microphones",
            "Inward-facing microphone",
            "Skin-detect sensor",
            "Motion-detecting accelerometer",
            "Speech-detecting accelerometer",
        ]
    },
    {
        category: "Chip",
        details: [
            "M1 Headphone Chip",
            "Ultra-low latency audio processing"
        ]
    },
    {
        category: "Controls",
        details: [
            "Press once to play, pause, or answer a phone call",
            "Press twice to skip forward",
            "Press three times to skip back",
        ]
    },
    {
        category: "Connectivity",
        details: [
            "Bluetooth 5.3",
            "Seamless switching between devices",
            "AAC, SBC, and LHDC 5.0 codec support"
        ]
    }
];

export default function TechSpecs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="specs" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    <div className="flex-1 w-full max-w-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-transparent rounded-full blur-3xl opacity-50 transform scale-90" />

                        <div className="relative aspect-square w-full">
                            <Image
                                src="/assets/images/Shop/Mono-one.png"
                                alt="MONO ONE Specifications"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-12 tracking-tight">
                            Tech Specs
                        </h2>

                        <div className="space-y-4">
                            {specs.map((spec, index) => (
                                <div
                                    key={index}
                                    className="border-b border-zinc-200 pb-4"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex justify-between items-center py-2 text-left group cursor-pointer"
                                    >
                                        <span className="text-xl font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                            {spec.category}
                                        </span>
                                        <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-900 group-hover:bg-zinc-200'}`}>
                                            {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="min-h-0">
                                            <ul className="space-y-3 pb-4">
                                                {spec.details.map((detail, idx) => (
                                                    <li key={idx} className="text-zinc-500 font-medium">
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
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
