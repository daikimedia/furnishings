'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/header';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    content?: string;
}

const BlogPage = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/blogs/all-blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                console.log("***************", response);
                const data: BlogPost[] = await response.json();
                setBlogs(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Function to truncate text to 2-3 lines (approximately 120-150 characters)
    const truncateText = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    if (loading) {
        return (
            <>
                <PageHeader />
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-12">Latest News</h2>
                            <p className="text-gray-600 mb-10 text-xl">Loading...</p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    if (error) {
        return (
            <>
                <PageHeader />
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-12">Latest News</h2>
                            <p className="text-red-600 mb-10 text-xl">Error: {error}</p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageHeader />
            <section className="py-12 px-6">
                <div className="container mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-12">Latest News</h2>
                        <p className="text-gray-600 mb-10 text-xl">
                            Stay updated with the latest ideas, inspiration, and innovations from the furnishing world
                        </p>
                    </div>
                    {blogs.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="border rounded-lg overflow-hidden shadow-md border-orange-100 h-full flex flex-col">
                                    <Image
                                        src={`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`}
                                        alt={blog.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover flex-shrink-0"
                                    />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-semibold text-lg mb-3">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                            {truncateText(blog.excerpt)}
                                        </p>
                                        <div className="mt-auto">
                                            <Link
                                                href={`/blog/${blog.slug}`}
                                                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg font-medium text-gray-800 mt-8">There are no articles found!</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogPage;