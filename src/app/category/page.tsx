import type { Metadata } from "next";
import FloorCategories from "@/components/home/collection";

export const metadata: Metadata = {
    title: "Shop by Category – Furniture & Home Décor | Furnishing Solutions",
    description: "Browse our furniture and home décor categories to find stylish, durable, and affordable designs that perfectly complement every room in your home.",
    alternates: {
        canonical: "https://www.furnishings.com.my/category",
    },
};
export default function CategoryPage() {
    return (
        <FloorCategories />
    )
}