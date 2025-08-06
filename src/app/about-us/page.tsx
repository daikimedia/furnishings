import AboutUs from "@/components/aboutus/about-us";
import PageHeader from "@/components/common/header";
import CTASection from "@/components/common/CTA-section";

export const metadata = {
    title: "About Us | Furnishing Malaysia – Vinyl & SPC Flooring Experts",
    description: "Explore Furnishing – Malaysia’s vinyl flooring, SPC, and wall panels expert—affordable, waterproof, stylish interiors for homes & businesses. Get a free consultation today.",
}

export default function About() {
    return (<>
        <PageHeader />
        <AboutUs />
        <CTASection />
    </>

    )
}