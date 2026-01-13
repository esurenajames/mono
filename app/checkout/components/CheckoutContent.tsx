"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useShop, CartItem } from "@/context/ShopContext";
import { products } from "@/data/products";
import { X, ChevronDown, CreditCard, Lock, Smartphone, Globe, Plus, Minus, Trash2, Check } from "lucide-react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import CheckoutRecommendation from "./CheckoutRecommendation";

// --- Validation Schemas ---

const payNowSchema = z.object({
    email: z.string().email("Invalid email address"),
    cardNumber: z.string().min(16, "Card number must be 16 characters"),
    expiration: z.string().min(5, "Invalid date"),
    cvc: z.string().min(3, "Invalid CVC"),
    cardholderName: z.string().min(1, "Name is required"),
    billingAddress: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    saveAddress: z.boolean().optional(),
});

const codSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    saveAddress: z.boolean().optional(),
});

type PayNowFormData = z.infer<typeof payNowSchema>;
type CodFormData = z.infer<typeof codSchema>;

// --- Helper Functions ---
const saveAddressToStorage = (data: Partial<PayNowFormData> | Partial<CodFormData>) => {
    // Save common fields
    const commonData = {
        email: data.email,
        address: (data as any).billingAddress || (data as any).address,
        city: data.city,
        state: data.state,
        zip: (data as any).zip || (data as any).postalCode,
        country: data.country,
        firstName: (data as any).firstName, // only for COD but we can save it
        lastName: (data as any).lastName,   // only for COD
        savedAt: new Date().toISOString()
    };
    localStorage.setItem('checkout_saved_address', JSON.stringify(commonData));
};

const getAddressFromStorage = () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('checkout_saved_address');
    return data ? JSON.parse(data) : null;
};

// --- Helper Components ---

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    register: UseFormRegisterReturn;
}

