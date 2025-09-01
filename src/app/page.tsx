import FloorCategories from "@/components/home/collection";
import HeroBanner from "@/components/home/hero-section";
// import ProductsSection from "@/components/shop/product-section";
// import SocialMediaBanner from "@/components/home/SocialMediaBanner";
import CertificateMarquee from "@/components/home/Certificate-section";
import TestimonialsSection from "@/components/home/testinomial-section";
// import CategoryTabs from "@/components/home/category-tabs"

import FurniturePromoBanner from "@/components/home/sales-card";
import FaqSection from "@/components/home/faq-section";
import PricingSection from "@/components/home/pricing-section";
import VinylBenefitsSection from "@/components/home/benefits-section";
import ProcessSection from "@/components/home/process-section";
import FlooringProjectSection from "@/components/home/nationwide-section";
import CompanyOverviewSection from "@/components/home/overview-section";
import MainContentSections from "@/components/home/main-content-section";
import FlooringSection from "@/components/home/flooring-section";
// import CTASection from "@/components/common/CTA-section";
import CTASection2 from "@/components/home/CTA-section2"
import BlogList from "@/components/blogs/blog-section"
export const metadata = {
  title: "Vinyl & PVC Flooring Malaysia | Furnishing Solutions",
  description: "Transform your space in Malaysia with waterproof, stylish vinyl and PVC flooring. Furnishing Solutions offers expert installation and free quotations nationwide.",
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
      {/* <CategoryTabs /> */}
      {/* <ProductsSection limit={8} showAll={false} /> */}
      {/* <SocialMediaBanner /> */}
      <CertificateMarquee />
      <FurniturePromoBanner />
      <ProcessSection />
      <VinylBenefitsSection />
      <PricingSection />
      <FlooringSection />
      <FaqSection />
      {/* <CTASection /> */}
      <TestimonialsSection />
      <FlooringProjectSection />
      <CompanyOverviewSection />
      <CTASection2 />
      <BlogList limit={6} />
    </main>
  );
}
