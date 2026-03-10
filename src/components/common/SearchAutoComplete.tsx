'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Product {
    name: string;
    slug: string;
    categorySlug?: string;
}

const SearchAutoComplete: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Fetch products once with debounce
    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Use API route with search parameter for better performance
                const response = await fetch('/api/products?limit=1000');
                const result = await response.json();

                if (mounted && result.success && result.data) {
                    const productList: Product[] = result.data.map((item: any) => ({
                        name: item.name,
                        slug: item.slug,
                        categorySlug: item.category?.slug || 'uncategorized'
                    }));
                    setProducts(productList);
                }
            } catch (error) {
                console.error('Error fetching products for search:', error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            mounted = false;
        };
    }, []);

    // Memoize filtered products for performance
    const filteredProducts = useMemo(() => {
        if (searchTerm.trim() === '') return [];
        
        const searchLower = searchTerm.toLowerCase();
        return products
            .filter(product => product.name.toLowerCase().includes(searchLower))
            .slice(0, 8);
    }, [searchTerm, products]);

    // Update suggestions when filtered products change
    useEffect(() => {
        setSuggestions(filteredProducts);
        setShowDropdown(filteredProducts.length > 0 && searchTerm.trim() !== '');
        setSelectedIndex(-1);
    }, [filteredProducts, searchTerm]);

    // Handle click outside
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

    const handleSuggestionSelect = useCallback((product: Product) => {
        setSearchTerm(product.name);
        setShowDropdown(false);
        setSelectedIndex(-1);
        router.push(`/shop/${product.categorySlug || 'uncategorized'}/${product.slug}`);
    }, [router]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
    }, [showDropdown, suggestions, selectedIndex, handleSuggestionSelect]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        if (searchTerm.trim() !== '' && suggestions.length > 0) {
            setShowDropdown(true);
        }
    }, [searchTerm, suggestions]);

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto">
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
                    aria-label="Search products"
                    autoComplete="off"
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            {loading && searchTerm.trim() !== '' && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center">
                        Loading...
                    </div>
                </div>
            )}

            {showDropdown && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {suggestions.map((product, index) => (
                        <button
                            key={product.slug}
                            onClick={() => handleSuggestionSelect(product)}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                                index === selectedIndex ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
                            } ${index === 0 ? 'rounded-t-lg' : ''} ${
                                index === suggestions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100'
                            }`}
                        >
                            <div className="flex items-center">
                                <Search className="w-4 h-4 mr-3 text-gray-400" />
                                <span className="truncate">{product.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showDropdown && searchTerm.trim() !== '' && suggestions.length === 0 && !loading && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 text-gray-500 text-center">
                        No products found for "{searchTerm}"
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAutoComplete;