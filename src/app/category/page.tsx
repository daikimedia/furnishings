import type { Metadata } from "next";
import FloorCategories from "@/components/home/collection";

export const metadata: Metadata = {
    title: "Furnishing Malaysia | Vinyl, SPC, Laminate & Carpet Tile Flooring",
    description: "Furnishing supplies vinyl, SPC, laminate and carpet tile flooring in Malaysia for homes and commercial spaces. Explore our collections and speak to our team for tailored recommendations and quotations.",
    alternates: {
        canonical: "https://www.furnishings.com.my/category",
    },
};
export default function CategoryPage() {
    return (
        <FloorCategories />
    )
}