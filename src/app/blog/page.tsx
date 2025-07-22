'use client';

import Image from 'next/image';
import Link from 'next/link';
import blogs from '@/data/blogsData';
import PageHeader from '@/components/common/header';

const BlogPage = () => {
    return (<>
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
                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="h-full">
                                <div className="border rounded-lg overflow-hidden shadow-md border-orange-100 cursor-pointer h-full flex flex-col">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover flex-shrink-0"
                                    />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 flex-1">{blog.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
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