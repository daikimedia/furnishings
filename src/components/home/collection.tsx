"use client";
import React from "react";
import Link from "next/link";
import vinylSheetFlooringData from "@/data/vinylSheetFlooringData";
import { ArrowRight } from "lucide-react";

type Category = {
    name: string;
    image: string;
    slug: string;
};

const getUniqueCategories = (): Category[] => {
    const categoryMap = new Map<string, Category>();

    vinylSheetFlooringData.products.forEach(({ product }) => {
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
                </section>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md "
                        >
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden bg-orange-200">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover  p-4"
                                />

                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                                    {category.name}
                                </h3>
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

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center bg-orange-600  text-white px-8 py-3 rounded-lg font-medium"
                    >
                        <ArrowRight className="mr-2 h-4 w-4" />  View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
}