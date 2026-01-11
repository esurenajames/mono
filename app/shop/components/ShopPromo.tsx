import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ShopPromoProps {
    title: string;
    description: string;
    imageSrc: string;
    ctaText: string;
    ctaLink: string;
    imageAlt?: string;
    reverse?: boolean;
}

export default function ShopPromo({
    title,
    description,
    imageSrc,
    ctaText,
    ctaLink,
    imageAlt = "Promo image",
    reverse = false
}: ShopPromoProps) {
    return (
        <section className="py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image Side */}
                <div className={`relative aspect-square md:aspect-[5/4] rounded-[2.5rem] overflow-hidden bg-zinc-100 ${reverse ? 'lg:order-2' : ''}`}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content Side */}
                <div className={`space-y-8 ${reverse ? 'lg:order-1' : ''}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-lg text-zinc-600 leading-relaxed max-w-lg">
                        {description}
                    </p>
                    <Link
                        href={ctaLink}
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-zinc-800 transition-all shadow-lg shadow-black/20"
                    >
                        {ctaText}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
