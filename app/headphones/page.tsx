import { getProductsByCategory } from "@/data/products";
import HeadphonesContent from "./components/HeadphonesContent";

export default function HeadphonesPage() {
    const headphones = getProductsByCategory("Headphones");

    return <HeadphonesContent products={headphones} />;
}
