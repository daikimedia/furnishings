import { notFound, redirect } from "next/navigation";
import SingleProduct from "@/components/shop/single-product";
import CategoryPage from "@/components/category/category-page";
import PageHeader from "@/components/common/header";
import type { Metadata } from "next";

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

// Case-insensitive product fetch
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
            // Case-insensitive slug comparison
            const normalizedSlug = slug.toLowerCase().trim();
            const product = result.data.find(p => p.slug.toLowerCase().trim() === normalizedSlug);
            return product || null;
        }
        return null;
    } catch {
        return null;
    }
}

// Case-insensitive category fetch
async function fetchCategoryBySlug(slug: string): Promise<ApiCategory | null> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories', {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            return null;
        }

        const result: CategoriesApiResponse = await response.json();
        if (result.success && result.data) {
            // Case-insensitive slug comparison
            const normalizedSlug = slug.toLowerCase().trim();
            const category = result.data.find(cat => cat.slug.toLowerCase().trim() === normalizedSlug);
            return category || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

type Params = {
    slug: string[];
};

export default async function CategoryPageRoute({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (!Array.isArray(slug) || slug.length === 0) {
        notFound();
    }

    // Route: /category/[category-slug]/[product-slug]
    if (slug.length === 2) {
        const [categorySlug, productSlug] = slug;
        
        // Fetch product with case-insensitive matching
        const productData = await fetchProductBySlug(productSlug);
        
        if (!productData) {
            notFound();
        }

        // Get canonical category and product slugs from CMS
        const canonicalCategory = productData.category?.slug || 'uncategorized';
        const canonicalProduct = productData.slug;

        // Case-insensitive comparison - if URL doesn't match CMS canonical, redirect
        if (categorySlug.toLowerCase().trim() !== canonicalCategory.toLowerCase().trim() ||
            productSlug.toLowerCase().trim() !== canonicalProduct.toLowerCase().trim()) {
            // Redirect to canonical URL using CMS slugs
            redirect(`/category/${canonicalCategory}/${canonicalProduct}`);
        }

        // Normalize image URLs
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

    // Route: /category/[category-slug] - show category page
    if (slug.length === 1) {
        return (
            <>
                <PageHeader />
                <CategoryPage />
            </>
        );
    }

    notFound();
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;

    if (!Array.isArray(slug) || slug.length === 0) {
        return {
            title: "Category Not Found",
            description: "The category you are looking for does not exist.",
        };
    }

    // If product slug is present, generate product metadata
    if (slug.length === 2) {
        const productSlug = slug[1];
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
        const canonicalUrl = `/category/${categorySlug}/${productData.slug}`;

        const defaultMetaTitle = "Premium Flooring & Furnishings | Furnishings Malaysia";
        const defaultMetaDescription = "Discover premium quality flooring and furnishing products at Furnishings Malaysia. Browse our extensive collection of high-quality products for your home and office.";

        const metaTitle = productData.seo?.meta_title?.trim() || 
                         productData.name?.trim() || 
                         defaultMetaTitle;

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

    // Category metadata
    const categorySlug = slug[0];
    const category = await fetchCategoryBySlug(categorySlug);

    const defaultMetaTitle = "Product Category – Premium Flooring & Furnishing Solutions";
    const defaultMetaDescription = "Browse our premium collection of flooring and furnishing products. Find quality solutions for your home and office.";

    if (!category) {
        return {
            title: defaultMetaTitle,
            description: defaultMetaDescription,
            alternates: {
                canonical: `https://www.furnishings.com.my/category/${categorySlug}`,
            },
        };
    }

    const categoryName = category.name;
    const productsCount = category.products_count || 0;

    const metaTitle = `${categoryName} – Premium Flooring & Furnishing Solutions | Furnishing Solutions`;
    const metaDescription = `Explore our ${categoryName.toLowerCase()} collection with ${productsCount} premium products. Discover quality flooring and furnishing solutions for your home and office.`;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: `https://www.furnishings.com.my/category/${category.slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.furnishings.com.my/category/${category.slug}`,
        },
    };
}

