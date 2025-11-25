import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";

export const metadata: Metadata = {
    title: "Shop Vinyl, SPC, Laminate & Carpet Tiles Online in Malaysia | Furnishing",
    description: "Browse all vinyl, SPC, laminate flooring and carpet tiles online at Furnishing Malaysia. Compare designs and finishes, then request a quotation or consultation for your home or office.",
    alternates: {
        canonical: "https://www.furnishings.com.my/shop",
    },
};
export default function Shop() {
    return (
        <main>
            <PageHeader title="Vinyl & Flooring Solutions in Malaysia" />
            <ProductsSection showAll={true} />
        </main>
    );
}