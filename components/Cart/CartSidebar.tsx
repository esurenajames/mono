import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import EmptyCart from "./EmptyCart";
import { useShop } from "@/context/ShopContext";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const sidebarRef = useRef(null);
    const overlayRef = useRef(null);
    const { cart, updateQuantity, removeFromCart } = useShop();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.set(overlayRef.current, { display: "block" });
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
            gsap.to(sidebarRef.current, {
                x: "0%",
                duration: 0.4,
                ease: "power3.out",
                delay: 0.1
            });
        } else {
            document.body.style.overflow = '';
            gsap.to(sidebarRef.current, {
                x: "100%",
                duration: 0.3,
                ease: "power3.in"
            });
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
                }
            });
        }
    }, [isOpen]);

    const subtotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + (price * item.quantity);
    }, 0);

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-[60] hidden opacity-0 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl translate-x-full overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100">
                    <h2 className="text-xl font-bold text-zinc-900">My Cart ({cart.length})</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-zinc-900"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                        <EmptyCart onClose={onClose} />
                    ) : (
                        <div className="p-6 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-24 h-24 bg-zinc-50 rounded-2xl flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-zinc-900">{item.name}</h3>
                                                <p className="text-sm text-zinc-500">{item.color || "Standard"}</p>
                                            </div>
                                            <p className="font-bold text-zinc-900">{item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-zinc-50 rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-500"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center text-zinc-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-zinc-900"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
                        <div className="flex justify-between items-center text-zinc-500">
                            <span>Subtotal</span>
                            <span className="text-zinc-900 font-bold text-lg">${subtotal}</span>
                        </div>
                        <p className="text-xs text-zinc-400 text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
