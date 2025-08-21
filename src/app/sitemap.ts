import { MetadataRoute } from 'next'

// Base URL for your website
const baseUrl = 'https://www.furnishings.com.my';

// Static pages that don't change often
const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about-us', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/shop', priority: 0.8 },
    { url: '/category', priority: 0.8 },
    { url: '/blog', priority: 0.7 },
    { url: '/return-and-refunds-policy', priority: 0.5 },
    { url: '/terms-&-conditions', priority: 0.5 },
];

// Define types for our data
interface Product {
    slug: string;
    updatedAt?: string;
}

// Example function to fetch categories
async function getCategories() {
    // Replace this with your actual data fetching logic
    return [
        'flooring',
        'carpet-tiles',
        'spc-and-laminate',
        'vinyl-sheet-flooring',
        'alberta',
        'versafloor',
        'artificial-grass'
    ];
}

// Example function to fetch products
async function getProducts(): Promise<Product[]> {
    // Replace this with your actual data fetching logic
    // This is a placeholder that returns an empty array
    return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categories = await getCategories();
    const currentDate = new Date().toISOString();

    // Generate sitemap entries for static pages
    const staticUrls = staticPages.map((page) => ({
        url: `${baseUrl}${page.url}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: page.priority,
    }));

    // Generate sitemap entries for category pages
    const categoryUrls = categories.map((category: string) => ({
        url: `${baseUrl}/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // If you have dynamic product pages, you can add them here
    const productUrls = (await getProducts()).map((product: Product) => ({
        url: `${baseUrl}/shop/${product.slug}`,
        lastModified: product.updatedAt || currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.7,
    }));

    return [
        ...staticUrls,
        ...categoryUrls,
        ...productUrls, // Uncomment when you have product data
    ];
}
