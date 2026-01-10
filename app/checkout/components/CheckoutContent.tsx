"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";
import { X, ChevronDown, CreditCard, Lock, Smartphone, Globe, Plus, Minus, Trash2 } from "lucide-react";

import CheckoutRecommendation from "./CheckoutRecommendation";

export default function CheckoutContent() {
    const { cart, updateQuantity, removeFromCart } = useShop();

    // Get a recommended product that's not already in cart
    const cartIds = cart.map(item => item.id);
    const recommendedProduct = products.find(p => !cartIds.includes(p.id)) || products[0];

    // Mock calculations
    const subtotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", "").replace(",", ""));
        return acc + price * item.quantity;
    }, 0);
    const shipping: number = 0; // Free
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Form state (visual mostly)
    // Form state (visual mostly)
    const [paymentTab, setPaymentTab] = useState<"pay_now" | "cod">("pay_now");
    const [paymentMethod, setPaymentMethod] = useState("card"); // internal to pay_now
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState<"visa" | "mastercard" | null>(null);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCardNumber(val);
        if (val.startsWith("4")) setCardType("visa");
        else if (/^5[1-5]/.test(val)) setCardType("mastercard");
        else setCardType(null);
    };

    return (
        <main className="min-h-screen bg-zinc-50 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                {/* LEFT COLUMN: Order Summary (on Desktop) - Mobile: usually hidden or folded, but here we stack it */}
                <div className="order-2 lg:order-1 space-y-8">

                    {/* Header for Mobile/Desktop context */}
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                        <Link href="/shop" className="hover:text-black">Shop</Link>
                        <span>/</span>
                        <span className="text-zinc-900 font-medium">Checkout</span>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-baseline gap-2 text-zinc-900">
                            Order Summary
                            <span className="text-sm font-normal text-zinc-400">{cart.length} items</span>
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-6 mb-8">
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
                            {cart.length === 0 && (
                                <div className="text-zinc-500 text-center py-8">Your cart is empty.</div>
                            )}
                        </div>

                        {/* Discount Code */}
                        <div className="flex gap-3 mb-8">
                            <div className="flex-1 bg-zinc-50 rounded-xl px-4 py-3 flex items-center border border-zinc-200">
                                <Smartphone size={18} className="text-zinc-400 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Discount code"
                                    className="bg-transparent w-full outline-none text-sm placeholder:text-zinc-400 text-zinc-900"
                                />
                            </div>
                            <button className="bg-white border border-zinc-200 text-zinc-900 font-bold px-6 rounded-xl hover:bg-zinc-50 transition-colors">
                                Add code
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 pt-6 border-t border-zinc-100 text-sm">
                            <div className="flex justify-between text-zinc-600">
                                <span>Subtotal</span>
                                <span className="text-zinc-900">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-zinc-600">
                                <span>Shipping</span>
                                <span className="text-zinc-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-zinc-600">
                                <span>Tax</span>
                                <span className="text-zinc-900">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-zinc-900 pt-4 border-t border-zinc-100 mt-4">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Item */}
                    {recommendedProduct && (
                        <CheckoutRecommendation product={recommendedProduct} />
                    )}
                </div>


                {/* RIGHT COLUMN: Payment Details */}
                <div className="order-1 lg:order-2">
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-zinc-200/50 border border-zinc-100">
                        {/* Payment Method Tabs */}
                        {/* Payment Method Tabs */}
                        <div className="bg-zinc-50 p-1 rounded-2xl flex mb-8">
                            <button
                                onClick={() => setPaymentTab("pay_now")}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${paymentTab === "pay_now" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
                            >
                                Pay Now
                            </button>
                            <button
                                onClick={() => setPaymentTab("cod")}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${paymentTab === "cod" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-900"}`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {/* Payment Icons */}
                        {/* Payment Icons (Only for Pay Now) */}
                        {paymentTab === "pay_now" && (
                            <div className="grid grid-cols-4 gap-3 mb-8">
                                <button
                                    onClick={() => setPaymentMethod("card")}
                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${paymentMethod === "card" ? "border-black bg-zinc-50 ring-1 ring-black" : "border-zinc-200 hover:border-zinc-300"}`}
                                >
                                    <CreditCard size={24} className={paymentMethod === "card" ? "text-black" : "text-zinc-400"} />
                                    <span className="text-xs font-medium text-zinc-900">Card</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("paypal")}
                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${paymentMethod === "paypal" ? "border-black bg-zinc-50 ring-1 ring-black" : "border-zinc-200 hover:border-zinc-300"}`}
                                >
                                    {/* PayPal Logo Image */}
                                    <div className="relative w-12 h-8">
                                        <Image
                                            src="/assets/images/Payment/paypal.png"
                                            alt="PayPal"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-900">PayPal</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all opacity-50 cursor-not-allowed">
                                    <span className="font-bold text-zinc-400 text-sm">GPay</span>
                                    <span className="text-xs font-medium text-zinc-400">Google Pay</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all opacity-50 cursor-not-allowed">
                                    <span className="font-bold text-zinc-400 text-sm">Pay</span>
                                    <span className="text-xs font-medium text-zinc-400">Apple Pay</span>
                                </button>
                            </div>
                        )}

                        <div className="mb-6 flex items-center justify-between text-xs text-zinc-500 px-1">
                            <div className="flex items-center gap-1">
                                <Lock size={12} />
                                Secure payment link
                            </div>
                            <a href="#" className="underline hover:text-black">Learn more</a>
                        </div>

                        {/* Form Fields */}
                        {/* Form Fields - Only for Pay Now */}
                        {paymentTab === "pay_now" ? (
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email address</label>
                                    <input type="email" defaultValue="jenny@example.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Card number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Card number"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-4 pr-16 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-mono text-zinc-900"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                                            {cardType === "visa" && (
                                                <div className="relative w-10 h-6">
                                                    <Image src="/assets/images/Payment/visa.png" alt="Visa" fill className="object-contain" />
                                                </div>
                                            )}
                                            {cardType === "mastercard" && (
                                                <div className="relative w-10 h-6">
                                                    <Image src="/assets/images/Payment/mastercard.png" alt="Mastercard" fill className="object-contain" />
                                                </div>
                                            )}
                                            {!cardType && (
                                                <>
                                                    <div className="relative w-8 h-5 opacity-40 grayscale">
                                                        <Image src="/assets/images/Payment/visa.png" alt="Visa" fill className="object-contain" />
                                                    </div>
                                                    <div className="relative w-8 h-5 opacity-40 grayscale">
                                                        <Image src="/assets/images/Payment/mastercard.png" alt="Mastercard" fill className="object-contain" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Expiration</label>
                                        <input type="text" placeholder="MM / YY" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">CVC</label>
                                        <input type="text" placeholder="123" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Cardholder name</label>
                                    <input type="text" defaultValue="Jenny Rosen" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Billing Address</label>
                                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden">
                                        <div className="px-4 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-100/50">
                                            <span className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                                                🇺🇸 United States
                                            </span>
                                            <ChevronDown size={14} className="text-zinc-400" />
                                        </div>
                                        <input type="text" defaultValue="27 Fredrick Ave Brothers" className="w-full bg-transparent px-4 py-3 outline-none text-sm text-zinc-900" />
                                        <div className="border-t border-zinc-200 px-4 py-3 flex justify-between items-center bg-white">
                                            <span className="text-sm text-zinc-900">California</span>
                                            <ChevronDown size={14} className="text-zinc-400" />
                                        </div>
                                        <div className="border-t border-zinc-200 grid grid-cols-2">
                                            <input type="text" defaultValue="Los Angeles" className="w-full bg-transparent px-4 py-3 outline-none text-sm border-r border-zinc-200 text-zinc-900" />
                                            <input type="text" defaultValue="94025" className="w-full bg-transparent px-4 py-3 outline-none text-sm text-zinc-900" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between items-center font-bold text-lg text-zinc-900">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button type="button" className="w-full bg-black text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg shadow-black/20 active:scale-[0.99]">
                                    Pay ${total.toFixed(2)}
                                    <Lock size={16} />
                                </button>

                                <div className="flex justify-center gap-6 text-[10px] text-zinc-400 uppercase tracking-widest font-medium pt-2">
                                    <span>Powered by Supplier</span>
                                    <span>Terms</span>
                                    <span>Privacy</span>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-6">
                                <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-center space-y-4">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                                        <Globe size={32} className="text-zinc-900" />
                                    </div>
                                    <h3 className="font-bold text-zinc-900">Cash on Delivery</h3>
                                    <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                                        Pay in cash when your order is delivered. Please maximize the exact amount to ensure a smooth transition.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Delivery Address</label>
                                    <input type="text" defaultValue="27 Fredrick Ave, Los Angeles, CA" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900" />
                                </div>

                                <div className="pt-4 flex justify-between items-center font-bold text-lg text-zinc-900">
                                    <span>Total to Pay</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>

                                <button type="button" className="w-full bg-black text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg shadow-black/20 active:scale-[0.99]">
                                    Place Order (${total.toFixed(2)})
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
