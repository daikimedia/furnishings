import PageHeader from "@/components/common/header"
import ContactUsPage from "@/components/contact-page/contact-page"
export const metadata = {
    title: "Contact Us | Furnishing – Vinyl & PVC Flooring Experts in Malaysia",
    description: "Need flooring advice in Malaysia? Contact Furnishing for expert guidance, free quotes, and top-quality vinyl & PVC flooring installation nationwide.",
};
export default function ContactUs() {
    return (
        <>
            <PageHeader />
            <ContactUsPage />
        </>
    )
}
