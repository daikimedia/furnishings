import { notFound, redirect } from "next/navigation";
import SingleProduct from "@/components/shop/single-product";
import PageHeader from "@/components/common/header";

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

async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
            next: { revalidate: 30 }
        });
        if (!response.ok) {
            return null;
        }
        const result: ProductsApiResponse = await response.json();
        if (result.success && result.data) {
            // Case-insensitive slug comparison - compare lowercase versions
            const normalizedSlug = slug.toLowerCase().trim();
            const product = result.data.find(p => p.slug.toLowerCase().trim() === normalizedSlug);
            return product || null;
        }
        return null;
    } catch {
        return null;
    }
}

type Params = {
    slug: string[];
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (!Array.isArray(slug) || slug.length === 0) {
        notFound();
    }

   
    if (slug.length === 1) {
        const productSlug = slug[0];
        const productData = await fetchProductBySlug(productSlug);
        if (!productData) {
            notFound();
        }
        const categorySlug = productData.category?.slug || 'uncategorized';
        redirect(`/shop/${categorySlug}/${productData.slug}`);
    }

    if (slug.length === 2) {
        const [category, productSlug] = slug;
        const productData = await fetchProductBySlug(productSlug);
        if (!productData) {
            notFound();
        }

        const canonicalCategory = productData.category?.slug || 'uncategorized';
        if (category.toLowerCase().trim() !== canonicalCategory.toLowerCase().trim()) {
            redirect(`/shop/${canonicalCategory}/${productData.slug}`);
        }

        const normalizeUrl = (input: unknown): string => {
            if (typeof input !== 'string') return '';
            const trimmed = input.trim();
            if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
                return '';
            }
            return trimmed.startsWith('http') ? trimmed : `https://cms.furnishings.daikimedia.com${trimmed}`;
        };

        const fixedImageUrls = {
            ...productData.images,
            main_image: normalizeUrl(productData.images.main_image),
            gallery: Array.isArray(productData.images.gallery)
                ? productData.images.gallery
                    .map(normalizeUrl)
                    .filter(Boolean)
                : []
        };

        const productWithDefaults = {
            ...productData,
            images: fixedImageUrls,
            category: productData.category || { id: 0, name: 'Uncategorized', slug: 'uncategorized' },
            additional_description: productData.additional_description ?? {
                headline: "",
                sections: [],
            },
            features: productData.features ?? {
                main_features: [],
                benefits: [],
                design_compatibility: []
            },
            specifications: productData.specifications ?? {},
            installation: productData.installation ?? {},
            maintenance: productData.maintenance ?? {},
            faqs: productData.faqs ?? [],
            call_to_action: productData.cta ?? {
                primary: "Contact us for more information",
                secondary: "Get a quote today",
                tertiary: "Professional installation available"
            }
        };

        return (
            <main>
                <PageHeader />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <SingleProduct productData={productWithDefaults as any} />
            </main>
        );
    }

    notFound();
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (!Array.isArray(slug) || slug.length === 0) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }

    const productSlug = slug.length === 1 ? slug[0] : slug[1];
    const productData = await fetchProductBySlug(productSlug);
    if (!productData) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }

    const imageUrl = (() => {
        const normalizeUrl = (input: unknown): string => {
            if (typeof input !== 'string') return '';
            const trimmed = input.trim();
            if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
                return '';
            }
            return trimmed.startsWith('http') ? trimmed : `https://cms.furnishings.daikimedia.com${trimmed}`;
        };
        return normalizeUrl(productData.images.main_image) || '/placeholder.svg';
    })();

    const categorySlug = productData.category?.slug || 'uncategorized';
    const canonicalUrl = `/shop/${categorySlug}/${productData.slug}`;

    const defaultMetaTitle = "Premium Flooring & Furnishings | Furnishings Malaysia";
    const defaultMetaDescription = "Discover premium quality flooring and furnishing products at Furnishings Malaysia. Browse our extensive collection of high-quality products for your home and office.";

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

    const ogTitle = productData.name?.trim() || metaTitle;
    const ogDescription = productData.description?.short?.trim() || metaDescription;

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: productData.seo?.keywords || [],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: [imageUrl],
        },
    };
}


