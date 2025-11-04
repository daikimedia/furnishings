"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SquareLoader from "../common/loader";

// API Product interface
interface ApiProduct {
    id: number
    sku: string
    name: string
    slug: string
    brand: string
    status: string
    category: {
        id: number
        name: string
        slug: string
    }
    images: {
        main_image: string
        gallery: string[]
        thumbnails: string[]
        alt_texts: string[]
    }
    description: {
        short: string
        long: string
    }
    purchase_price: number | null
    retail_price: number | null
    quantity: number
}

interface Category {
    id: number
    name: string
    slug: string
    products_count: number
}

interface ProductsApiResponse {
    success: boolean
    data: ApiProduct[]
}

interface CategoriesApiResponse {
    success: boolean
    data: Category[]
}

type Product = {
    description: string;
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    discount: number | null;
    image: string;
    category: string;
    categorySlug?: string;
    isAlreadyAdded: boolean;
    slug: string;
};

type ProductsSectionProps = {
    limit?: number;
    showAll?: boolean;
};



export default function ProductsSection({
    limit,
    showAll = false,
}: ProductsSectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [, setHoveredProduct] = useState<number | null>(null);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [, setSelectedColors] = useState<string[]>([]);
    const [, setSelectedBrands] = useState<string[]>([]);

    // Fetch products and categories from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch products and categories in parallel
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('https://cms.furnishings.daikimedia.com/api/products'),
                    fetch('https://cms.furnishings.daikimedia.com/api/categories')
                ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error(`HTTP error! Products: ${productsResponse.status}, Categories: ${categoriesResponse.status}`);
                }

                const productsResult: ProductsApiResponse = await productsResponse.json();
                const categoriesResult: CategoriesApiResponse = await categoriesResponse.json();

                console.log('Products result:', productsResult);
                console.log('Categories result:', categoriesResult);

                if (productsResult.success) {
                    // Transform API products to component Product type
                    const transformedProducts: Product[] = productsResult.data.map((apiProduct) => {
                        // Fix image URL - prepend domain if it's a relative path
                        let imageUrl = apiProduct.images.main_image || '';
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            imageUrl = `https://cms.furnishings.daikimedia.com${imageUrl}`;
                        }

                        return {
                            id: apiProduct.id,
                            name: apiProduct.name,
                            slug: apiProduct.slug,
                            description: apiProduct.description.short || apiProduct.description.long || '',
                            price: apiProduct.retail_price || apiProduct.purchase_price || 0,
                            originalPrice: null, // Can be calculated if needed
                            discount: null, // Can be calculated if needed
                            image: imageUrl,
                            category: apiProduct.category?.name || 'Uncategorized',
                            categorySlug: apiProduct.category?.slug || 'uncategorized',
                            isAlreadyAdded: false
                        };
                    });

                    console.log('Transformed products:', transformedProducts);
                    setProducts(transformedProducts);
                }

                if (categoriesResult.success) {
                    setCategories(categoriesResult.data);
                }
            } catch (error) {
                console.error('Error fetching products and categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
                    <p className="text-lg text-gray-600  mx-auto">
                        Enhance your home or office with our elegant and durable carpet flooring collections.
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
                                {loading ? (
                                    <div className="text-gray-500 text-sm">Loading categories...</div>
                                ) : (
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <label key={category.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.name)}
                                                    onChange={() => handleCategoryChange(category.name)}
                                                    className="w-4 h-4 accent-orange-600 hover:accent-orange-600"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">
                                                    {category.name} ({category.products_count})
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Clear Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedColors([]);
                                    setSelectedBrands([]);
                                }}
                                className="w-full bg-orange-600 text-white px-4 py-2 rounded text-base font-medium "
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 w-full">
                        {loading ? (
                            <div className="min-h-screen flex items-center justify-center">
                                <SquareLoader text="Loading..." />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {displayedProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/shop/${product.categorySlug || 'uncategorized'}/${product.slug}`}
                                        className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-56 overflow-hidden bg-orange-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover p-4"
                                            />
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
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
                                ))}
                            </div>
                        )}

                        {/* No Products Found */}
                        {!loading && displayedProducts.length === 0 && (
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