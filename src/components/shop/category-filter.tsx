"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

export default function CategoryFilter() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-wrap gap-2">
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Link
                href="/shop"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !currentCategory 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
                All Products
            </Link>
            
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentCategory === cat.slug
                            ? 'bg-orange-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {cat.name} ({cat.products_count})
                </Link>
            ))}
        </div>
    );
}