import type { Metadata } from "next";
import BlogList from "@/components/blogs/blog-section";
import PageHeader from "@/components/common/header";

export const metadata: Metadata = {
    title: "Blog – Home Décor Tips & Interior Ideas | Furnishing Solutions",
    description: "Explore expert home décor ideas, furniture styling tips, and modern interior inspiration to refresh your living space beautifully with Furnishing Solutions.",
    alternates: {
        canonical: "https://www.furnishings.com.my/blog",
    },
};

export default function BlogPage() {
    return (
        <>
            <PageHeader />
            <BlogList />
        </>
    )
};
