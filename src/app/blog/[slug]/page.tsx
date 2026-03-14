import type { Metadata } from "next";
import SingleBlogContent from "@/components/blog/single-blog-content";
import { getBlogBySlug } from "@/lib/api";
import { Blog } from "@/lib/interfaces";

type Params = {
  slug: string;
};

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {

  const { slug } = await params;

  const blog = await getBlogBySlug(slug) as Blog | null;

  const baseUrl = "https://www.furnishings.com.my";
  const canonicalUrl = `${baseUrl}/blog/${slug}`;

  const defaultTitle =
    "Flooring & Home Décor Blog Malaysia | Vinyl, SPC & Interior Ideas | Furnishing";

  const defaultDescription =
    "Read flooring and home décor tips for Malaysian homes and offices on the Furnishing blog.";

  if (!blog) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      alternates: { canonical: canonicalUrl },
    };
  }
  const title = blog.title || defaultTitle;
  const description = blog.excerpt || blog.content?.substring(0, 160) || defaultDescription;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content?.substring(0, 160),
      images: blog.featuredImage ? [`${baseUrl}${blog.featuredImage}`] : [],
    },
  };
}

export default function SingleBlogPage() {
  return <SingleBlogContent />;
}