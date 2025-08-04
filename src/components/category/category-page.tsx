"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import vinylSheetFlooringData from "@/data/vinylSheetFlooringData";
import Link from "next/link";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    // Convert slug back to category name
    const getCategoryFromSlug = (slug: string) => {
        return vinylSheetFlooringData.products.find(item =>
            item.product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === slug
        )?.product.category;
    };

    const categoryName = typeof slug === "string" ? getCategoryFromSlug(slug) : undefined;

    // Filter products by category
    const categoryProducts = vinylSheetFlooringData.products.filter(
        item => item.product.category === categoryName
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
                    {categoryProducts.map((item) => {
                        const product = item.product;
                        return (
                            <div key={product.id} className="group">
                                <Link
                                    href={`/shop/${product.slug}`}
                                    className="block bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-56 overflow-hidden bg-orange-200">
                                        <img
                                            src={product.images?.main_image || '/images/placeholder.jpg'}
                                            alt={product.images?.alt_texts?.[0] || product.name}
                                            className="w-full h-full object-cover p-4"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {product.description.short || product.description.long || "Premium flooring solution for modern spaces"}
                                        </p>

                                        {/* View Product Button */}
                                        <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg shadow hover:bg-orange-500 transition-colors duration-300">
                                            View Product
                                        </span>
                                    </div>

                                    {/* Bottom Hover Bar */}
                                    <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                </Link>
                            </div>

                        );
                    })}
                </div>
            </div>
        </div>
    );
}