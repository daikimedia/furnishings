"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
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
}

interface ProductsApiResponse {
    success: boolean;
    data: Product[];
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchema {
    "@context": string;
    "@type": string;
    "itemListElement": Array<{
        "@type": string;
        "position": number;
        "name": string;
        "item": string;
    }>;
}

const DynamicBreadcrumbSchema = () => {
    const pathname = usePathname();
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

    useEffect(() => {
        // Wait for products to load before generating schema
        if (loading) return;

        // Remove existing breadcrumb schema if any
        const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
        if (existingSchema) {
            existingSchema.remove();
        }

        // Generate breadcrumbs from current pathname
        const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
            const segments = path.split('/').filter(segment => segment !== '');
            const breadcrumbs: BreadcrumbItem[] = [
                { name: 'Home', url: 'https://furnishings.daikimedia.com' } // Update with your actual domain
            ];

            let currentPath = '';
            segments.forEach((segment) => {
                currentPath += `/${segment}`;

                // Try to find product by slug or SKU
                const productMatch = products.find(p => p.slug === segment || p.sku === segment);

                let name: string;
                if (productMatch) {
                    name = productMatch.name;
                } else {
                    // Convert URL segment to readable name
                    name = segment
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                }

                breadcrumbs.push({
                    name: name,
                    url: `https://furnishings.daikimedia.com${currentPath}` // Update with your actual domain
                });
            });

            return breadcrumbs;
        };

        const breadcrumbs = generateBreadcrumbs(pathname);

        // Create schema object
        const schema: BreadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": breadcrumb.name,
                "item": breadcrumb.url
            }))
        };

        // Create and inject script tag
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-breadcrumb-schema', 'true');
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            const schemaScript = document.querySelector('script[data-breadcrumb-schema]');
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, [pathname, products, loading]);

    return null;
};

export default DynamicBreadcrumbSchema;