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

const categoryMetaData: Record<string, { title: string; description: string }> = {
    'flooring': {
        title: 'Flooring in Malaysia | Furnishing',
        description: 'Find quality flooring solutions in Malaysia including vinyl, SPC, laminate, carpet tiles and artificial grass. Browse collections from Furnishing and request a quotation for your project.'
    },
    'carpet-tiles': {
        title: 'Carpet Tiles in Malaysia | Furnishing',
        description: 'Shop durable carpet tiles in Malaysia for offices, schools and homes. Enjoy modular designs, easy replacement and stylish colours from Furnishing.'
    },
    'artificial-grass': {
        title: 'Artificial Grass in Malaysia | Furnishing',
        description: 'Choose premium artificial grass in Malaysia for balconies, gardens and indoor spaces. Soft underfoot, low maintenance and realistic looking turf supplied by Furnishing.'
    },
    'spc-laminate': {
        title: 'SPC & Laminate Flooring in Malaysia | Furnishing',
        description: 'Explore SPC and laminate flooring collections in Malaysia. Scratch-resistant and easy to maintain, perfect for modern homes and offices with Furnishing guidance.'
    },
    'alberta': {
        title: 'Alberta Flooring in Malaysia | Furnishing',
        description: 'Find quality flooring solutions in Malaysia including vinyl, SPC, laminate, carpet tiles and artificial grass. Browse collections from Furnishing and request a quotation for your project.'
    },
    'versafloor': {
        title: 'Versafloor Vinyl Flooring in Malaysia | Furnishing',
        description: 'Find quality flooring solutions in Malaysia including vinyl, SPC, laminate, carpet tiles and artificial grass. Browse collections from Furnishing and request a quotation for your project.'
    },
    'vinyl-sheet-flooring': {
        title: 'Vinyl Sheet Flooring in Malaysia | Furnishing',
        description: 'Discover vinyl sheet flooring in Malaysia with cushioned comfort, sound reduction and easy maintenance. Ideal for homes, schools, clinics and commercial spaces with expert support from Furnishing.'
    }
};

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
    
    const specificMeta = categoryMetaData[slug];
    
    if (specificMeta) {
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
    
    const category = await fetchCategoryBySlug(slug);
    
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

