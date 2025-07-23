"use client";

import { usePathname } from "next/navigation";
import vinylSheetFlooringData from "@/data/vinylSheetFlooringData";
import Link from "next/link";

export default function PageHeader() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);
    const lastSegment = paths[paths.length - 1];

    // Fixed: Access p.product.id instead of p.id
    const product = vinylSheetFlooringData.products.find(p => p.product.id === lastSegment);
    const pageTitle = product
        ? product.product.name.toUpperCase()  // Also fixed: product.product.name
        : lastSegment?.replace(/-/g, " ").toUpperCase() || "HOME";

    const breadcrumb = paths.map((segment, index) => {
        const path = "/" + paths.slice(0, index + 1).join("/");

        // Fixed: Access p.product.id and p.product.name
        const productMatch = vinylSheetFlooringData.products.find(p => p.product.id === segment);
        const label = productMatch
            ? productMatch.product.name.toUpperCase()
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