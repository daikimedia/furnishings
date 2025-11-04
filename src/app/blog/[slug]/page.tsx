import type { Metadata } from "next";
import SingleBlogContent from "@/components/blog/single-blog-content";

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

// Fetch blog data for metadata
async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        // Try dedicated single blog endpoint first
        let response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/${slug}`, {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            // Fallback: Fetch all blogs and filter
            response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/all-blogs`, {
                cache: "no-store",
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });

            if (!response.ok) {
                return null;
            }

            const allBlogs: BlogPost[] = await response.json();
            const foundBlog = allBlogs.find(blog => blog.slug === slug);
            return foundBlog || null;
        }

        const blogData: BlogPost = await response.json();
        return blogData;
    } catch (error) {
        console.error('Error fetching blog for metadata:', error);
        return null;
    }
}

// Helper function to truncate title to 150 characters
function truncateTitle(title: string, maxLength: number = 150): string {
    if (title.length <= maxLength) {
        return title;
    }
    return title.substring(0, maxLength).trim() + '...';
}

type Params = {
    slug: string;
};

// Generate metadata for SEO including canonical tag
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = 'https://www.furnishings.com.my';
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    // Fetch blog data
    const blog = await fetchBlogBySlug(slug);

    // Default meta values
    const defaultTitle = "Blog – Home Décor Tips & Interior Ideas | Furnishing Solutions";
    const defaultDescription = "Explore expert home décor ideas, furniture styling tips, and modern interior inspiration to refresh your living space beautifully with Furnishing Solutions.";

    if (!blog) {
        return {
            title: defaultTitle,
            description: defaultDescription,
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: defaultTitle,
                description: defaultDescription,
                url: canonicalUrl,
            },
        };
    }

    // Generate meta title (max 150 characters)
    const metaTitle = truncateTitle(`${blog.title} | Furnishing Solutions`, 150);
    
    // Use excerpt for description, or generate one from content
    const metaDescription = blog.excerpt 
        ? blog.excerpt.length > 160 
            ? blog.excerpt.substring(0, 160).trim() + '...'
            : blog.excerpt
        : defaultDescription;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: canonicalUrl,
            type: 'article',
            authors: [blog.author],
            publishedTime: blog.publish_date,
            images: blog.featuredImage 
                ? [`https://cms.furnishings.daikimedia.com/storage/${blog.featuredImage}`]
                : [],
        },
    };
}

export default function SingleBlogPage() {
    return <SingleBlogContent />;
}