import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleBlogContent from "@/components/blog/single-blog-content";
import { getBlogBySlug } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  const baseUrl = "https://www.furnishings.com.my";

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }


  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || "",
    alternates: {
        canonical: `https://www.furnishings.com.my/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt || "",
      images: blog.featuredImage ? [`${baseUrl}/storage/${blog.featuredImage}`] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }
  return <SingleBlogContent blog={blog} />;
}

export const revalidate = 1800;