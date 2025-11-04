'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Product {
    name: string;
    slug: string;
    categorySlug?: string;
}

interface ApiProduct {
    id: number;
    name: string;
    slug: string;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

interface ProductsApiResponse {
    success: boolean;
    data: ApiProduct[];
}

const SearchAutoComplete: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [products, setProducts] = useState<Product[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result: ProductsApiResponse = await response.json();
                
                if (result.success && result.data) {
                    const productList: Product[] = result.data.map(item => ({
                        name: item.name,
                        slug: item.slug,
                        categorySlug: item.category?.slug || 'uncategorized'
                    }));
                    setProducts(productList);
                }
            } catch (error) {
                console.error('Error fetching products for search:', error);
            }
        };

        fetchProducts();
    }, []);

    // Filter suggestions based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
        setShowDropdown(filtered.length > 0);
        setSelectedIndex(-1);
    }, [searchTerm, products]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                } else if (suggestions.length > 0) {
                    handleSuggestionSelect(suggestions[0]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    // Handle suggestion selection
    const handleSuggestionSelect = (product: Product) => {
        setSearchTerm(product.name);
        setShowDropdown(false);
        setSelectedIndex(-1);
        router.push(`/shop/${product.categorySlug || 'uncategorized'}/${product.slug}`);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle input focus
    const handleInputFocus = () => {
        if (searchTerm.trim() !== '' && suggestions.length > 0) {
            setShowDropdown(true);
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto">
            {/* Search Input */}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for flooring..."
                    className="w-full px-4 py-3 pr-10 text-gray-700 bg-white border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />

                {/* Search Icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Dropdown Suggestions */}
            {showDropdown && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {suggestions.map((product, index) => (
                        <button
                            key={product.slug}
                            onClick={() => handleSuggestionSelect(product)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                } ${index === 0 ? 'rounded-t-lg' : ''} ${index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100'
                                }`}
                        >
                            <div className="flex items-center">
                                <svg
                                    className="w-4 h-4 mr-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <span className="truncate">{product.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {showDropdown && searchTerm.trim() !== '' && suggestions.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center">
                        No products found for &quot;{searchTerm}&quot;
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAutoComplete;
