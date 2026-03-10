import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";
import ProductsLoading from "@/components/shop/products-loading";

export const metadata: Metadata = {
    title: "Shop Vinyl, SPC, Laminate & Carpet Tiles Online in Malaysia | Furnishing",
    description: "Browse all vinyl, SPC, laminate flooring and carpet tiles online at Furnishing Malaysia. Compare designs and finishes, then request a quotation or consultation for your home or office",
    alternates: {
        canonical: "https://www.furnishings.com.my/shop",
    },
};

interface ShopPageProps {
    searchParams?: Promise<{
        page?: string;
        category?: string;
        sort?: string;
    }>;
}

export default async function Shop({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const category = params?.category;
    const sort = params?.sort;

    return (
        <main>
            <PageHeader title="Vinyl & Flooring Solutions in Malaysia" />
            
            
            <Suspense fallback={<ProductsLoading />}>
                <ProductsSection 
                    page={page}
                    category={category}
                    sort={sort}
                    itemsPerPage={12}
                />
            </Suspense>
        </main>
    );
}

export const revalidate = 300;