"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SquareLoader from "../common/loader";
import { Suspense } from 'react';
// API Product interface
interface ApiProduct {
    id: number;
    sku: string;
    name: string;
    slug: string;
    brand: string;
    status: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    images: {
        main_image: string;
        gallery: string[];
        thumbnails: string[];
        alt_texts: string[];
    };
    description: {
        short: string;
        long: string;
    };
    purchase_price: number | null;
    retail_price: number | null;
    quantity: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

interface Product {
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
    brand?: string;
}

interface ProductsSectionProps {
    page?: number;
    category?: string;
    sort?: string;
    itemsPerPage?: number;
    showAll?: boolean;
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function ProductsSectionContent({
    page = 1,
    category,
    sort,
    itemsPerPage = 12,
    showAll = false,
}: ProductsSectionProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    
    // Filter states - initialize from URL
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        category ? category.split(',') : []
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState(sort || 'default');
    
    // Pagination state
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Debounce filter values to prevent too many URL updates
    const debouncedCategories = useDebounce(selectedCategories, 500);
    const debouncedBrands = useDebounce(selectedBrands, 500);
    const debouncedSort = useDebounce(sortBy, 500);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch products when dependencies change
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Build URL with query parameters
                const params = new URLSearchParams();
                params.set('page', page.toString());
                params.set('limit', itemsPerPage.toString());
                
                if (selectedCategories.length > 0) {
                    params.set('category', selectedCategories.join(','));
                }
                
                if (selectedBrands.length > 0) {
                    params.set('brand', selectedBrands.join(','));
                }
                
                if (sortBy !== 'default') {
                    params.set('sort', sortBy);
                }

                const response = await fetch(`/api/products?${params.toString()}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const data = await response.json();
                
                // Transform API products to component Product type
                    // In the fetchProducts function, update the transformation:
                    const transformedProducts: Product[] = (data.products || []).map((apiProduct: ApiProduct) => {
                        let imageUrl = apiProduct.images?.main_image || '';
                        if (imageUrl && !imageUrl.startsWith('http')) {
                            imageUrl = `https://cms.furnishings.daikimedia.com${imageUrl}`;
                        }

                        // Safely parse price
                        let price = 0;
                        if (apiProduct.retail_price) {
                            price = typeof apiProduct.retail_price === 'string' 
                                ? parseFloat(apiProduct.retail_price) 
                                : apiProduct.retail_price;
                        } else if (apiProduct.purchase_price) {
                            price = typeof apiProduct.purchase_price === 'string'
                                ? parseFloat(apiProduct.purchase_price)
                                : apiProduct.purchase_price;
                        }

                        return {
                            id: apiProduct.id,
                            name: apiProduct.name,
                            slug: apiProduct.slug,
                            description: apiProduct.description?.short || apiProduct.description?.long || '',
                            price: isNaN(price) ? 0 : price, // Ensure it's a valid number
                            originalPrice: null,
                            discount: null,
                            image: imageUrl,
                            category: apiProduct.category?.name || 'Uncategorized',
                            categorySlug: apiProduct.category?.slug || 'uncategorized',
                            isAlreadyAdded: false,
                            brand: apiProduct.brand
                        };
                    });

