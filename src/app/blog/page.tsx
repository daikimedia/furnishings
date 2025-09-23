import BlogList from "@/components/blogs/blog-section";
import PageHeader from "@/components/common/header";

export const metadata = {
    alternates: {
        canonical: "/blog",
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
