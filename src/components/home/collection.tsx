"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SquareLoader from "../common/loader";

interface ApiCategory {
    id: number
    name: string
    slug: string
    products_count: number
    image: string
}

interface CategoriesApiResponse {
    success: boolean
    data: ApiCategory[]
}

type Category = {
    name: string;
    image: string;
    slug: string;
    products_count: number;
};

export default function FloorCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result: CategoriesApiResponse = await response.json();

                console.log(result);

                if (result.success) {
                    // Transform API categories to component Category type with full image URL
                    const transformedCategories: Category[] = result.data.map((apiCategory) => ({
                        name: apiCategory.name,
                        slug: apiCategory.slug,
                        products_count: apiCategory.products_count,
                        image: `https://cms.furnishings.daikimedia.com/storage/${apiCategory.image}`
                    }));
                    setCategories(transformedCategories);
                }
            } catch (error) {
                console.error('Error fetching categories for collection:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="py-8 ">
            <div className="container mx-auto px-6">
                {/* Header */}
                <section className="text-center  mb-12 text-lg">
                    <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                        Our Floor Collections
                    </h2>
                    <p className="text-gray-600">
                        Discover our premium flooring solutions designed for Malaysian homes and commercial spaces.
                    </p>
                    <h1 className="text-2xl font-semibold py-4">Vinyl Flooring in Malaysia for Homes & Offices</h1>
                </section>

                {/* Categories Grid */}
                {loading ? (
                    <div className="min-h-screen flex items-center justify-center">
                        <SquareLoader text="Loading..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-orange-200">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover p-4"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {category.products_count} products
                                    </p>
                                    <div className="flex items-center text-orange-500 font-medium">
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

                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {!loading && (
                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
                        >
                            <ArrowRight className="mr-2 h-4 w-4" /> View All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}