import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";

export const metadata: Metadata = {
    title: "Shop Modern Furniture & Stylish Home Décor | Furnishing Solutions",
    description: "Discover premium-quality furniture and elegant home décor pieces designed to enhance your space with modern style, comfort, and long-lasting quality.",
    alternates: {
        canonical: "https://www.furnishings.com.my/shop",
    },
};
export default function Shop() {
    return (
        <main>
            <PageHeader />
            <ProductsSection showAll={true} />
        </main>
    );
}