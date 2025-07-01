"use client";

import { usePathname } from "next/navigation";
import mockData from "@/data/mockData";
import Link from "next/link";

export default function PageHeader() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];

    const product = mockData.products.find(p => p.id === Number(lastSegment));
    const pageTitle = product
        ? product.name.toUpperCase()
        : lastSegment?.replace(/-/g, " ").toUpperCase() || "HOME";

    const breadcrumb = paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");

        // Try to find if this segment is a product ID
        const productMatch = mockData.products.find(p => p.id === Number(segment));
        const label = productMatch
            ? productMatch.name.toUpperCase()
            : segment.replace(/-/g, " ").toUpperCase();

        return (
            <span key={index}>
                <span className="mx-1">/</span>
                <a href={path} className="hover:underline">
                    {label}
                </a>
            </span>
        );
    });

    return (
        <div className="bg-gray-100 py-12 text-center h-48">
            <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
            <div className="mt-2 text-gray-600 text-sm">
                <Link href="/" className="hover:underline">
                    HOME
                </Link>
                {breadcrumb}
            </div>
        </div>
    );
}
