// import ConsultationBanner from "@/components/home/call-to-action";
import FloorCategories from "@/components/home/collection";
import HeroBanner from "@/components/home/hero-section";
// import ProductsSection from "@/components/shop/product-section";
// import SocialMediaBanner from "@/components/home/SocialMediaBanner";
import CertificateMarquee from "@/components/home/Certificate-section";
// import TestimonialsSection from "@/components/home/testinomial-section";
import CategoryTabs from "@/components/home/category-tabs"
import BlogSection from "@/components/home/latest-news";
import FurniturePromoBanner from "@/components/home/sales-card";


export default function Home() {
  return (
    <main>
      <HeroBanner />
      {/* <ConsultationBanner /> */}
      <FloorCategories />
      <CategoryTabs />
      {/* <ProductsSection limit={8} showAll={false} /> */}
      {/* <SocialMediaBanner /> */}
      <CertificateMarquee />
      <FurniturePromoBanner />
      {/* <TestimonialsSection /> */}
      {/* <CategoryTabs /> */}
      <BlogSection />
    </main>
  );
}
