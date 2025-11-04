import { notFound, redirect } from "next/navigation";

// API Product interface
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

// Fetch product data from API
async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
    try {
        console.log('Fetching product with slug:', slug);
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
            next: { revalidate: 30 } // Revalidate 30 second 
        });


        if (!response.ok) {
            console.error('API response not ok:', response.status, response.statusText);
            return null;
        }

        const result: ProductsApiResponse = await response.json();
        console.log('API response:', result);

        if (result.success && result.data) {
            console.log('Looking for product with slug:', slug);
            console.log('Available products:', result.data.map(p => ({ id: p.id, slug: p.slug, name: p.name })));

            const product = result.data.find(p => p.slug === slug);
            console.log('Found product:', product);

            // Validate product has required fields
            if (product && !product.category) {
                console.warn('Product found but category is null:', product.slug);
            }

            return product || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}


type Params = {
    slug: string;
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    const productData = await fetchProductBySlug(slug);

    console.log(productData);

    if (!productData) {
        notFound();
    }

    // Redirect legacy /shop/[slug] to canonical /shop/[category]/[slug]
    const categorySlug = productData.category?.slug || 'uncategorized';
    redirect(`/shop/${categorySlug}/${slug}`);

    // Unreachable after redirect
}

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const productData = await fetchProductBySlug(slug);

    console.log(productData);

    if (!productData) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }
    // Default static meta values
    const defaultMetaTitle = "Premium Flooring & Furnishings | Furnishings Malaysia";
    const defaultMetaDescription = "Discover premium quality flooring and furnishing products at Furnishings Malaysia. Browse our extensive collection of high-quality products for your home and office.";

    // Get meta title with fallbacks
    const metaTitle = productData.seo?.meta_title?.trim() || 
                     productData.name?.trim() || 
                     defaultMetaTitle;

    // Get meta description with fallbacks
    const metaDescription = productData.seo?.meta_description?.trim() || 
                           productData.description?.short?.trim() || 
                           defaultMetaDescription;

    // Prefer canonical path metadata; minimal metadata to avoid duplicate content
    return {
        title: metaTitle,
        description: metaDescription,
    };
}
