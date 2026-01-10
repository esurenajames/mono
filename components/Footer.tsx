import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-900 py-20 border-t border-white/10">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="text-white text-2xl font-bold tracking-widest uppercase block">
                            MONO
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-xs">
                            Engineered for the future of sound. Experience audio in its purest form.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-wrap gap-8 md:gap-12">
                        <Link href="/shop" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Shop
                        </Link>
                        <Link href="/headphones" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Headphones
                        </Link>
                        <Link href="/earbuds" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Earbuds
                        </Link>
                        <Link href="/accessories" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Accessories
                        </Link>
                        <Link href="/support" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Support
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
                    <p className="text-zinc-600 text-xs">
                        &copy; 2026 MONO Audio. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <SocialLink href="#" label="Instagram" />
                        <SocialLink href="#" label="Twitter" />
                        <SocialLink href="#" label="Facebook" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            className="text-zinc-500 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors"
        >
            {label}
        </a>
    );
}
