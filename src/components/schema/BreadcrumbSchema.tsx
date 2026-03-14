"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import { Product } from '@/lib/interfaces'; // Import from interfaces

interface BreadcrumbItem {
    name: string;
    url: string;
}

const DynamicBreadcrumbSchema = () => {
    const pathname = usePathname();
    const [productMap, setProductMap] = useState<Map<string, string>>(new Map());
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch products using centralized API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                
                if (products && products.length > 0) {
                    const map = new Map<string, string>();
                    products.forEach((product: Product) => {
                        map.set(product.slug, product.name);
                        map.set(product.sku, product.name);
                    });
                    setProductMap(map);
                }
                setIsLoaded(true);
            } catch (error) {
                console.error('Error fetching products for breadcrumb:', error);
                setIsLoaded(true);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
        if (existingSchema) {
            existingSchema.remove();
        }

        const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
            const segments = path.split('/').filter(segment => segment !== '');
            const breadcrumbs: BreadcrumbItem[] = [
                { name: 'Home', url: 'https://www.furnishings.com.my' }
            ];

            let currentPath = '';
            segments.forEach((segment) => {
                currentPath += `/${segment}`;
                const productName = productMap.get(segment);
                
                let name: string;
                if (productName) {
                    name = productName;
                } else {
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

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-breadcrumb-schema', 'true');
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            const schemaScript = document.querySelector('script[data-breadcrumb-schema]');
            if (schemaScript) {
                schemaScript.remove();
            }
        };
    }, [pathname, productMap, isLoaded]);

    return null;
};

export default DynamicBreadcrumbSchema;