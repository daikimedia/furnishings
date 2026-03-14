import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/common/header";
import BlogList from "@/components/blogs/blog-section";
import ProductsLoading from "@/components/shop/products-loading";

export const metadata: Metadata = {
    title: "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing",
    description: "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
    alternates: {
        canonical: "https://www.furnishings.com.my/blog",
    },
};

interface BlogPageProps {
  searchParams?: {
    page?: string;
  };
}

export default function BlogPage({ searchParams }: BlogPageProps) {

  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main>
      <PageHeader title="Flooring & Home Décor Blog in Malaysia" />

      <Suspense fallback={<ProductsLoading />}>
        <BlogList
          showPagination={true}
          itemsPerPage={9}
          currentPage={currentPage}
        />
      </Suspense>

    </main>
  );
}

export const revalidate = 300;
