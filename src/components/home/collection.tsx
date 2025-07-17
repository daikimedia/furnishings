"use client";
import React from "react";
import Link from "next/link";
import mockData from "@/data/mockData";

type Category = {
    name: string;
    image: string;
    slug: string;
};

const getUniqueCategories = (): Category[] => {
    const categoryMap = new Map<string, Category>();

    mockData.products.forEach(({ product }) => {
        // Check if product and product.category exist
        if (product && product.category) {
            if (!categoryMap.has(product.category)) {
                categoryMap.set(product.category, {
                    name: product.category,
                    image: product.images?.main_image || '/images/placeholder.jpg',
                    slug: product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
                });
            }
        }
    });

    return Array.from(categoryMap.values());
};

export default function FloorCategories() {
    const categories = getUniqueCategories();

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Our Floor Collections
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our premium flooring solutions designed for Malaysian homes and commercial spaces.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-300 transition-colors duration-300">
                                    {category.name}
                                </h3>
                                <div className="flex items-center text-orange-300 font-medium">
                                    <span className="text-sm">Explore Collection</span>
                                    <svg
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Decorative border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
                    >
                        View All Products
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}