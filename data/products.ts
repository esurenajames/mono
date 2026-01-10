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
    {
        id: 1,
        name: "MONO ONE",
        description: "Premium wireless headphones with ANC",
        price: "$560",
        image: "/assets/images/Shop/Mono-one-shop.png",
        images: [
            "/assets/images/Recommendations/woman-earbuds-1.png",
            "/assets/images/Recommendations/man-headphones.png",
            "/assets/images/Recommendations/woman-earbuds-2.png"
        ],
        releaseDate: "2025-11-15",
        featuredDescription: "Immerse yourself in pure audio bliss with active noise cancellation that adapts to your environment.",
        category: "Headphones",
        featured: true
    },
    {
        id: 2,
        name: "MONO PRO",
        description: "Studio-grade audio for professionals",
        price: "$720",
        image: "/assets/images/Shop/Mono-one-shop.png",
        images: [
            "/assets/images/Recommendations/man-dark-earbuds.png",
            "/assets/images/Recommendations/man-headphones.png",
            "/assets/images/Recommendations/woman-earbuds-1.png"
        ],
        releaseDate: "2023-09-01",
        featuredDescription: "Designed for audio professionals, the MONO PRO delivers flat response and pristine clarity for mixing and mastering.",
        category: "Headphones",
        featured: false
    },
    {
        id: 3,
        name: "MONO LITE",
        description: "Lightweight comfort for all-day use",
        price: "$320",
        image: "/assets/images/Recommendations/woman-earbuds-1.png",
        images: [
            "/assets/images/Recommendations/woman-earbuds-2.png",
            "/assets/images/Recommendations/woman-earbuds-1.png",
            "/assets/images/Recommendations/man-dark-earbuds.png"
        ],
        releaseDate: "2023-06-20",
        featuredDescription: "Feather-light construction meets all-day battery life, making the MONO LITE your perfect daily commute companion.",
        category: "Earbuds",
        featured: false
    },
    {
        id: 4,
        name: "MONO SPORT",
        description: "Sweat-resistant for active lifestyles",
        price: "$450",
        image: "/assets/images/Recommendations/man-dark-earbuds.png",
        images: [
            "/assets/images/Recommendations/man-headphones.png",
            "/assets/images/Recommendations/man-dark-earbuds.png",
            "/assets/images/Recommendations/woman-earbuds-2.png"
        ],
        releaseDate: "2024-01-10",
        featuredDescription: "Built to withstand your toughest workouts with IPX5 sweat resistance and secure-fit ergonomics.",
        category: "Earbuds",
        featured: false
    }
];

export const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
};
