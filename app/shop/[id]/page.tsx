import { Suspense } from "react";
import { products } from "@/data/products";
import ProductDetailContent from "../components/ProductDetailContent";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Generate static params if we want SSG (optional, but good practice for finite products)
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <Link href="/headphones" className="text-zinc-500 hover:text-black underline">
                    Back to Headphones
                </Link>
            </div>
        );
    }

    return (
        <Suspense fallback={<div className="min-h-screen pt-32 px-6 flex justify-center"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductDetailContent product={product} allProducts={products} />
        </Suspense>
    );
}
