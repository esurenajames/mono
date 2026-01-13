"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AccessoriesPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStatus("success");
            setEmail("");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-zinc-900 px-2">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">Accessories</h1>
            <p className="text-zinc-500 mb-8 text-lg max-w-md text-center">
                Our new collection is currently in development. Subscribe to get notified when it launches.
            </p>

            {status === "success" ? (
                <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-2">
                    <span className="font-bold">Thanks!</span> We'll keep you posted.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="pt-4 mb-12 w-full max-w-md">
                    <div className="flex items-center bg-white rounded-full p-1.5 pl-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 gap-0md:gap-4 transition-transform hover:scale-[1.02] duration-300 w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 font-medium py-2 pl-2"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 cursor-pointer rounded-full text-sm font-bold tracking-wide hover:bg-zinc-800 transition-all shadow-lg shadow-black/20"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            )}

            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Shop
            </Link>
        </div>
    );
}
