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

async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        let response = await fetch(`https://cms.furnishings.daikimedia.com/api/blogs/${slug}`, {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
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

function truncateTitle(title: string, maxLength: number = 150): string {
    if (title.length <= maxLength) {
        return title;
    }
    return title.substring(0, maxLength).trim() + '...';
}

type Params = {
    slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = 'https://www.furnishings.com.my';
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    const blog = await fetchBlogBySlug(slug);

    const defaultTitle = "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing";
    const defaultDescription = "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog. Discover vinyl, SPC, laminate and carpet tile ideas, maintenance guides and renovation inspiration.";

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

    const metaTitle = truncateTitle(`${blog.title} | Furnishing Solutions`, 150);
    
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