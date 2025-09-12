'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SquareLoader from '../common/loader';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    content?: string;
}

interface BlogListProps {
    limit?: number;
    showHeader?: boolean;
}

const BlogList = ({ limit, showHeader = true }: BlogListProps) => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    'https://cms.furnishings.daikimedia.com/api/blogs/all-blogs'
                );
                if (!response.ok) throw new Error('Failed to fetch blogs');
                const data: BlogPost[] = await response.json();
                setBlogs(limit ? data.slice(0, limit) : data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [limit]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">
        <SquareLoader text="Loading Blogs..." />
    </div>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (blogs.length === 0) return <p>No blogs found</p>;

    return (
        <section className="py-12 px-6">
            <div className="container mx-auto">
                {showHeader && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-12">Our Blogs</h2>
                        <p className="text-gray-600 mb-10 text-xl">
                            Stay updated with the latest ideas, inspiration, and innovations
                            from the furnishing world
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="border rounded-lg overflow-hidden shadow-md border-orange-100 h-full flex flex-col"
                        >
                            <Link
                                href={`/blog/${blog.slug}`}
                                className="block"
                            >
                                <Image
                                    src={`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`}
                                    alt={blog.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover flex-shrink-0"
                                />
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-semibold text-lg mb-3">{blog.title}</h3>
                                    <p className="text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        <button
                                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogList;
