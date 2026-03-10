"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    sku: string;
    name: string;
    slug: string;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

const DynamicBreadcrumbSchema = () => {
    const pathname = usePathname();
    const [productMap, setProductMap] = useState<Map<string, string>>(new Map());

    // Fetch products once and create a map for quick lookup
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use the API route instead of direct CMS URL
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
                console.error('Error fetching products for breadcrumb:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Remove existing breadcrumb schema if any
        const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
        if (existingSchema) {
            existingSchema.remove();
        }

        // Generate breadcrumbs from current pathname
        const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
            const segments = path.split('/').filter(segment => segment !== '');
            const breadcrumbs: BreadcrumbItem[] = [
                { name: 'Home', url: 'https://www.furnishings.com.my' }
            ];

            let currentPath = '';
            segments.forEach((segment) => {
                currentPath += `/${segment}`;

                // Try to find product name from map
                const productName = productMap.get(segment);
                
                let name: string;
                if (productName) {
                    name = productName;
                } else {
                    // Convert URL segment to readable name
                    name = segment
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                }

                breadcrumbs.push({
                    name: name,
                    url: `https://www.furnishings.com.my${currentPath}`
                });
            });

            return breadcrumbs;
        };

        const breadcrumbs = generateBreadcrumbs(pathname);

        // Create schema object
        const schema = {
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
    }, [pathname, productMap]);

    return null;
};

export default DynamicBreadcrumbSchema;