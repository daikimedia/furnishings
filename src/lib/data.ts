// lib/data.ts
// Shared data fetching with caching

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

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
    } | null;
    images: {
        main_image: string;
        gallery: string[];
        thumbnails: string[];
        alt_texts: string[];
    };
    description: {
        short: string;
        long: string;
    };
    purchase_price?: number | null;
    retail_price?: number | null;
    quantity?: number;
}

// Cache storage
let categoriesCache: Category[] | null = null;
let productsCache: Product[] | null = null;
let categoriesLastFetch = 0;
let productsLastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCategories(): Promise<Category[]> {
    // Return cached data if still valid
    if (categoriesCache && Date.now() - categoriesLastFetch < CACHE_DURATION) {
        return categoriesCache;
    }

    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories', {
            next: { revalidate: 300 },
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch categories');
            return categoriesCache || [];
        }

        const data = await response.json();
        
        // Handle different API response structures
        if (data.success && Array.isArray(data.data)) {
            categoriesCache = data.data;
        } else if (Array.isArray(data)) {
            categoriesCache = data;
        } else {
            categoriesCache = [];
        }
        
        categoriesLastFetch = Date.now();
        return categoriesCache;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return categoriesCache || [];
    }
}

export async function getProducts(): Promise<Product[]> {
    // Return cached data if still valid
    if (productsCache && Date.now() - productsLastFetch < CACHE_DURATION) {
        return productsCache;
    }

    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
            next: { revalidate: 300 },
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch products');
            return productsCache || [];
        }

        const data = await response.json();
        
        // Handle different API response structures
        if (data.success && Array.isArray(data.data)) {
            productsCache = data.data;
        } else if (Array.isArray(data)) {
            productsCache = data;
        } else if (data.data && Array.isArray(data.data)) {
            productsCache = data.data;
        } else {
            productsCache = [];
        }
        
        productsLastFetch = Date.now();
        return productsCache;
    } catch (error) {
        console.error('Error fetching products:', error);
        return productsCache || [];
    }
}

// Helper function to find product by slug
export function findProductBySlug(products: Product[], slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

// Helper function to normalize URL
export function normalizeUrl(url: string): string {
    if (!url) return '/placeholder.svg';
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return `https://cms.furnishings.daikimedia.com${url}`;
}