import PageHeader from "@/components/common/header";
import ProductsSection from "@/components/shop/product-section";
export default function Shop() {
    return (
        <main>
            <PageHeader />
            <ProductsSection showAll={true} />
        </main>
    );
}