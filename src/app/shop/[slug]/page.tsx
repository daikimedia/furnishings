import { notFound } from "next/navigation";
import SingleProduct from "@/components/shop/single-product";
import vinylSheetFlooringData from "@/data/vinylSheetFlooringData";
import PageHeader from "@/components/common/header";

type Params = {
    slug: string;
};

export default async function ProductPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;

    const productData = vinylSheetFlooringData.products.find(p => p.product.slug === slug);

    if (!productData) {
        notFound();
    }

    // Ensure additional_description is always defined
    const productWithAdditionalDescription = {
        ...productData.product,
        additional_description: productData.product.additional_description ?? {
            headline: "",
            sections: [],
        },
    };

    return (
        <main>
            <PageHeader />
            <SingleProduct productData={productWithAdditionalDescription} />
        </main>
    );
}

export async function generateStaticParams() {
    return vinylSheetFlooringData.products.map(productData => ({
        slug: productData.product.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const productData = vinylSheetFlooringData.products.find(p => p.product.slug === slug);

    if (!productData) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }

    const { product } = productData;

    return {
        title: product.seo.meta_title,
        description: product.seo.meta_description,
        keywords: product.seo.keywords,
        openGraph: {
            title: product.name,
            description: product.description.short,
            images: [product.images.main_image],
        },
    };
}
