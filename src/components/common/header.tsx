"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
}

interface PageHeaderProps {
    hide?: boolean;
    title?: string;
}

export default function PageHeader({ hide = false, title }: PageHeaderProps) {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];
    const [productMap, setProductMap] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Use API route
                const response = await fetch('/api/products?limit=1000');
                const result = await response.json();

                if (result.success && result.data) {
                    const map = new Map<string, string>();
                    result.data.forEach((product: Product) => {
                        map.set(product.slug, product.name);
                        map.set(product.sku, product.name);
                    });
                    setProductMap(map);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Helper function to convert text to title case
    const toTitleCase = (str: string): string => {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const productName = productMap.get(lastSegment);
    
    let pageTitle = title 
        ? title
        : productName
            ? productName
            : lastSegment ? toTitleCase(lastSegment) : "Home";
    
    if (!title && paths.length === 2 && paths[0] === 'category') {
        pageTitle = `${pageTitle} in Malaysia`;
    }

    const breadcrumb = paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");
        const label = productMap.get(segment) || toTitleCase(segment);

        return (
            <span key={index}>
                <span className="mx-1">/</span>
                <a href={path} className="hover:underline text-white">
                    {label}
                </a>
            </span>
        );
    });

    if (hide) {
        return null;
    }

    return (
        <div className="bg-black py-12 text-center h-48">
            <h1 className="text-4xl font-bold text-orange-600 italic">
                {pageTitle}
            </h1>
            <div className="mt-2 text-white text-sm">
                <Link href="/" className="hover:underline text-white">
                    Home
                </Link>
                {!loading && breadcrumb}
            </div>
        </div>
    );
}