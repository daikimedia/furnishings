'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import SquareLoader from '../common/loader';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    content?: string;
    publish_date?: string;
    author?: string;
}

interface BlogListProps {
    limit?: number;
    showHeader?: boolean;
    showPagination?: boolean;
    itemsPerPage?: number;
    currentPage?: number; // Add this prop
}

// Cache for blogs
let blogsCache: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const BlogList = ({ 
    limit, 
    showHeader = true, 
    showPagination = false,
    itemsPerPage = 9,
    currentPage: propCurrentPage // Receive the prop
}: BlogListProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Use prop if provided, otherwise get from URL
    const currentPage = propCurrentPage || Number(searchParams.get('page')) || 1;
    
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination calculations
    const totalBlogs = allBlogs.length;
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBlogs = showPagination 
        ? allBlogs.slice(startIndex, startIndex + itemsPerPage)
        : blogs;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                
                // Check cache first
                const now = Date.now();
                if (blogsCache && now - cacheTimestamp < CACHE_DURATION) {
                    console.log('✅ Using cached blogs');
                    setAllBlogs(blogsCache);
                    if (!showPagination) {
                        setBlogs(limit ? blogsCache.slice(0, limit) : blogsCache);
                    }
                    setLoading(false);
                    return;
                }

                console.log('🔄 Fetching fresh blogs...');
                const response = await fetch(
                    'https://cms.furnishings.daikimedia.com/api/blogs/all-blogs'
                );
                
                if (!response.ok) throw new Error('Failed to fetch blogs');
                
                const data: BlogPost[] = await response.json();
                
                // Update cache
                blogsCache = data;
                cacheTimestamp = Date.now();
                setAllBlogs(data);
                
                if (!showPagination) {
                    setBlogs(limit ? data.slice(0, limit) : data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlogs();
    }, [limit, showPagination]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/blog?${params.toString()}`);
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            if (totalPages <= 7) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            }
            
            if (currentPage <= 4) {
                return [1, 2, 3, 4, 5, '...', totalPages];
            } else if (currentPage >= totalPages - 3) {
                return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        };

        const visiblePages = getVisiblePages();

        return (
            <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                >
                    Previous
                </button>
                
                <div className="flex space-x-2">
                    {visiblePages.map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page as number)}
                                className={`w-10 h-10 rounded-md transition-colors ${
                                    currentPage === page
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                >
                    Next
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <SquareLoader text="Loading blogs..." />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }
    
    const displayBlogs = showPagination ? paginatedBlogs : blogs;
    
    if (displayBlogs.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No blogs found</p>
            </div>
        );
    }

    return (
        <section className="py-12 px-6">
            <div className="container mx-auto">
                {showHeader && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Blogs</h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            Stay updated with the latest ideas, inspiration, and innovations
                            from the furnishing world
                        </p>
                    </div>
                )}

                {showPagination && (
                    <div className="mb-6 text-sm text-gray-600">
                        Showing {displayBlogs.length} of {totalBlogs} blog posts • Page {currentPage} of {totalPages}
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayBlogs.map((blog) => {
                        const imageUrl = blog.featuredImage?.startsWith('http')
                            ? blog.featuredImage
                            : `https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`;

                        return (
                            <div
                                key={blog.id}
                                className="border rounded-lg overflow-hidden shadow-md border-orange-100 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="block h-full"
                                >
                                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                        <Image
                                            src={imageUrl || '/placeholder-blog.jpg'}
                                            alt={blog.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="font-semibold text-lg mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-base text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                            {blog.excerpt}
                                        </p>

                                        <div className="mt-auto">
                                            <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                                Read More
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {showPagination && <PaginationControls />}
            </div>
        </section>
    );
};

export default BlogList;