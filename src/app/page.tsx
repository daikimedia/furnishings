import FloorCategories from "@/components/home/collection";
import HeroBanner from "@/components/home/hero-section";
import CertificateMarquee from "@/components/home/Certificate-section";
import TestimonialsSection from "@/components/home/testinomial-section";
import FurniturePromoBanner from "@/components/home/sales-card";
import FaqSection from "@/components/home/faq-section";
import PricingSection from "@/components/home/pricing-section";
import VinylBenefitsSection from "@/components/home/benefits-section";
import ProcessSection from "@/components/home/process-section";
import FlooringProjectSection from "@/components/home/nationwide-section";
import CompanyOverviewSection from "@/components/home/overview-section";
import MainContentSections from "@/components/home/main-content-section";
import FlooringSection from "@/components/home/flooring-section";
import CTASection2 from "@/components/home/CTA-section2"
import BlogList from "@/components/blogs/blog-section"
export const metadata = {
  title: "Vinyl Flooring Malaysia | SPC, Laminate & Carpet Tiles | Furnishing",
  description: "Shop vinyl flooring, SPC, laminate and carpet tiles in Malaysia with Furnishing. Get water-resistant, durable flooring solutions for homes and commercial spaces with a free quotation.",
  alternates: {
    canonical: "https://www.furnishings.com.my",
  },
};

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <MainContentSections />

      <FloorCategories />
      <CertificateMarquee />
      <FurniturePromoBanner />
      <ProcessSection />
      <VinylBenefitsSection />
      <PricingSection />
      <FlooringSection />
      <FaqSection />
      <TestimonialsSection />
      <FlooringProjectSection />
      <CompanyOverviewSection />
      <CTASection2 />
      <BlogList limit={6} />
    </main>
  );
}
