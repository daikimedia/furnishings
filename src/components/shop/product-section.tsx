"use client";
import React, { useState } from "react";
import Link from "next/link";
import mockData from "@/data/mockData";

type Product = {
    description: string;
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    discount: number | null;
    image: string;
    category: string;
    isAlreadyAdded: boolean;
};

type ProductsSectionProps = {
    limit?: number;
    showAll?: boolean;
};

export default function ProductsSection({
    limit,
    showAll = false,
}: ProductsSectionProps) {
    const [products] = useState<Product[]>(mockData.products);
    const [, setHoveredProduct] = useState<number | null>(null);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Extract unique categories from actual products data
    const categories = [...new Set(products.map(product => product.category))];
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Brown", "Gray"];
    const brands = ["Premium", "Standard", "Luxury", "Modern", "Classic"];

    // Filter logic
    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return categoryMatch;
    });

    const displayedProducts = showAll
        ? filteredProducts
        : filteredProducts.slice(0, limit || 8);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleColorChange = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-0 self-start">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>

                            {/* Categories Filter */}
                            <div className="mb-8">
                                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Colors Filter */}
                            <div className="mb-8">
                                <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                                <div className="space-y-2">
                                    {colors.map((color) => (
                                        <label key={color} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedColors.includes(color)}
                                                onChange={() => handleColorChange(color)}
                                                className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brands Filter */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <label key={brand} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandChange(brand)}
                                                className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedColors([]);
                                    setSelectedBrands([]);
                                }}
                                className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {displayedProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.id}`}
                                    className="group relative bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-600 font-medium text-sm">
                                            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* No Products Found */}
                        {displayedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
