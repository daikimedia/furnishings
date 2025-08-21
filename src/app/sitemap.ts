// import { MetadataRoute } from 'next'

// // Base URL for your website
// const baseUrl = 'https://www.furnishings.com.my';

// // Static pages that don't change often
// const staticPages = [
//     { url: '/', priority: 1.0 },
//     { url: '/about-us', priority: 0.8 },
//     { url: '/contact', priority: 0.8 },
//     { url: '/blog', priority: 0.7 },
//     { url: '/return-and-refunds-policy', priority: 0.5 },
//     { url: '/terms-&-conditions', priority: 0.5 },
// ];

// // Define types for our API responses
// interface Category {
//     id: string;
//     name: string;
//     slug: string;
//     updatedAt: string;
// }

// interface Product {
//     id: string;
//     name: string;
//     slug: string;
//     updatedAt: string;
//     category?: {
//         slug: string;
//     };
// }

// interface ApiResponse<T> {
//     data: T[];
// }

// // Fetch categories from API
// async function getCategories(): Promise<Category[]> {
//     try {
//         const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories');
//         const data: ApiResponse<Category> = await response.json();
//         return data.data || [];
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return [];
//     }
// }

// // Fetch products from API
// async function getProducts(): Promise<Product[]> {
//     try {
//         const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
//         const data: ApiResponse<Product> = await response.json();
//         return data.data || [];
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return [];
//     }
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const [categories, products] = await Promise.all([
//         getCategories(),
//         getProducts()
//     ]);

//     const currentDate = new Date().toISOString();

//     // Generate sitemap entries for static pages
//     const staticUrls = staticPages.map((page) => ({
//         url: `${baseUrl}${page.url}`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly' as const,
//         priority: page.priority,
//     }));

//     // Generate sitemap entries for category pages
//     const categoryUrls = categories.map((category) => ({
//         url: `${baseUrl}/category/${category.slug}`,
//         lastModified: category.updatedAt || currentDate,
//         changeFrequency: 'weekly' as const,
//         priority: 0.8,
//     }));

//     // Generate sitemap entries for product pages
//     const productUrls = products.map((product) => {
//         // If product has a category, include it in the URL
//         const categorySlug = product.category?.slug || 'products';
//         return {
//             url: `${baseUrl}/shop/${categorySlug}/${product.slug}`,
//             lastModified: product.updatedAt || currentDate,
//             changeFrequency: 'daily' as const,
//             priority: 0.7,
//         };
//     });

//     // Combine all URLs
//     return [
//         ...staticUrls,
//         ...categoryUrls,
//         ...productUrls,
//     ];
// }
