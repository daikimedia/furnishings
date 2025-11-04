import type { Metadata } from "next";
import CategoryPage from "@/components/category/category-page";
import PageHeader from "@/components/common/header";

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    products_count: number;
}

interface CategoriesApiResponse {
    success: boolean;
    data: ApiCategory[];
}

// Category-specific meta data mapping
const categoryMetaData: Record<string, { title: string; description: string }> = {
    'flooring': {
        title: 'Flooring Solutions for Modern Spaces | Furnishing Solutions',
        description: 'Stylish and durable flooring solutions designed for modern homes and offices, offering lasting comfort, premium quality, and timeless visual appeal.'
    },
    'carpet-tiles': {
        title: 'Durable Carpet Tiles for Offices & Homes | Furnishing Solutions',
        description: 'Durable carpet tiles designed for offices and homes, combining comfort, easy maintenance, and long-lasting performance for high-traffic environments.'
    },
    'artificial-grass': {
        title: 'Premium Artificial Grass for Indoors & Outdoors | Furnishing Solutions',
        description: 'Premium artificial grass offering a natural look, durability, and minimal maintenance for gardens, balconies, and indoor or outdoor living areas.'
    },
    'spc-laminate': {
        title: 'SPC & Laminate Flooring for Every Style | Furnishing Solutions',
        description: 'SPC and laminate flooring built for strength, beauty, and comfort. Perfect for modern homes, offices, and spaces needing a stylish, durable finish.'
    },
    'alberta': {
        title: 'Alberta Flooring Collection - Stylish & Durable | Furnishing Solutions',
        description: 'Alberta Flooring Collection blends elegant textures with long-lasting durability, ideal for enhancing both residential and commercial interiors.'
    },
    'versafloor': {
        title: 'Versafloor Collection - Quality Flooring Designs | Furnishing Solutions',
        description: 'Versafloor Collection offers superior design, durability, and easy installation, making it perfect for home renovations and professional interiors.'
    },
    'vinyl-sheet-flooring': {
        title: 'Vinyl Sheet Flooring for Homes & Businesses | Furnishing Solutions',
        description: 'Vinyl sheet flooring crafted for comfort, resilience, and easy upkeep, providing a stylish and practical solution for homes and commercial spaces.'
    }
};

// Fetch category by slug for fallback
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
        console.error('Error fetching category for metadata:', error);
        return null;
    }
}

type Params = {
    slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    
    // Check if we have specific meta data for this category
    const specificMeta = categoryMetaData[slug];
    
    if (specificMeta) {
        // Use specific meta data from mapping
        return {
            title: specificMeta.title,
            description: specificMeta.description,
            alternates: {
                canonical: `https://www.furnishings.com.my/category/${slug}`,
            },
            openGraph: {
                title: specificMeta.title,
                description: specificMeta.description,
                url: `https://www.furnishings.com.my/category/${slug}`,
            },
        };
    }
    
    // Fallback: Fetch category and generate dynamic meta
    const category = await fetchCategoryBySlug(slug);
    
    // Default static meta values
    const defaultMetaTitle = "Product Category – Premium Flooring & Furnishing Solutions";
    const defaultMetaDescription = "Browse our premium collection of flooring and furnishing products. Find quality solutions for your home and office.";

    if (!category) {
        return {
            title: defaultMetaTitle,
            description: defaultMetaDescription,
            alternates: {
                canonical: `https://www.furnishings.com.my/category/${slug}`,
            },
        };
    }

    // Dynamic meta title and description based on category
    const categoryName = category.name;
    const productsCount = category.products_count || 0;

    const metaTitle = `${categoryName} – Premium Flooring & Furnishing Solutions | Furnishing Solutions`;
    const metaDescription = `Explore our ${categoryName.toLowerCase()} collection with ${productsCount} premium products. Discover quality flooring and furnishing solutions for your home and office.`;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: `https://www.furnishings.com.my/category/${slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: `https://www.furnishings.com.my/category/${slug}`,
        },
    };
}

export default function Page() {
    return <>
        <PageHeader />
        <CategoryPage />
    </>
}

