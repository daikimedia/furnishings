import blogs from '@/data/blogsData';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

const BlogPostPage = async ({ params }: Props) => {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) return notFound();

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-auto rounded mb-6"
            />
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {blog.content}
            </p>
        </div>
    );
};

export default BlogPostPage;