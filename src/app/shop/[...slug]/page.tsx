// src/app/shop/[...slug]/page.tsx
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import SingleProduct from "@/components/shop/single-product";
import PageHeader from "@/components/common/header";
import ProductLoading from "@/components/shop/product-loading";
import { getProductBySlug } from "@/lib/api";
import { Product, getFullImageUrl } from "@/lib/interfaces";

type Params = {
  slug: string[];
};

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    notFound();
  }

  // URL: /shop/product-slug
  if (slug.length === 1) {
    const productSlug = slug[0];
    const productData = await getProductBySlug(productSlug);

    if (!productData) {
      notFound();
    }

    const categorySlug = productData.category?.slug || "uncategorized";

    // Redirect to canonical URL with category
    redirect(`/shop/${categorySlug}/${productData.slug}`);
  }

  // URL: /shop/category/product
  if (slug.length === 2) {
    const [category, productSlug] = slug;

    return (
      <main>
        <PageHeader />
        <Suspense fallback={<ProductLoading />}>
          <ProductContent category={category} productSlug={productSlug} />
        </Suspense>
      </main>
    );
  }

  notFound();
}

async function ProductContent({
  category,
  productSlug,
}: {
  category: string;
  productSlug: string;
}) {
  const productData = await getProductBySlug(productSlug);

  if (!productData) {
    notFound();
  }

  const canonicalCategory = productData.category?.slug || "uncategorized";

  // Redirect if category in URL doesn't match product's category
  if (category.toLowerCase().trim() !== canonicalCategory.toLowerCase().trim()) {
    redirect(`/shop/${canonicalCategory}/${productData.slug}`);
  }

  // Prepare product data with proper image URLs
  const productWithFullUrls = {
    ...productData,
    images: {
      ...productData.images,
      main_image: getFullImageUrl(productData.images.main_image),
      gallery: (productData.images.gallery || []).map(getFullImageUrl),
      thumbnails: productData.images.thumbnails 
        ? (Array.isArray(productData.images.thumbnails) 
            ? productData.images.thumbnails.map(getFullImageUrl)
            : [])
        : [],
    },
  };

  return <SingleProduct productData={productWithFullUrls} />;
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const productSlug = slug.length === 1 ? slug[0] : slug[1];
  const productData = await getProductBySlug(productSlug);

  if (!productData) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const categorySlug = productData.category?.slug || "uncategorized";

  const imageUrl =
    getFullImageUrl(productData.images.main_image) || "/placeholder.svg";

  const canonicalUrl = `https://www.furnishings.com.my/shop/${categorySlug}/${productData.slug}`;

  const formatTitle = (title?: string) => {
    const baseTitle = title || productData.name;

  const metaTitle =
    productData.seo?.meta_title || `${productData.name} | Furnishings Malaysia`;

  const metaDescription =
    productData.seo?.meta_description ||
    `Shop ${productData.name} at Malaysia. Premium quality flooring solution.`;
    
  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Furnishings Malaysia",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: productData.name,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },

    keywords: productData.seo?.keywords || [],
  };
}
}
