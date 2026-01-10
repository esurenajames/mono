import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SupportPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-zinc-900 px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Support Unavailable</h1>
            <p className="text-zinc-500 mb-8 text-lg max-w-lg">
                Our support system is currently undergoing maintenance. <br />
                We apologize for the inconvenience.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-400 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Home
            </Link>
        </div>
    );
}
