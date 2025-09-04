"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// API interfaces
interface ApiProduct {
    id: number
    name: string
    slug: string
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
    brand: string
    retail_price: number | null
    purchase_price: number | null
}

interface ApiCategory {
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
    data: ApiCategory[]
}

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    // State management
    const [categoryProducts, setCategoryProducts] = useState<ApiProduct[]>([]);
    const [currentCategory, setCurrentCategory] = useState<ApiCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;

    // Get category name safely
    const categoryName = currentCategory?.name;

    // Apply filters and pagination
    const filteredProducts = useMemo(() => {
        let filtered = categoryProducts;

        // Apply brand filter (using selectedColors array for brands)
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product =>
                selectedColors.includes(product.brand)
            );
        }

        // Apply price range filter (using selectedTypes for price ranges)
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(product => {
                const price = product.retail_price || product.purchase_price || 0;
                return selectedTypes.some(range => {
                    switch (range) {
                        case 'Under $50':
                            return price < 50;
                        case '$50 - $100':
                            return price >= 50 && price <= 100;
                        case '$100 - $200':
                            return price > 100 && price <= 200;
                        case 'Over $200':
                            return price > 200;
                        default:
                            return true;
                    }
                });
            });
        }

        return filtered;
    }, [categoryProducts, selectedColors, selectedTypes, selectedCategories]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedColors, selectedTypes, selectedCategories]);

    // Pagination component
    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            const visiblePages = [];
            const maxVisiblePages = 5;

            if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                    visiblePages.push(i);
                }
            } else {
                if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) {
                        visiblePages.push(i);
                    }
                    visiblePages.push('...');
                    visiblePages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                    visiblePages.push(1);
                    visiblePages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                        visiblePages.push(i);
                    }
                } else {
                    visiblePages.push(1);
                    visiblePages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        visiblePages.push(i);
                    }
                    visiblePages.push('...');
                    visiblePages.push(totalPages);
                }
            }
            return visiblePages;
        };

        return (
            <div className="flex justify-center items-center mt-8 mb-6">
                <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        &laquo;
                    </button>

                    {/* Page Numbers */}
                    {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-gray-400">...</span>
                            ) : (
                                <button
                                    onClick={() => setCurrentPage(page as number)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                        ? 'bg-orange-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        );
    };

    // Fetch data from API
    useEffect(() => {
        const fetchCategoryData = async () => {
            // Don't fetch if slug is not available yet
            if (!slug || typeof slug !== 'string') {
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Use the specific API endpoint for category products
                const categoryProductsResponse = await fetch(
                    `https://cms.furnishings.daikimedia.com/api/categories/${slug}/products`
                );

                const categoryProductsResult: ProductsApiResponse = await categoryProductsResponse.json();

                if (categoryProductsResult.success && categoryProductsResult.data.length > 0) {
                    setCategoryProducts(categoryProductsResult.data);

                    // Extract category info from the first product
                    const firstProduct = categoryProductsResult.data[0];
                    setCurrentCategory({
                        id: firstProduct.category.id,
                        name: firstProduct.category.name,
                        slug: firstProduct.category.slug,
                        products_count: categoryProductsResult.data.length
                    });
                } else {
                    // If no products found, try to get category info from categories API
                    const categoriesResponse = await fetch('https://cms.furnishings.daikimedia.com/api/categories');
                    const categoriesResult: CategoriesApiResponse = await categoriesResponse.json();

                    if (categoriesResult.success) {
                        const category = categoriesResult.data.find(cat => cat.slug === slug);
                        if (category) {
                            setCurrentCategory(category);
                            setCategoryProducts([]);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setError('Failed to load category data');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug]);

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

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700">Loading category...</h2>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Category</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    // Category not found state
    if (!loading && (!categoryName || !currentCategory)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
                    <p className="text-gray-600 mb-4">The category you&apos;re looking for doesn&apos;t exist.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    // Show empty state if category exists but has no products
    if (!loading && currentCategory && categoryProducts.length === 0) {
        return (
            <div className="min-h-screen">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
                                <p className="text-gray-600 mt-1">No products found in this category</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Products Available</h2>
                        <p className="text-gray-600 mb-6">This category doesn&apos;t have any products yet. Check back later!</p>
                        <button
                            onClick={() => router.push('/shop')}
                            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                        >
                            Browse All Products
                        </button>
                    </div>
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
                            <p className="text-gray-600 mt-1">
                                {filteredProducts.length} products found
                                {filteredProducts.length !== categoryProducts.length &&
                                    ` (${categoryProducts.length} total)`
                                }
                                {filteredProducts.length > 0 && (
                                    <span className="ml-2 text-sm">
                                        | Page {currentPage} of {totalPages}
                                    </span>
                                )}
                            </p>
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

                            {/* Brand Filter */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Brands</h3>
                                <div className="space-y-2">
                                    {[...new Set(categoryProducts.map(p => p.brand?.toLowerCase()))]
                                        .filter(Boolean)
                                        .map((brand) => (
                                            <label key={brand} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                    checked={selectedColors.includes(brand)}
                                                    onChange={() => handleColorFilter(brand)}
                                                />
                                                <span className="text-gray-700 text-sm">{brand}</span>
                                            </label>
                                        ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            {/* <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Price Range</h3>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Under $50', min: 0, max: 50 },
                                        { label: '$50 - $100', min: 50, max: 100 },
                                        { label: '$100 - $200', min: 100, max: 200 },
                                        { label: 'Over $200', min: 200, max: Infinity }
                                    ].map((range) => (
                                        <label key={range.label} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                                checked={selectedTypes.includes(range.label)}
                                                onChange={() => handleTypeFilter(range.label)}
                                            />
                                            <span className="text-gray-700 text-sm">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div> */}

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

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">No Products Found</h2>
                                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProducts.map((product) => {
                                        // Fix image URL
                                        const imageUrl = product.images.main_image?.startsWith('http')
                                            ? product.images.main_image
                                            : `https://cms.furnishings.daikimedia.com${product.images.main_image}`;

                                        return (
                                            <div key={product.id} className="group">
                                                <Link
                                                    href={`/shop/${product.category?.slug || 'uncategorized'}/${product.slug}`}
                                                    className="block bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden hover:shadow-lg transition-shadow"
                                                >
                                                    {/* Image Section */}
                                                    <div className="relative h-56 overflow-hidden bg-orange-200">
                                                        <img
                                                            src={imageUrl || '/images/placeholder.jpg'}
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

                                                        {/* Brand and Price */}
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className="text-xs text-gray-500">{product.brand}</span>
                                                            {(product.retail_price || product.purchase_price) && (
                                                                <span className="text-sm font-semibold text-orange-600">
                                                                    ${product.retail_price || product.purchase_price}
                                                                </span>
                                                            )}
                                                        </div>

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

                                {/* Pagination Controls */}
                                <PaginationControls />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}