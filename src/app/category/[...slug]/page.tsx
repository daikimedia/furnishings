// src/app/category/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryPage from "@/components/category/category-page";
import PageHeader from "@/components/common/header";
import ProductsLoading from "@/components/shop/products-loading";
import { getCategories } from "@/lib/api";
import { Category } from "@/lib/interfaces";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CategoryPageRoute({ params }: Props) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    notFound();
  }

  const categorySlug = slug[0];
  const categories: Category[] = await getCategories();
  const category = categories.find(
    (c) => c.slug.toLowerCase().trim() === categorySlug.toLowerCase().trim()
  );

  if (!category) {
    notFound();
  }

  return (
    <main>
      <PageHeader />
      <Suspense fallback={<ProductsLoading />}>
        <CategoryPage slug={categorySlug} />
      </Suspense>
    </main>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const categorySlug = slug[0];
  const categories: Category[] = await getCategories();

  const category = categories.find(
    (c) => c.slug.toLowerCase().trim() === categorySlug.toLowerCase().trim()
  );

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  return {
    title: `${category.name} Flooring Malaysia | Furnishings`,
    description: `Browse our collection of ${category.name.toLowerCase()} flooring solutions in Malaysia.`,
    alternates: {
      canonical: `https://www.furnishings.com.my/category/${categorySlug}`,
    },
  };
}