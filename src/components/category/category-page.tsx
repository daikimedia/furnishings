"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import vinylSheetFlooringData from "@/data/vinylSheetFlooringData";
import Link from "next/link";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    // Filter states
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Convert slug back to category name
    const getCategoryFromSlug = (slug: string) => {
        return vinylSheetFlooringData.products.find(item =>
            item.product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === slug
        )?.product.category;
    };

    const categoryName = typeof slug === "string" ? getCategoryFromSlug(slug) : undefined;

    // Filter products by category and filters
    const categoryProducts = vinylSheetFlooringData.products.filter(
        item => item.product.category === categoryName
    );

    // Apply filters (for now just showing the UI, actual filtering logic can be added later)
    // You can implement actual filtering based on your data structure

    const clearAllFilters = () => {
        setSelectedColors([]);
        setSelectedTypes([]);
        setSelectedCategories([]);
    };

    const handleColorFilter = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const handleTypeFilter = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleCategoryFilter = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

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

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div className="max-w-70px">
                        <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>



                            {/* Color Filter */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Colors</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: 'Black', color: 'bg-black' },
                                        { name: 'White', color: 'bg-white border border-gray-300' },
                                        { name: 'Wooden', color: 'bg-amber-700' },
                                        { name: 'Silver', color: 'bg-gray-400' },
                                        { name: 'Brown', color: 'bg-amber-800' },
                                        { name: 'Gray', color: 'bg-gray-600' }
                                    ].map((colorOption) => (
                                        <button
                                            key={colorOption.name}
                                            onClick={() => handleColorFilter(colorOption.name)}
                                            className={`flex items-center p-2 rounded-lg transition-all ${selectedColors.includes(colorOption.name)
                                                ? 'bg-orange-100 border-2 border-orange-500'
                                                : 'bg-white border border-gray-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full ${colorOption.color} mr-2`}></div>
                                            <span className="text-sm text-gray-700">{colorOption.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Type</h3>
                                <div className="space-y-2">
                                    {['Indoor', 'Outdoor', 'Office', 'Home', 'Commercial', 'Residential'].map((type) => (
                                        <label key={type} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeFilter(type)}
                                            />
                                            <span className="text-gray-700 text-sm">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={clearAllFilters}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors font-medium"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:w-3/4">
                        {/* Active Filters Display */}
                        {(selectedColors.length > 0 || selectedTypes.length > 0 || selectedCategories.length > 0) && (
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedColors.map(color => (
                                        <span key={color} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                                            {color}
                                            <button
                                                onClick={() => handleColorFilter(color)}
                                                className="ml-2 text-orange-600 hover:text-orange-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    {selectedTypes.map(type => (
                                        <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                            {type}
                                            <button
                                                onClick={() => handleTypeFilter(type)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    {selectedCategories.map(category => (
                                        <span key={category} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            {category}
                                            <button
                                                onClick={() => handleCategoryFilter(category)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
        </div>
    );
}