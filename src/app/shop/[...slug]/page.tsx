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
        const product = result.success ? result.data.find(p => p.slug === slug) : null;
        return product || null;
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

    // Legacy route: /shop/[product]
    if (slug.length === 1) {
        const productSlug = slug[0];
        const productData = await fetchProductBySlug(productSlug);
        if (!productData) {
            notFound();
        }
        const categorySlug = productData.category?.slug || 'uncategorized';
        redirect(`/shop/${categorySlug}/${productSlug}`);
    }

    // Canonical route: /shop/[category]/[product]
    if (slug.length === 2) {
        const [category, productSlug] = slug;
        const productData = await fetchProductBySlug(productSlug);
        if (!productData) {
            notFound();
        }

        const canonicalCategory = productData.category?.slug || 'uncategorized';
        if (category !== canonicalCategory) {
            redirect(`/shop/${canonicalCategory}/${productSlug}`);
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

    return {
        title: productData.seo?.meta_title || productData.name,
        description: productData.seo?.meta_description || productData.description.short,
        keywords: productData.seo?.keywords || [],
        openGraph: {
            title: productData.name,
            description: productData.description.short,
            images: [imageUrl],
        },
    };
}


