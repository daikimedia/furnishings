import { notFound } from "next/navigation";
import SingleProduct from "@/components/shop/single-product";
import mockData from "@/data/mockData";
import PageHeader from "@/components/common/header";

type Params = Promise<{
    slug: string;
}>;

export default async function ProductPage({ params }: { params: Params }) {
    const { slug } = await params;

    const productId = parseInt(slug);

    const product = mockData.products.find(p => p.id === productId);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <PageHeader />
            <SingleProduct product={product} />
        </main>
    );
}


export async function generateStaticParams() {
    return mockData.products.map((product) => ({
        slug: product.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Params }) {

    const { slug } = await params;
    const productId = parseInt(slug);
    const product = mockData.products.find(p => p.id === productId);

    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'The product you are looking for does not exist.',
        };
    }

    return {
        title: `${product.name} - Your Store`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}