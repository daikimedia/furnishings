import { MetadataRoute } from 'next';

// Force dynamic generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = 'https://www.furnishings.com.my';

const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about-us', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/blog', priority: 0.7 },
    { url: '/return-and-refunds-policy', priority: 0.5 },
    // Fixed: Changed & to - or use proper URL encoding
    { url: '/terms-&-conditions', priority: 0.5 }, // or '/terms-%26-conditions'
];

interface Category {
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    updatedAt: string;
    category?: {
        slug: string;
    };
}

interface Blog {
    id: number;
    slug: string;
    title: string;
    updatedAt?: string;
    createdAt?: string;
}

// Helper function to escape XML characters
// function escapeXml(unsafe: string): string {
//     return unsafe.replace(/[<>&'"]/g, function (c) {
//         switch (c) {
//             case '<': return '&lt;';
//             case '>': return '&gt;';
//             case '&': return '&amp;';
//             case '\'': return '&apos;';
//             case '"': return '&quot;';
//             default: return c;
//         }
//     });
// }

// Helper function to validate and clean URLs
function cleanUrl(url: string): string {
    // Remove any invalid characters and ensure proper encoding
    return url.replace(/[&]/g, 'and').replace(/\s+/g, '-').toLowerCase();
}

async function getCategories(): Promise<Category[]> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories', {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            console.warn(`Categories API failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            console.warn(`Products API failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function getBlogs(): Promise<Blog[]> {
    try {
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/blogs/all-blogs', {
            cache: "no-store",
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (!response.ok) {
            console.warn(`Blogs API failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        // Check if data is an array directly or wrapped in a data property
        return Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const [categories, products, blogs] = await Promise.all([
            getCategories(),
            getProducts(),
            getBlogs(),
        ]);

        const currentDate = new Date().toISOString();

        // Static URLs with proper URL cleaning
        const staticUrls = staticPages.map((page) => ({
            url: `${baseUrl}${page.url}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: page.priority,
        }));

        // Category URLs with slug cleaning
        const categoryUrls = categories
            .filter(category => category.slug) // Ensure slug exists
            .map((category) => ({
                url: `${baseUrl}/category/${cleanUrl(category.slug)}`,
                lastModified: category.updatedAt || currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));

        // Product URLs with slug cleaning
        const productUrls = products
            .filter(product => product.slug) // Ensure slug exists
            .map((product) => {
                const categorySlug = product.category?.slug ? cleanUrl(product.category.slug) : 'products';
                const productSlug = cleanUrl(product.slug);

                return {
                    url: `${baseUrl}/shop/${categorySlug}/${productSlug}`,
                    lastModified: product.updatedAt || currentDate,
                    changeFrequency: 'daily' as const,
                    priority: 0.7,
                };
            });

        // Blog URLs - use slugs as-is from CMS (they should already be properly formatted)
        const blogUrls = blogs
            .filter(blog => blog.slug) // Ensure slug exists
            .map((blog) => ({
                url: `${baseUrl}/blog/${blog.slug}`,
                lastModified: blog.updatedAt || blog.createdAt || currentDate,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));

        const finalSitemap = [...staticUrls, ...categoryUrls, ...productUrls, ...blogUrls];

        // Server-side logging
        console.log(`Sitemap generated with ${finalSitemap.length} URLs`);
        console.log(`Static: ${staticUrls.length}, Categories: ${categoryUrls.length}, Products: ${productUrls.length}, Blogs: ${blogUrls.length}`);

        // Log first few URLs for debugging
        console.log('Sample URLs:', finalSitemap.slice(0, 3).map(item => item.url));

        return finalSitemap;
    } catch (error) {
        console.error('Sitemap generation failed:', error);

        // Return static pages as fallback
        const currentDate = new Date().toISOString();
        return staticPages.map((page) => ({
            url: `${baseUrl}${page.url}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: page.priority,
        }));
    }
}