import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyCart({ onClose }: { onClose?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-zinc-400" size={32} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-zinc-900">Your bag is empty</h3>
                <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">
                    Looks like you haven't added anything to your cart yet.
                </p>
            </div>
            <Link
                href="/shop"
                onClick={onClose}
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-zinc-800 transition-colors w-full max-w-[200px]"
            >
                Start Shopping
            </Link>
        </div>
    );
}
