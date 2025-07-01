"use client";
import React from "react";
import { useRouter } from "next/navigation";
import mockData from "@/data/mockData"; // Adjust path as needed

export default function FloorCategories() {
    const router = useRouter();

    // Extract unique categories from mock data
    const getUniqueCategories = () => {
        const categoryMap = new Map();

        mockData.products.forEach(product => {
            if (!categoryMap.has(product.category)) {
                categoryMap.set(product.category, {
                    name: product.category,
                    image: product.image,
                    slug: product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
                });
            }
        });

        return Array.from(categoryMap.values());
    };

    const categories = getUniqueCategories();

    const handleCategoryClick = (slug: string) => {
        router.push(`/category/${slug}`);
    };

    return (
        <div id="flooring" className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-semibold text-center text-black mb-3">
                        Our Flooring Categories
                    </h2>
                    <p className="text-gray-600 text-center text-xl max-w-2xl mx-auto my-10 mb-12">
                        Discover our premium collection of flooring solutions designed to transform your space
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div key={index} className="group">
                            <div
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                                onClick={() => handleCategoryClick(category.slug)}
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 text-base mb-4">
                                        High-quality {category.name.toLowerCase()} solutions for your home and office spaces.
                                    </p>

                                    <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-600 transition-colors duration-300">
                                        <span className="text-sm font-semibold">Explore Options</span>
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
                                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}