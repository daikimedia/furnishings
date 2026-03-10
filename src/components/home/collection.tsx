"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SquareLoader from "../common/loader";

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    products_count: number;
    image: string;
}

interface Category {
    name: string;
    image: string;
    slug: string;
    products_count: number;
}

// Client-side cache
let categoriesCache: Category[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default function FloorCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories from API with caching
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check cache first
                const now = Date.now();
                if (categoriesCache && now - cacheTimestamp < CACHE_DURATION) {
                    console.log('✅ Using cached categories for homepage');
                    setCategories(categoriesCache);
                    setLoading(false);
                    return;
                }

                console.log('🔄 Fetching fresh categories for homepage...');
                
                // Use internal API route instead of direct CMS
                const response = await fetch('/api/categories');
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch categories`);
                }
                
                const result = await response.json();

                if (result.success && result.data) {
                    // Transform API categories with proper image URL
                    const transformedCategories: Category[] = result.data.map((apiCategory: ApiCategory) => {
                        // Handle image URL properly
                        let imageUrl = apiCategory.image || '';
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            // Check if it's already a full path
                            if (imageUrl.startsWith('/storage/')) {
                                imageUrl = `https://cms.furnishings.daikimedia.com${imageUrl}`;
                            } else {
                                imageUrl = `https://cms.furnishings.daikimedia.com/storage/${imageUrl}`;
                            }
                        }
                        
                        return {
                            name: apiCategory.name,
                            slug: apiCategory.slug,
                            products_count: apiCategory.products_count,
                            image: imageUrl || '/placeholder-category.jpg'
                        };
                    });

                    // Update cache
                    categoriesCache = transformedCategories;
                    cacheTimestamp = Date.now();
                    setCategories(transformedCategories);
                }
            } catch (error) {
                console.error('Error fetching categories for collection:', error);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Show only 6 categories max (or however many you want)
    const displayCategories = categories.slice(0, 6);

    if (error) {
        return (
            <div className="py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="container mx-auto px-6">
                {/* Header */}
                <section className="text-center mb-12 text-lg">
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
                    <div className="flex justify-center items-center py-20">
                        <SquareLoader text="Loading collections..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayCategories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-orange-200">
                                    <Image
                                        src={category.image || '/placeholder-category.jpg'}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover p-4 group-hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder-category.jpg';
                                        }}
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
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Decorative accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {!loading && categories.length > 0 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        >
                            View All Products <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}