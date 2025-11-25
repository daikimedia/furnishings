import AboutUs from "@/components/aboutus/about-us";
import PageHeader from "@/components/common/header";
import CTASection from "@/components/common/CTA-section";

export const metadata = {
    title: "About Furnishing | Vinyl, SPC & Flooring Supplier in Malaysia",
    description: "Learn about Furnishing, a specialist in vinyl, SPC, laminate flooring, carpet tiles and artificial grass in Malaysia. Discover our experience, project expertise and customer support for homes and commercial spaces.",
    alternates: {
        canonical: "https://www.furnishings.com.my/about-us",
    },
}

export default function About() {
    return (<>
        <PageHeader title="About Furnishing Malaysia" />
        <AboutUs />
        <CTASection />
    </>

    )
}