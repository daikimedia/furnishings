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

export default function PageHeader() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
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

    // Find product by slug or SKU
    const product = products.find(p => p.slug === lastSegment || p.sku === lastSegment);
    const pageTitle = product
        ? product.name.toUpperCase()
        : lastSegment?.replace(/-/g, " ").toUpperCase() || "HOME";

    const breadcrumb = paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");

        // Find product match by slug or SKU
        const productMatch = products.find(p => p.slug === segment || p.sku === segment);
        const label = productMatch
            ? productMatch.name.toUpperCase()
            : segment.replace(/-/g, " ").toUpperCase();

        return (
            <span key={index}>
                <span className="mx-1">/</span>
                <a href={path} className="hover:underline text-white">
                    {label}
                </a>
            </span>
        );
    });

    return (
        <div className="bg-black py-12 text-center h-48">
            <h1 className="text-4xl font-bold text-orange-600 italic">
                {loading ? "LOADING..." : pageTitle}
            </h1>
            <div className="mt-2 text-white text-sm">
                <Link href="/" className="hover:underline text-white">
                    HOME
                </Link>
                {!loading && breadcrumb}
            </div>
        </div>
    );
}