                setProducts(transformedProducts);
                setTotalProducts(data.total || 0);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, selectedCategories, selectedBrands, sortBy, itemsPerPage]);

    // Update URL when debounced filters change
    useEffect(() => {
        const params = new URLSearchParams();
        
        if (debouncedCategories.length > 0) {
            params.set('category', debouncedCategories.join(','));
        }
        
        if (debouncedBrands.length > 0) {
            params.set('brand', debouncedBrands.join(','));
        }
        
        if (debouncedSort !== 'default') {
            params.set('sort', debouncedSort);
        }
        
        if (page > 1) {
            params.set('page', page.toString());
        }
        
        const newUrl = `/shop${params.toString() ? `?${params.toString()}` : ''}`;
        
        // Update URL without causing a re-render cycle
        router.push(newUrl, { scroll: false });
    }, [debouncedCategories, debouncedBrands, debouncedSort, page, router]);

    // Handle category change - only update state
    const handleCategoryChange = useCallback((categoryName: string) => {
        setSelectedCategories(prev => {
            const newCategories = prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName];
            return newCategories;
        });
    }, []);

    // Handle brand change
    const handleBrandChange = useCallback((brand: string) => {
        setSelectedBrands(prev => {
            const newBrands = prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand];
            return newBrands;
        });
    }, []);

    // Handle sort change - only update state
    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortBy(newSort);
    }, []);

    // Handle clear filters
    const handleClearFilters = useCallback(() => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSortBy('default');
        
        router.push('/shop', { scroll: false });
    }, [router]);

    // Handle page change
    const handlePageChange = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/shop?${params.toString()}`, { scroll: false });
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [router, searchParams]);

    // Get unique brands from products
    const brands = useMemo(() => {
        const uniqueBrands = new Set(products.map(p => p.brand).filter(Boolean));
        return Array.from(uniqueBrands);
    }, [products]);

    // Show error state
    if (error) {
        return (
            <div className="min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Enhance your home or office with our elegant and durable flooring collections.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {!loading && products.length > 0 && (
                        <div className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                </div>

                                <div className="mb-8">
                                    <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                                    {loading && categories.length === 0 ? (
                                        <div className="space-y-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="h-6 bg-gray-200 animate-pulse rounded"></div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                            {categories.map((cat) => (
                                                <label key={cat.id} className="flex items-center cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(cat.name)}
                                                        onChange={() => handleCategoryChange(cat.name)}
                                                        className="w-4 h-4 accent-orange-600 rounded border-gray-300 focus:ring-orange-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                                                        {cat.name} ({cat.products_count})
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {(selectedCategories.length > 0 || selectedBrands.length > 0 || sortBy !== 'default') && (
                                        <button
                                            onClick={handleClearFilters}
                                            className="w-full bg-orange-600 text-white px-4 py-2 rounded text-base font-medium "
                                        >
                                        Clear All Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                                Showing {products.length} of {totalProducts} products
                            </div>
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                                <select
                                    id="sort"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    className="text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                    <option value="name-desc">Name: Z to A</option>
                                </select>
                            </div>
                        </div>

                        {/* Products grid */}
                        {loading ? (
                            <div className="min-h-[500px] flex items-center justify-center">
                                <SquareLoader text="Loading products..." />
                            </div>
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg mb-4">No products found.</p>
                                        <Link
                                            href="/shop"
                                            className="text-orange-600 hover:text-orange-700 font-medium"
                                        >
                                            Browse all products
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8">
                                            {products.map((product) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                    isHovered={hoveredProduct === product.id}
                                                    onHover={setHoveredProduct}
                                                />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <Pagination
                                                currentPage={page}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Product Card Component
function ProductCard({ 
    product, 
    isHovered, 
    onHover 
}: { 
    product: Product; 
    isHovered: boolean; 
    onHover: (id: number | null) => void;
}) {
    // Format price safely
    const formatPrice = (price: any): string => {
        if (!price && price !== 0) return '';
        
        // Convert to number if it's a string
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        
        // Check if it's a valid number
        if (isNaN(numPrice) || numPrice <= 0) return '';
        
        return `RM ${numPrice.toFixed(2)}`;
    };

    const formattedPrice = formatPrice(product.price);

    return (
        <Link
            href={`/shop/${product.categorySlug || 'uncategorized'}/${product.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => onHover(product.id)}
            onMouseLeave={() => onHover(null)}
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-orange-100">
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover p-4 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description || "Premium quality flooring solution for your space."}
                </p>

                {/* Price if available - FIXED */}
                {formattedPrice && (
                    <div className="mb-3">
                        <span className="text-lg font-bold text-gray-900">
                            {formattedPrice}
                        </span>
                    </div>
                )}

                <div className="flex items-center text-orange-500 font-medium">
                    <span className="text-sm">View Product</span>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                        }`}
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
    );
}

// Pagination Component
function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange 
}: { 
    currentPage: number; 
    totalPages: number; 
    onPageChange: (page: number) => void;
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    // Generate page numbers to display
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;
        
        if (currentPage <= 4) {
            return [...pages.slice(0, 5), '...', totalPages];
        } else if (currentPage >= totalPages - 3) {
            return [1, '...', ...pages.slice(totalPages - 5)];
        } else {
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-center items-center space-x-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition-colors ${
                    currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
            >
                Previous
            </button>
            
            <div className="flex space-x-2">
                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={`w-10 h-10 rounded-md transition-colors ${
                                currentPage === page
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md transition-colors ${
                    currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
            >
                Next
            </button>
        </div>
    );
}
export default function ProductsSection(props: ProductsSectionProps) {
    return (
        <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">
            <SquareLoader text="Loading products..." />
        </div>}>
            <ProductsSectionContent {...props} />
        </Suspense>
    );
}