import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryPage from "@/components/category/category-page";
import PageHeader from "@/components/common/header";
import ProductsLoading from "@/components/shop/products-loading";

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

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

interface ProductsApiResponse {
    success: boolean
    data: ApiProduct[]
}

interface CategoriesApiResponse {
    success: boolean;
    data: ApiCategory[];
}

let productsCache: ApiProduct[] | null = null;
let productsCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

async function getCategoryBySlug(slug: string): Promise<ApiCategory | null> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories', {
            next: { revalidate: 300 }
        });
        
        if (!response.ok) return null;
        
        const result: CategoriesApiResponse = await response.json();
        if (!result.success) return null;
        
        const normalizedSlug = slug.toLowerCase().trim();
        const category = result.data.find(c => c.slug.toLowerCase().trim() === normalizedSlug);
        return category || null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

type Props = {
    params: Promise<{ slug: string[] }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CategoryPageRoute({ params }: Props) {
    const { slug } = await params;
    
    if (!Array.isArray(slug) || slug.length === 0) {
        notFound();
    }

    // Get the category slug (first segment)
    const categorySlug = slug[0];
    
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
        notFound();
    }

    return (
        <main>
            <PageHeader />
            <Suspense fallback={<ProductsLoading />}>
                <CategoryPage slug={categorySlug} />
            </Suspense>
        </main>
    );
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    
    if (!Array.isArray(slug) || slug.length === 0) {
        return {
            title: 'Category Not Found',
            description: 'The category you are looking for does not exist.'
        };
    }

    const categorySlug = slug[0];
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
        return {
            title: 'Category Not Found',
            description: 'The category you are looking for does not exist.'
        };
    }

    return {
        title: `${category.name} Flooring Malaysia | Furnishings`,
        description: `Browse our collection of ${category.name.toLowerCase()} flooring solutions in Malaysia.`,
        alternates: {
            canonical: `https://www.furnishings.com.my/category/${categorySlug}`,
        }
    };
}

export const revalidate = 300;