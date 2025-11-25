import PageHeader from "@/components/common/header"
import ContactUsPage from "@/components/contact-page/contact-page"
export const metadata = {
    title: "Contact Furnishing | Vinyl & Flooring Supplier in Malaysia",
    description: "Contact Furnishing for vinyl, SPC, laminate flooring, carpet tiles and artificial grass in Malaysia. Request a site visit, quotation or product recommendation for your project today.",
    alternates: {
        canonical: "/contact",
    },
};
export default function ContactUs() {
    return (
        <>
            <PageHeader title="Contact Furnishing" />
            <ContactUsPage />
        </>
    )
}
