import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";
export const metadata = {
    alternates: {
        canonical: "/shop",
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