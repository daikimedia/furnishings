import { notFound, redirect } from "next/navigation";

interface ApiProduct {
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
    } | null
    images: {
        main_image: string
        gallery: string[]
        thumbnails: string[]
        alt_texts: string[]
    }
    description: {
        short: string
        long: string
    }
    seo: {
        meta_title: string
        meta_description: string
        keywords: string[]
    }
    purchase_price: number | null
    retail_price: number | null
    quantity: number
    features?: {
        main_features?: string[]
        benefits?: string[]
        design_compatibility?: string[]
    }
    specifications?: object
    installation?: object
    maintenance?: object
    faqs?: Array<{
        question: string
        answer: string
    }>
    cta?: {
        primary: string
        secondary: string
        tertiary: string
    }
    additional_description?: {
        headline: string
        sections: object[]
    } | null
    created_at: string
    updated_at: string
}

interface ProductsApiResponse {
    success: boolean
    data: ApiProduct[]
}

let cachedProducts: ApiProduct[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchAllProducts(): Promise<ApiProduct[]> {
    if (cachedProducts && Date.now() - cacheTimestamp < CACHE_DURATION) {
        // console.log('✅ Using cached products in [slug] page');
        return cachedProducts;
    }

    try {
        // console.log('🔄 Fetching fresh products in [slug] page...');
        
        const response = await fetch('http://localhost:3000/api/products?limit=1000', {
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error('API response not ok:', response.status);
            return cachedProducts || [];
        }

        const data = await response.json();
        
        if (data.products && Array.isArray(data.products)) {
            cachedProducts = data.products;
            cacheTimestamp = Date.now();
            return data.products;
        }
        
        return cachedProducts || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return cachedProducts || [];
    }
}

async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
    try {
        const products = await fetchAllProducts();
        
        const normalizedSlug = slug.toLowerCase().trim();
        const product = products.find(p => p.slug.toLowerCase().trim() === normalizedSlug);
        
        return product || null;
    } catch (error) {
        console.error('Error finding product:', error);
        return null;
    }
}

type Params = {
    slug: string;
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    const productData = await fetchProductBySlug(slug);

    if (!productData) {
        notFound();
    }

    const categorySlug = productData.category?.slug || 'uncategorized';
    redirect(`/shop/${categorySlug}/${slug}`);
}

export const revalidate = 300; 

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const productData = await fetchProductBySlug(slug);

    if (!productData) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
            robots: {
                index: false,
            }
        };
    }

    const defaultMetaTitle = "Premium Flooring & Furnishings | Furnishings Malaysia";
    const defaultMetaDescription = "Discover premium quality flooring and furnishing products at Furnishings Malaysia.";

    const formatMetaTitle = (apiTitle: string | undefined): string => {
        if (!apiTitle) {
            return defaultMetaTitle;
        }
        
        let cleanTitle = apiTitle.trim();
        cleanTitle = cleanTitle.replace(/^buy\s+/i, '');
        cleanTitle = cleanTitle.replace(/\s*\|\s*Furnishings.*$/i, '').trim();
        cleanTitle = cleanTitle.replace(/[–|\-|]\s*$/, '').trim();
        
        return `Buy ${cleanTitle} Vinyl Sheet Flooring | Furnishings`;
    };

    const apiMetaTitle = productData.seo?.meta_title?.trim();
    
    const metaTitle = apiMetaTitle 
        ? formatMetaTitle(apiMetaTitle)
        : (productData.name?.trim() || defaultMetaTitle);

    const metaDescription = productData.seo?.meta_description?.trim() || 
                           productData.description?.short?.trim() || 
                           defaultMetaDescription;

    return {
        title: metaTitle,
        description: metaDescription,
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `https://www.furnishings.com.my/shop/${productData.category?.slug || 'uncategorized'}/${productData.slug}`,
        },
    };
}