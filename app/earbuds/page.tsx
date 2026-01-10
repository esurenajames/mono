import { getProductsByCategory } from "@/data/products";
import EarbudsContent from "./components/EarbudsContent";

export default function EarbudsPage() {
    const earbuds = getProductsByCategory("Earbuds");

    return <EarbudsContent products={earbuds} />;
}
