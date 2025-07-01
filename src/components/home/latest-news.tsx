'use client';

import Image from 'next/image';

const blogs = [
    {
        id: 1,
        title: 'Top Modern Floor Design Trends of 2025',
        excerpt: 'Explore the latest in luxury vinyl, marble finishes, and textured tiles for your space...',
        image: '/blog1.jpg',
    },
    {
        id: 2,
        title: 'How to Choose the Perfect Flooring for Your Home',
        excerpt: 'A quick guide on selecting the right flooring based on lifestyle, durability, and design...',
        image: '/blog2.jpg',
    },
    {
        id: 3,
        title: '5 Mistakes to Avoid When Designing Floors',
        excerpt: 'Avoid these common floor planning pitfalls to get a flawless interior finish...',
        image: '/blog3.jpg',
    },
];

const BlogSection = () => {
    return (
        <section className="py-16 bg-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-2">Latest News</h2>
                <p className="text-gray-600 mb-10 text-sm sm:text-base">
                    Torem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore
                </p>

                {blogs.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-600">{blog.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg font-medium text-gray-800 mt-8">There are no articles found!</p>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
