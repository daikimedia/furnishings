"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
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
}

interface ProductsApiResponse {
    success: boolean
    data: Product[]
}

// Helper function to convert text to title case
const toTitleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

interface PageHeaderProps {
    hide?: boolean;
    title?: string;
}

export default function PageHeader({ hide = false, title }: PageHeaderProps) {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result: ProductsApiResponse = await response.json();

                if (result.success) {
                    setProducts(result.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const product = products.find(p => p.slug === lastSegment || p.sku === lastSegment);
    
    let pageTitle = title 
        ? title
        : product
            ? toTitleCase(product.name)
            : lastSegment ? toTitleCase(lastSegment.replace(/-/g, " ")) : "Home";
    
    if (!title && paths.length === 2 && paths[0] === 'category') {
        pageTitle = `${pageTitle} in Malaysia`;
    }

    const breadcrumb = paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");

        const productMatch = products.find(p => p.slug === segment || p.sku === segment);
        const label = productMatch
            ? toTitleCase(productMatch.name)
            : toTitleCase(segment.replace(/-/g, " "));

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