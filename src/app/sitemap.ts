import { MetadataRoute } from 'next';

// 👇 Important: this makes sitemap dynamic (fetch every request)
export const dynamic = "force-dynamic";

// Base URL
const baseUrl = 'https://www.furnishings.com.my';

// Static pages
const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about-us', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/blog', priority: 0.7 },
    { url: '/return-and-refunds-policy', priority: 0.5 },
    { url: '/terms-&-conditions', priority: 0.5 },
];

// Types
interface Category {
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
    category?: {
        slug: string;
    };
}

interface ApiResponse<T> {
    data: T[];
}

// Fetch categories
async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories', {
            next: { revalidate: 0 }, // always fresh
        });
        const data: ApiResponse<Category> = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Fetch products
async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
            next: { revalidate: 0 }, // always fresh
        });
        const data: ApiResponse<Product> = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Sitemap function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    const currentDate = new Date().toISOString();

    // Static URLs
    const staticUrls = staticPages.map((page) => ({
        url: `${baseUrl}${page.url}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: page.priority,
    }));

    // Category URLs
    const categoryUrls = categories.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: category.updatedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Product URLs
    const productUrls = products.map((product) => {
        const categorySlug = product.category?.slug || 'products';
        return {
            url: `${baseUrl}/shop/${categorySlug}/${product.slug}`,
            lastModified: product.updatedAt || currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.7,
        };
    });

    return [...staticUrls, ...categoryUrls, ...productUrls];
}
