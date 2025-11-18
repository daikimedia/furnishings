'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/common/header";
import SquareLoader from "@/components/common/loader";
import RelatedProducts from "@/components/blog/related-products";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    category?: string;
    featuredImage: string;
    content: string;
    author: string;
    publish_date: string;
    excerpt: string;
    tags?: string;
}

export default function SingleBlogContent() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Function to process blog content and fix image URLs
    const processContent = (content: string): string => {
        const baseUrl = 'https://cms.furnishings.daikimedia.com';

        // Replace relative image paths with absolute URLs
        return content.replace(
            /src="\/storage\//g,
            `src="${baseUrl}/storage/`
        ).replace(
            /src='\/storage\//g,
            `src='${baseUrl}/storage/`
        );
    };

    useEffect(() => {
        if (!slug) return;

        const getBlog = async () => {
            try {
                setLoading(true);

                // Option 1: Try a dedicated single blog endpoint first
                let response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/${slug}`);

                if (!response.ok) {
                    // Option 2: If single blog endpoint doesn't exist, fetch all blogs and filter
                    response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/all-blogs`);

                    if (!response.ok) {
                        throw new Error("Failed to fetch blog post");
                    }

                    const allBlogs: BlogPost[] = await response.json();
                    console.log("All blogs fetched:", allBlogs);

                    // Find the blog with matching slug
                    const foundBlog = allBlogs.find(blog => blog.slug === slug);

                    if (!foundBlog) {
                        throw new Error("Blog post not found");
                    }

                    // Process the content to fix image URLs
                    foundBlog.content = processContent(foundBlog.content);
                    setBlog(foundBlog);
                } else {
                    // If dedicated endpoint works
                    const blogData: BlogPost = await response.json();
                    console.log("Single blog fetched:", blogData);

                    // Process the content to fix image URLs
                    blogData.content = processContent(blogData.content);
                    setBlog(blogData);
                }

            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage);
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        getBlog();
    }, [slug]);

    if (loading) {
        return (
            <>
                <PageHeader />
                <SquareLoader />
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
                <PageHeader />
                <section className="py-12 px-6">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Error</h2>
                        <p className="text-red-600">{error || "Blog not found!"}</p>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageHeader />
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Title */}
                    <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>

                    {/* Meta info */}
                    <p className="text-gray-500 mb-6">
                        By {blog.author} | {new Date(blog.publish_date).toDateString()}
                    </p>

                    {/* Featured image */}
                    <div className="relative h-96 w-full mb-8">
                        <Image
                            src={`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>

                    {/* Excerpt */}
                    <p className="text-lg text-gray-700 mb-8">{blog.excerpt}</p>

                    {/* Blog content (HTML rendering with fixed image URLs) */}
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </section>
            
            {/* Related Products Section */}
            <RelatedProducts />
        </>
    );
}

