import type { Metadata } from "next";
import BlogList from "@/components/blogs/blog-section";
import PageHeader from "@/components/common/header";

export const metadata: Metadata = {
    title: "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing",
    description: "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.",
    alternates: {
        canonical: "https://www.furnishings.com.my/blog",
    },
};

export default function BlogPage() {
    return (
        <>
            <PageHeader title="Flooring & Home Décor Blog in Malaysia" />
            <BlogList />
        </>
    )
};
