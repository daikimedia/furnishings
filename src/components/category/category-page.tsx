"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import mockData from "@/data/mockData"; // Adjust path as needed
import Link from "next/link";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    // Convert slug back to category name
    const getCategoryFromSlug = (slug: string) => {
        return mockData.products.find(product =>
            product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === slug
        )?.category;
    };

    const categoryName = typeof slug === "string" ? getCategoryFromSlug(slug) : undefined;

    // Filter products by category
    const categoryProducts = mockData.products.filter(
        product => product.category === categoryName
    );

    if (!categoryName || categoryProducts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
                            <p className="text-gray-600 mt-1">{categoryProducts.length} products found</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {categoryProducts.map((product) => (
                        <div key={product.id} className="group">
                            <Link
                                href={`/shop/${product.id}`}
                                className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                    </p>
                                </div>

                                {/* Decorative Border */}
                                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}