const FormInput = ({ label, error, register, ...props }: FormInputProps) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${error ? "text-red-500" : "text-zinc-500"}`}>
                {label}
            </label>
            {error && <span className="text-xs text-red-500 font-medium whitespace-nowrap">{error}</span>}
        </div>
        <input
            {...register}
            {...props}
            className={`w-full bg-zinc-50 border rounded-xl px-4 py-3 outline-none transition-all text-zinc-900 ${error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-zinc-200 focus:border-black focus:ring-1 focus:ring-black"
                }`}
        />
    </div>
);

// --- Sub-Forms ---

const PayNowForm = ({ onSuccess, total }: { onSuccess: () => void, total: number }) => {
    const [cardType, setCardType] = useState<"visa" | "mastercard" | "amex" | null>(null);

    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<PayNowFormData>({
        resolver: zodResolver(payNowSchema),
        mode: "onChange",
        defaultValues: {
            email: "jenny@example.com",
            cardholderName: "Jenny Rosen",
            billingAddress: "123 Rizal Ave",
            city: "Quezon City",
            zip: "1100",
            state: "Metro Manila",
            country: "Philippines",
            saveAddress: true
        }
    });

    useEffect(() => {
        const savedData = getAddressFromStorage();
        if (savedData) {
            if (savedData.email) setValue("email", savedData.email);
            if (savedData.address) setValue("billingAddress", savedData.address);
            if (savedData.city) setValue("city", savedData.city);
            if (savedData.state) setValue("state", savedData.state);
            if (savedData.zip) setValue("zip", savedData.zip);
            if (savedData.country) setValue("country", savedData.country);
        }
    }, [setValue]);

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
        if (val.length > 16) val = val.slice(0, 16);

        // Add spaces for formatting
        const formattedVal = val.match(/.{1,4}/g)?.join(' ') || val;

        setValue("cardNumber", formattedVal, { shouldValidate: true });

        if (val.startsWith("4")) setCardType("visa");
        else if (/^5[1-5]/.test(val)) setCardType("mastercard");
        else if (/^3[47]/.test(val)) setCardType("amex");
        else setCardType(null);
    };

    const onSubmit = (data: PayNowFormData) => {
        if (data.saveAddress) {
            saveAddressToStorage(data);
        }
        onSuccess();
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput label="Email address" register={register("email")} error={errors.email?.message} placeholder="Enter email" />

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${errors.cardNumber ? "text-red-500" : "text-zinc-500"}`}>Card number</label>
                    {errors.cardNumber && <span className="text-xs text-red-500 font-medium whitespace-nowrap">{errors.cardNumber.message}</span>}
                </div>
                <div className="relative">
                    <input
                        {...register("cardNumber")}
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        maxLength={19}
                        onChange={handleCardNumberChange}
                        className={`w-full bg-zinc-50 border rounded-xl pl-4 pr-16 py-3 outline-none transition-all font-mono text-zinc-900 ${errors.cardNumber
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-zinc-200 focus:border-black focus:ring-1 focus:ring-black"
                            }`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                        {cardType === "visa" && <div className="relative w-10 h-6"><Image src="/assets/images/Icon/visa.svg" alt="Visa" fill className="object-contain" /></div>}
                        {cardType === "mastercard" && <div className="relative w-10 h-6"><Image src="/assets/images/Icon/mastercard.svg" alt="Mastercard" fill className="object-contain" /></div>}
                        {cardType === "amex" && <div className="relative w-10 h-6"><Image src="/assets/images/Icon/american-express.svg" alt="Amex" fill className="object-contain" /></div>}
                        {!cardType && (
                            <>
                                <div className="relative w-8 h-5 opacity-40 grayscale"><Image src="/assets/images/Icon/visa.svg" alt="Visa" fill className="object-contain" /></div>
                                <div className="relative w-8 h-5 opacity-40 grayscale"><Image src="/assets/images/Icon/mastercard.svg" alt="Mastercard" fill className="object-contain" /></div>
                                <div className="relative w-8 h-5 opacity-40 grayscale"><Image src="/assets/images/Icon/american-express.svg" alt="Amex" fill className="object-contain" /></div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormInput label="Expiration" register={register("expiration")} error={errors.expiration?.message} placeholder="MM / YY" maxLength={5} />
                <FormInput label="CVC" register={register("cvc")} error={errors.cvc?.message} placeholder="123" maxLength={3} />
            </div>

            <FormInput label="Cardholder name" register={register("cardholderName")} error={errors.cardholderName?.message} />

            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Billing Address</label>
                <div className={`bg-zinc-50 border rounded-xl overflow-hidden ${errors.billingAddress || errors.city || errors.zip || errors.state ? "border-red-500" : "border-zinc-200"}`}>
                    <div className="relative border-b border-zinc-200 bg-zinc-100/50">
                        <select
                            {...register("country")}
                            className="w-full bg-transparent px-4 py-3 outline-none text-sm font-medium text-zinc-900 appearance-none z-10 relative cursor-pointer"
                        >
                            <option value="United States">🇺🇸 United States</option>
                            <option value="Philippines">🇵🇭 Philippines</option>
                            <option value="Canada">🇨🇦 Canada</option>
                            <option value="United Kingdom">🇬🇧 United Kingdom</option>
                            <option value="Australia">🇦🇺 Australia</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                    <input {...register("billingAddress")} placeholder="Street Address" className="w-full bg-transparent px-4 py-3 outline-none text-sm text-zinc-900 placeholder:text-zinc-600" />
                    <div className="border-t border-zinc-200 px-4 py-3 flex justify-between items-center bg-white">
                        <input {...register("state")} placeholder="State" className="w-full bg-transparent outline-none text-sm text-zinc-900" />
                    </div>
                    <div className="border-t border-zinc-200 grid grid-cols-2">
                        <input {...register("city")} placeholder="City" className="w-full bg-transparent px-4 py-3 outline-none text-sm border-r border-zinc-200 text-zinc-900" />
                        <input {...register("zip")} placeholder="ZIP" className="w-full bg-transparent px-4 py-3 outline-none text-sm text-zinc-900" />
                    </div>
                </div>
                {(errors.billingAddress || errors.city || errors.zip || errors.state) && <span className="text-xs text-red-500 font-medium ml-1">Incomplete address details</span>}
            </div>

            {/* Save Address Checkbox */}
            <div className="flex items-center gap-3 py-2">
                <input
                    type="checkbox"
                    id="saveAddressPayNow"
                    {...register("saveAddress")}
                    className="w-5 h-5 rounded border-zinc-300 text-black focus:ring-black accent-black"
                />
                <label htmlFor="saveAddressPayNow" className="text-sm font-medium text-zinc-600 cursor-pointer select-none">
                    Save billing address for next time
                </label>
            </div>

            <div className="pt-4 flex justify-between items-center font-bold text-lg text-zinc-900">
                <span className="text-base md:text-lg">Total</span>
                <span className="text-base md:text-lg">${total.toFixed(2)}</span>
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className={`w-full h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] ${isValid ? "bg-black text-white hover:bg-zinc-800 shadow-black/20" : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"}`}
            >
                Pay ${total.toFixed(2)}
                <Lock size={16} />
            </button>

            <div className="flex justify-center gap-6 text-[10px] text-zinc-400 uppercase tracking-widest font-medium pt-2">
                <span>Powered by Stripe</span>
                <span>Terms</span>
                <span>Privacy</span>
            </div>
        </form>
    );
};

const CodForm = ({ onSuccess, total }: { onSuccess: () => void, total: number }) => {
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<CodFormData>({
        resolver: zodResolver(codSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "Jenny",
            lastName: "Rosen",
            email: "jenny@example.com",
            address: "123 Rizal Ave",
            city: "Quezon City",
            postalCode: "1100",
            state: "Metro Manila",
            country: "Philippines",
            saveAddress: true
        }
    });

    useEffect(() => {
        const savedData = getAddressFromStorage();
        if (savedData) {
            if (savedData.email) setValue("email", savedData.email);
            if (savedData.firstName) setValue("firstName", savedData.firstName);
            if (savedData.lastName) setValue("lastName", savedData.lastName);
            if (savedData.address) setValue("address", savedData.address);
            if (savedData.city) setValue("city", savedData.city);
            if (savedData.zip) setValue("postalCode", savedData.zip);
            if (savedData.state) setValue("state", savedData.state);
            if (savedData.country) setValue("country", savedData.country);
        }
    }, [setValue]);

    const onSubmit = (data: CodFormData) => {
        if (data.saveAddress) {
            saveAddressToStorage(data);
        }
        onSuccess();
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Globe size={32} className="text-zinc-900" />
                </div>
                <h3 className="font-bold text-zinc-900">Cash on Delivery</h3>
                <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                    Pay in cash when your order is delivered. Please maximize the exact amount to ensure a smooth transition.
                </p>
            </div>

            <FormInput label="Email address" register={register("email")} error={errors.email?.message} placeholder="Enter email" />

            <div className="grid grid-cols-2 gap-4">
                <FormInput label="First Name" register={register("firstName")} error={errors.firstName?.message} placeholder="First name" />
                <FormInput label="Last Name" register={register("lastName")} error={errors.lastName?.message} placeholder="Last name" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Country</label>
                <div className="relative">
                    <select
                        {...register("country")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-zinc-900 appearance-none"
                    >
                        <option value="United States">United States</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
            </div>

            <FormInput label="Address" register={register("address")} error={errors.address?.message} placeholder="Street address" />

            <div className="grid grid-cols-2 gap-4">
                <FormInput label="City" register={register("city")} error={errors.city?.message} placeholder="City" />
                <FormInput label="Postal Code" register={register("postalCode")} error={errors.postalCode?.message} placeholder="Postal code" />
            </div>

            <FormInput label="State / Province" register={register("state")} error={errors.state?.message} placeholder="State or Province" />

            {/* Save Address Checkbox */}
            <div className="flex items-center gap-3 py-2">
                <input
                    type="checkbox"
                    id="saveAddressCod"
                    {...register("saveAddress")}
                    className="w-5 h-5 rounded border-zinc-300 text-black focus:ring-black accent-black"
                />
                <label htmlFor="saveAddressCod" className="text-sm font-medium text-zinc-600 cursor-pointer select-none">
                    Save billing address for next time
                </label>
            </div>

            <div className="pt-4 flex justify-between items-center font-bold text-lg text-zinc-900">
                <span className="text-base md:text-lg">Total to Pay</span>
                <span className="text-base md:text-lg">${total.toFixed(2)}</span>
            </div>

            <button
                type="submit"
                disabled={!isValid}
                className={`w-full h-14 text-base md:text-lg rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] ${isValid ? "bg-black text-white hover:bg-zinc-800 shadow-black/20" : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"}`}
            >
                Place Order (${total.toFixed(2)})
            </button>
        </form>
    );
};


export default function CheckoutContent() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useShop();

    // Get a recommended product that's not already in cart
    const cartIds = cart.map(item => item.id);
    const recommendedProduct = products.find(p => !cartIds.includes(p.id)) || products[0];

    // Mock calculations
    const [discountCode, setDiscountCode] = useState("");
    const [discountApplied, setDiscountApplied] = useState(0); // 0.10 for 10%
    const [discountError, setDiscountError] = useState("");
    const [showPromoDialog, setShowPromoDialog] = useState(false);

    const subtotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", "").replace(",", ""));
        return acc + price * item.quantity;
    }, 0);
    const shipping: number = 0; // Free
    const discountAmount = subtotal * discountApplied;
    const tax = (subtotal - discountAmount) * 0.08;
    const total = subtotal - discountAmount + shipping + tax;

    // Form state (visual mostly)
    const [paymentTab, setPaymentTab] = useState<"pay_now" | "cod">("pay_now");
    const [paymentMethod, setPaymentMethod] = useState("card"); // internal to pay_now
    const [isSuccess, setIsSuccess] = useState(false);
    const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number } | null>(null);

    const handleSuccess = () => {
        setLastOrder({ items: [...cart], total });
        clearCart();
        setIsSuccess(true);
    };

    const handleApplyDiscount = () => {
        if (discountCode.toUpperCase() === "MONO2026") {
            setDiscountApplied(0.10);
            setDiscountError("");
            setShowPromoDialog(false);
        } else {
            setDiscountApplied(0);
            setDiscountError("Invalid code");
            setShowPromoDialog(true);
        }
    };

    const closePromoDialog = () => {
        setShowPromoDialog(false);
    };

    return (
        <main className="min-h-screen bg-zinc-50 pt-20 md:pt-24 pb-8 md:pb-12 px-4 md:px-8 relative">
            {showPromoDialog && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
                    <div className="bg-white shadow-2xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-300 relative">
                        <button onClick={closePromoDialog} className="absolute right-4 top-4 text-zinc-400 hover:text-black transition-colors z-10">
                            <X size={20} />
                        </button>

                        {/* Receipt Header */}
                        <div className="p-8 text-center pb-6 border-b border-dashed border-zinc-200">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <Smartphone size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-xl font-bold text-black uppercase tracking-widest">Just for you</h2>
                            <p className="text-zinc-400 text-xs mt-2 uppercase tracking-wide">Exclusive Offer</p>
                        </div>

                        {/* Receipt Body */}
                        <div className="px-8 py-8 bg-white text-center">
                            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                That code didn't work, but we have something better. Use <span className="font-bold text-black">MONO2026</span> for a <span className="font-bold text-black">10% discount</span>.
                            </p>

                            <div className="p-4 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg mb-6">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Your Code</p>
                                <p className="text-xl font-mono font-bold text-black tracking-widest">MONO2026</p>
                            </div>

                            <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Valid only for today</p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-zinc-50 border-t border-zinc-100">
                            <button
                                onClick={() => {
                                    setDiscountCode("MONO2026");
                                    closePromoDialog();
                                }}
                                className="block w-full bg-black text-white px-6 py-4 text-xs font-bold hover:bg-zinc-800 transition-all text-center uppercase tracking-[0.2em] shadow-lg shadow-black/10"
                            >
                                Apply Discount
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSuccess && lastOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
                    <div className="bg-white shadow-2xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-300 relative">
                        {/* Receipt Header */}
                        <div className="p-8 text-center pb-6 border-b border-dashed border-zinc-200">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <h2 className="text-xl font-bold text-black uppercase tracking-widest">Receipt</h2>
                            <p className="text-zinc-400 text-xs mt-2 uppercase tracking-wide">Thank you for your order</p>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wide mt-2">A confirmation email will be sent shortly</p>
                        </div>

                        {/* Receipt Body */}
                        <div className="px-8 py-6 bg-white">
                            {/* Items List */}
                            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                {lastOrder.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-sm group">
                                        <div className="flex-1 pr-4">
                                            <span className="font-bold text-black block text-xs uppercase tracking-wide">{item.name}</span>
                                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block mt-0.5">Qty {item.quantity}</span>
                                        </div>
                                        <span className="font-mono font-medium text-black text-xs">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t-2 border-dashed border-zinc-200 my-6"></div>

                            {/* Totals */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wide">
                                    <span>Subtotal</span>
                                    <span className="font-mono">${lastOrder.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wide">
                                    <span>Shipping</span>
                                    <span className="font-mono">FREE</span>
                                </div>
                                <div className="flex justify-between items-end pt-4 mt-2 border-t border-zinc-100">
                                    <span className="text-sm font-bold text-black uppercase tracking-widest">Total Paid</span>
                                    <span className="text-xl font-bold font-mono text-black">${lastOrder.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-zinc-50 border-t border-zinc-100 space-y-3">
                            <Link href="/shop" className="block w-full bg-black text-white px-6 py-4 text-xs font-bold hover:bg-zinc-800 transition-all text-center uppercase tracking-[0.2em]">
                                Continue Shopping
                            </Link>
                            <div className="text-center">
                                <Link href="/" className="inline-block text-zinc-400 text-[10px] font-bold hover:text-black transition-colors uppercase tracking-[0.15em] hover:underline decoration-zinc-300 underline-offset-4">
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                {/* LEFT COLUMN: Order Summary */}
                <div className="order-2 lg:order-1 space-y-8">

                    {/* Header */}
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                        <Link href="/shop" className="hover:text-black">Shop</Link>
                        <span>/</span>
                        <span className="text-zinc-900 font-medium">Checkout</span>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-zinc-100">
                        <h2 className="text-lg md:text-2xl font-bold mb-6 flex items-baseline gap-2 text-zinc-900">
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
                        <div>
                            <div className="flex gap-1">
                                <div className={`flex-1 bg-zinc-50 rounded-xl px-4 py-3 flex items-center border transition-all ${discountError ? "border-red-500 bg-red-50" : "border-zinc-200"}`}>
                                    <Smartphone size={18} className={`mr-3 ${discountError ? "text-red-500" : "text-zinc-400"}`} />
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => {
                                            setDiscountCode(e.target.value);
                                            if (discountError) setDiscountError("");
                                        }}
                                        placeholder="Discount code"
                                        className={`bg-transparent w-full outline-none text-sm placeholder:text-zinc-400 text-zinc-900 ${discountError ? "placeholder:text-red-400 text-red-900" : ""}`}
                                    />
                                </div>
                                <button
                                    onClick={handleApplyDiscount}
                                    className="bg-white border border-zinc-200 text-zinc-900 font-bold px-6 md:px-8 text-sm md:text-sm rounded-xl hover:bg-zinc-50 transition-colors"
                                >
                                    Add Code
                                </button>
                            </div>
                            {discountError && (
                                <p className="text-xs text-red-500 font-medium mt-2 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">
                                    {discountError}
                                </p>
                            )}
                            {discountApplied > 0 && (
                                <p className="text-xs text-green-600 font-medium mt-2 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">
                                    Code MONO2026 applied! (10% off)
                                </p>
                            )}
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 pt-6 border-t border-zinc-100 text-sm mt-8">
                            <div className="flex justify-between text-zinc-600">
                                <span>Subtotal</span>
                                <span className="text-zinc-900">${subtotal.toFixed(2)}</span>
                            </div>
                            {discountApplied > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount (10%)</span>
                                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-zinc-600">
                                <span>Shipping</span>
                                <span className="text-zinc-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-zinc-600">
                                <span>Tax</span>
                                <span className="text-zinc-900">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-zinc-900 pt-4 border-t border-zinc-100 mt-4">
                                <span className="text-lg md:text-xl">Total</span>
                                <span className="text-lg md:text-xl">${total.toFixed(2)}</span>
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
                        <div className="bg-white p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 flex mb-8">
                            <button
                                onClick={() => setPaymentTab("pay_now")}
                                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${paymentTab === "pay_now" ? "bg-black text-white shadow-lg shadow-black/20" : "text-zinc-500 hover:text-zinc-900"}`}
                            >
                                Pay Now
                            </button>
                            <button
                                onClick={() => setPaymentTab("cod")}
                                className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${paymentTab === "cod" ? "bg-black text-white shadow-lg shadow-black/20" : "text-zinc-500 hover:text-zinc-900"}`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {/* Payment Icons (Only for Pay Now) */}
                        {paymentTab === "pay_now" && (
                            <div className="grid grid-cols-4 gap-3 mb-8">
                                <button
                                    onClick={() => setPaymentMethod("card")}
                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${paymentMethod === "card" ? "border-black bg-zinc-50 ring-1 ring-black" : "border-zinc-200 hover:border-zinc-300"}`}
                                >
                                    <div className="relative w-8 h-8">
                                        <Image src="/assets/images/Icon/credit-card.svg" alt="Card" fill className="object-contain" />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-900">Card</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all opacity-50 cursor-not-allowed">
                                    <div className="relative w-8 h-8 opacity-60 grayscale">
                                        <Image src="/assets/images/Icon/paypal.svg" alt="PayPal" fill className="object-contain" />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-900">PayPal</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all opacity-50 cursor-not-allowed">
                                    <div className="relative w-8 h-8 opacity-60 grayscale">
                                        <Image src="/assets/images/Icon/google-pay.svg" alt="Google Pay" fill className="object-contain" />
                                    </div>
                                    <span className="text-xs font-medium text-zinc-400">Google Pay</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 py-4 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-all opacity-50 cursor-not-allowed">
                                    <div className="relative w-8 h-8 opacity-60 grayscale">
                                        <Image src="/assets/images/Icon/apple-pay.svg" alt="Apple Pay" fill className="object-contain" />
                                    </div>
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

                        {/* Validated Forms */}
                        {paymentTab === "pay_now" ? (
                            <PayNowForm onSuccess={handleSuccess} total={total} />
                        ) : (
                            <CodForm onSuccess={handleSuccess} total={total} />
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
