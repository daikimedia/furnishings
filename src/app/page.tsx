import FloorCategories from "@/components/home/collection";
import HeroBanner from "@/components/home/hero-section";
// import ProductsSection from "@/components/shop/product-section";
// import SocialMediaBanner from "@/components/home/SocialMediaBanner";
import CertificateMarquee from "@/components/home/Certificate-section";
import TestimonialsSection from "@/components/home/testinomial-section";
import CategoryTabs from "@/components/home/category-tabs"
import BlogSection from "@/components/home/latest-news";
import FurniturePromoBanner from "@/components/home/sales-card";
import FaqSection from "@/components/home/faq-section";
import PricingSection from "@/components/home/pricing-section";
import VinylBenefitsSection from "@/components/home/benefits-section";
import ProcessSection from "@/components/home/process-section";
import FlooringProjectSection from "@/components/home/nationwide-section";
import CompanyOverviewSection from "@/components/home/overview-section";
import MainContentSections from "@/components/home/main-content-section";


export const metadata = {
  title: "Vinyl & PVC Flooring Malaysia | Furnishing Solutions",
  description: "Transform your space in Malaysia with waterproof, stylish vinyl and PVC flooring. Furnishing Solutions offers expert installation and free quotations nationwide.",
};

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <MainContentSections />

      <FloorCategories />
      <CategoryTabs />
      {/* <ProductsSection limit={8} showAll={false} /> */}
      {/* <SocialMediaBanner /> */}
      <CertificateMarquee />
      <FurniturePromoBanner />
      <ProcessSection />
      <VinylBenefitsSection />
      <PricingSection />

      <FaqSection />
      <TestimonialsSection />
      <FlooringProjectSection />
      <CompanyOverviewSection />
      <BlogSection />
    </main>
  );
}
