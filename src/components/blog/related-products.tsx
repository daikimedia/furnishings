'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface ApiProduct {
    id: number;
    sku: string;
    name: string;
    slug: string;
    brand: string;
    status: string;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    images: {
        main_image: string;
        gallery: string[];
        thumbnails: string[];
        alt_texts: string[];
    };
    description: {
        short: string;
        long: string;
    };
    purchase_price: number | null;
    retail_price: number | null;
    quantity: number;
}

interface ProductsApiResponse {
    success: boolean;
    data: ApiProduct[];
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default function RelatedProducts() {
    const [products, setProducts] = useState<ApiProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const result: ProductsApiResponse = await response.json();

                if (result.success && result.data) {
                    const shuffledProducts = shuffleArray(result.data);
                    setProducts(shuffledProducts.slice(0, 4));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-12">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 h-56 rounded-2xl mb-4"></div>
                                <div className="bg-gray-200 h-6 rounded mb-2"></div>
                                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="py-12 px-6 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        let imageUrl = product.images.main_image || '';
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            imageUrl = `https://cms.furnishings.daikimedia.com${imageUrl}`;
                        }

                        const categorySlug = product.category?.slug || 'uncategorized';

                        return (
                            <Link
                                key={product.id}
                                href={`/shop/${categorySlug}/${product.slug}`}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden bg-orange-100">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {product.description.short || product.description.long || "Explore this amazing product."}
                                    </p>

                                    <div className="flex items-center text-orange-500 font-medium">
                                        <span className="text-sm">View Product</span>
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
