export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    images: string[];
    releaseDate: string;
    featuredDescription: string;
    category: "Headphones" | "Earbuds" | "Accessories";
    featured: boolean;
}

export const products: Product[] = [
    // HEADPHONES
    {
        id: 5,
        name: "MONO SPACE",
        description: "The sound of absolute silence",
        price: "$699",
        image: "/assets/images/Shop/Headphones/Mono Space/mono-space.png",
        images: [
            "/assets/images/Shop/Headphones/Mono Space/mono-space.png",
            "/assets/images/Shop/Headphones/Mono Space/mono-space-1.png",
            "/assets/images/Shop/Headphones/Mono Space/mono-space-2.png",
            "/assets/images/Shop/Headphones/Mono Space/mono-space-3.png"
        ],
        releaseDate: "2024-02-01",
        featuredDescription: "Crafted in pristine white with our most advanced noise-canceling technology. Mono Space delivers an ethereal audio experience wrapped in minimalistic luxury.",
        category: "Headphones",
        featured: true
    },
    {
        id: 2,
        name: "MONO GO",
        description: "Uncompromised portable audio.",
        price: "$499",
        image: "/assets/images/Shop/Headphones/Mono Go/mono-go.png",
        images: [
            "/assets/images/Shop/Headphones/Mono Go/mono-go.png",
            "/assets/images/Shop/Headphones/Mono Go/mono-go-1.png",
            "/assets/images/Shop/Headphones/Mono Go/mono-go-2.png",
            "/assets/images/Shop/Headphones/Mono Go/mono-go-3.png"
        ],
        releaseDate: "2024-01-20",
        featuredDescription: "Designed for the sophisticated traveler. Finished in ceramic white, Mono Go combines high-fidelity sound with an ultra-portable form factor.",
        category: "Headphones",
        featured: false
    },
    // EARBUDS
    {
        id: 1,
        name: "MONO ONE",
        description: "Studio-grade wireless perfection.",
        price: "$599",
        image: "/assets/images/Shop/Earbuds/Mono One/mono-one.png",
        images: [
            "/assets/images/Shop/Earbuds/Mono One/mono-one.png",
            "/assets/images/Shop/Earbuds/Mono One/mono-one-1.jpeg",
            "/assets/images/Shop/Earbuds/Mono One/mono-one-2.jpeg",
            "/assets/images/Shop/Earbuds/Mono One/mono-one-3.jpeg"
        ],
        releaseDate: "2025-11-15",
        featuredDescription: "Encased in an alabaster finish, Mono One resets the standard for wireless audio. Immerse yourself in rich, expansive soundstages.",
        category: "Earbuds",
        featured: true
    },
    {
        id: 3,
        name: "MONO LITE",
        description: "Essential luxury for everyday.",
        price: "$299",
        image: "/assets/images/Shop/Earbuds/Mono Lite/mono-lite.png",
        images: [
            "/assets/images/Shop/Earbuds/Mono Lite/mono-lite.png",
            "/assets/images/Shop/Earbuds/Mono Lite/mono-lite-1.jpeg",
            "/assets/images/Shop/Earbuds/Mono Lite/mono-llite-2.png",
            "/assets/images/Shop/Earbuds/Mono Lite/mono-lite-3.png"
        ],
        releaseDate: "2023-06-20",
        featuredDescription: "Feather-light soft white construction meets all-day battery life. Mono Lite offers premium aesthetics and performance in our most accessible form.",
        category: "Earbuds",
        featured: false
    },
    {
        id: 4,
        name: "MONO SPORT",
        description: "Elite performance, zero distractions.",
        price: "$450",
        image: "/assets/images/Shop/Earbuds/Mono Sports/mono-sports.png",
        images: [
            "/assets/images/Shop/Earbuds/Mono Sports/mono-sports.png",
            "/assets/images/Shop/Earbuds/Mono Sports/mono-sports-1.png",
            "/assets/images/Shop/Earbuds/Mono Sports/mono-sports-2.png",
            "/assets/images/Shop/Earbuds/Mono Sports/mono-sports-3.png"
        ],
        releaseDate: "2024-01-10",
        featuredDescription: "Engineered for excellence in glacial white. IPX5 sweat resistance meets audiophile-quality sound for the discerning athlete.",
        category: "Earbuds",
        featured: false
    }
];

export const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
};
