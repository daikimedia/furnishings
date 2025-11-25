'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
    const router = useRouter();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    
    const processContent = (content: string): string => {
        const baseUrl = 'https://cms.furnishings.daikimedia.com';
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

                let response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/${slug}`);

                if (!response.ok) {
                    response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/all-blogs`);

                    if (!response.ok) {
                        router.replace('/404');
                        return;
                    }

                    const allBlogs: BlogPost[] = await response.json();
                    const foundBlog = allBlogs.find(blog => blog.slug === slug);

                    if (!foundBlog) {
                        router.replace('/404');
                        return;
                    }

                    foundBlog.content = processContent(foundBlog.content);
                    setBlog(foundBlog);
                } else {
                    const blogData: BlogPost = await response.json();
                    blogData.content = processContent(blogData.content);
                    setBlog(blogData);
                }

            } catch (err) {
                console.error('Error fetching blog:', err);
                router.replace('/404');
            } finally {
                setLoading(false);
            }
        };

        getBlog();
    }, [slug, router]);

    if (loading) {
        return (
            <>
                <PageHeader />
                <SquareLoader />
            </>
        );
    }

    if (!blog) {
        return null;
    }

    return (
        <>
            <PageHeader title={blog.title} />
            <section className="py-12 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>

                    <p className="text-gray-500 mb-6">
                        By {blog.author} | {new Date(blog.publish_date).toDateString()}
                    </p>

                    <div className="relative h-96 w-full mb-8">
                        <Image
                            src={`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`}
                            alt={blog.title}
                            fill
                            className="object-cover rounded-lg"
                            priority
                        />
                    </div>

                    <p className="text-lg text-gray-700 mb-8">{blog.excerpt}</p>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </section>
            
            <RelatedProducts />
        </>
    );
}

