import { notFound } from "next/navigation";
import SingleProduct from "@/components/shop/single-product";
import PageHeader from "@/components/common/header";

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
            next: { revalidate: 30 } // Revalidate every hour
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

    if (!productData) {
        notFound();
    }

    // Fix image URLs
    const fixedImageUrls = {
        ...productData.images,
        main_image: productData.images.main_image?.startsWith('http') 
            ? productData.images.main_image 
            : `https://cms.furnishings.daikimedia.com${productData.images.main_image}`,
        gallery: productData.images.gallery?.map(img => 
            img.startsWith('http') ? img : `https://cms.furnishings.daikimedia.com${img}`
        ) || []
    };

    // Ensure all required fields are properly defined
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

    // Fix image URL for metadata
    const imageUrl = productData.images.main_image?.startsWith('http') 
        ? productData.images.main_image 
        : `https://cms.furnishings.daikimedia.com${productData.images.main_image}`;

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
