"use client";
import { useState, useEffect, type Key, type ReactNode } from "react";
import { Facebook, Twitter, Instagram, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// API Product interface for related products
interface ApiProduct {
    id: number
    name: string
    slug: string
    category: {
        id: number
        name: string
        slug: string
    } | null
    images: {
        main_image: string
        gallery: string[]
    }
    description: {
        short: string
        long: string
    }
}

interface ProductsApiResponse {
    success: boolean
    data: ApiProduct[]
}
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

type ProductData = {
    id: string;
    name: string;
    slug: string;
    category: string | { id: number; name: string; slug: string };
    brand: string;
    images: {
        main_image: string;
        gallery: string[];
        thumbnails: string[];
        alt_texts: string[];
    };
    seo: {
        meta_title: string;
        meta_description: string;
        keywords: string[];
    };
    description: {
        short: string;
        long: string;
    };
    features: {
        main_features: string[];
        benefits: string[];
        design_compatibility: string[];
    };
    specifications: {
        key: ReactNode;
        value: ReactNode;
        waterproof: boolean;
        slip_resistant: boolean;
        durability: string;
        installation_type: string | string[];
        surface_requirement: string;
        maintenance: string;
    };

    installation: {
        method: string;
        surface_types: string[];
        diy_friendly: boolean;
        professional_recommended: boolean;
        requirements: string[];
    };
    maintenance: {
        cleaning_method: string;
        special_treatments: string;
        no_waxing: boolean;
        no_polishing: boolean;
        no_sealants: boolean;
    };
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    call_to_action: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    status: string;
    created_at: string;
    updated_at: string;
    additional_description: {
        headline: string;
        main_title?: string;
        sections: Array<{
            title: string;
            content: string;
        }>;
    };
};

type SingleProductProps = {
    productData: ProductData;
};
export default function SingleProduct({ productData }: SingleProductProps) {
    // Parse JSON string into object safely
    let descriptionData = null;
    console.log("productData.faqs", productData.faqs)
    try {
        if (typeof productData.additional_description === 'string') {
            descriptionData = JSON.parse(productData.additional_description);
        } else if (typeof productData.additional_description === 'object') {
            descriptionData = productData.additional_description;
        }
    } catch (e) {
        console.error("Invalid JSON in additional_description", e);
    }
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);


    // console.log("*************", productData.specifications);
    // Fetch related products from API
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                setLoadingRelated(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
                const result: ProductsApiResponse = await response.json();
                if (result.success) {
                    const categoryName = typeof productData.category === 'string' ? productData.category : productData.category?.name;

                    // First try to get products from same category, excluding current product
                    let filtered = result.data
                        .filter(p =>
                            p.category &&
                            p.category.name === categoryName &&
                            p.id.toString() !== productData.id
                        )
                        .slice(0, 4);

                    // If no products found in same category, get any other products
                    if (filtered.length === 0) {
                        filtered = result.data
                            .filter(p =>
                                p.category &&
                                p.id.toString() !== productData.id
                            )
                            .slice(0, 4);
                    }

                    console.log('Related products found:', filtered.length);
                    setRelatedProducts(filtered);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            } finally {
                setLoadingRelated(false);
            }
        };

        fetchRelatedProducts();
    }, [productData.category, productData.id]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="py-8">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Product Description
                                </h3>
                                <div className="text-gray-600 leading-relaxed mb-4"
                                    dangerouslySetInnerHTML={{ __html: productData.description.long || productData.description.short || '' }}>
                                </div>
                            </div>


                            {/* Additional Description Sections */}
                            {descriptionData?.sections?.length > 0 && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        {descriptionData.heading ?? descriptionData.headline}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {descriptionData.sections.map((section: { title: ReactNode, content: ReactNode }, index: Key) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-md"
                                            >
                                                <h4 className="text-lg font-semibold mb-4 text-orange-800">
                                                    {section.title}
                                                </h4>
                                                <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <h4 className="text-lg font-semibold mb-3">
                                    Design Compatibility
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(productData.features?.design_compatibility)
                                        ? productData.features.design_compatibility.map(
                                            (style, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium"
                                                >
                                                    {style}
                                                </span>
                                            )
                                        )
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "specifications":
                return (
                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Product Specifications
                                </h4>
                                <div className="space-y-3">
                                    {Array.isArray(productData.specifications) &&
                                        productData.specifications.length > 0 &&
                                        productData.specifications.some(spec => spec?.value) ? (
                                        productData.specifications.map((spec, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between border-b pb-2"
                                            >
                                                <span className="text-gray-600">{spec.key}</span>
                                                <span className="font-medium">{spec.value || "N/A"}</span>
                                            </div>
                                        ))
                                    ) : (
                                        // Fallback to static specifications
                                        <>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Waterproof:</span>
                                                <span className="font-medium">yes</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Slip Resistant:</span>
                                                <span className="font-medium">yes</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Durability:</span>
                                                <span className="font-medium">10 to 15 years</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Installation Type:</span>
                                                <span className="font-medium">cut and stick down</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Surface Requirement:</span>
                                                <span className="font-medium">dry, flat surfaces (tile or concrete)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Maintenance:</span>
                                                <span className="font-medium">Sweep and damp mop only</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Installation Details
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <h5 className="font-medium mb-2">Installation Method:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {productData.installation?.method || "Cut and stick down onto dry surfaces"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <h5 className="font-medium mb-2">Surface Types:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {(productData.installation?.surface_types || []).join(", ") || "tile, concrete"}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation?.diy_friendly
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            DIY Friendly: {productData.installation?.diy_friendly ? "Yes" : "No"}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation?.professional_recommended
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            Professional Recommended: {productData.installation?.professional_recommended ? "Yes" : "No"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold mb-4">
                                Why Customers Choose This
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                                {Array.isArray(productData.features?.benefits)
                                    ? productData.features.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-3 h-3 mt-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))
                                    : null}
                            </ul>
                        </div>
                    </div>
                );
                return (
                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Product Specifications
                                </h4>

                                <div className="space-y-3">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">{productData.specifications?.key}</span>
                                        <span className="font-medium">
                                            {productData.specifications?.value}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Slip Resistant:</span>
                                        <span className="font-medium">
                                            {productData.specifications?.slip_resistant ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Durability:</span>
                                        <span className="font-medium">
                                            {productData.specifications?.durability || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Installation Type:</span>
                                        <span className="font-medium">
                                            {productData.specifications?.installation_type || 'Cut and stick down'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Surface Requirement:</span>
                                        <span className="font-medium">
                                            {productData.specifications?.surface_requirement || 'Dry, flat surfaces (tile or concrete)'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Maintenance:</span>
                                        <span className="font-medium">
                                            {productData.specifications?.maintenance || 'Sweep and damp mop only'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Installation Details
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <h5 className="font-medium mb-2">Installation Method:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {productData.installation?.method || 'Cut and stick down onto dry surfaces'}
                                        </p>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <h5 className="font-medium mb-2">Surface Types:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {(productData.installation?.surface_types || []).join(", ") || 'tile, concrete'}
                                        </p>
                                    </div>
                                    {/* <div className="flex justify-between border-b pb-2">
                                        <h5 className="font-medium mb-2">Requirements:</h5>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            {(productData.installation?.requirements || []).map(
                                                (req, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                        {req}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div> */}
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation?.diy_friendly
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            DIY Friendly:{" "}
                                            {productData.installation?.diy_friendly ? "Yes" : "Yes"}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation?.professional_recommended
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            Professional Recommended:{" "}
                                            {productData.installation?.professional_recommended
                                                ? "Yes"
                                                : "Yes"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-lg font-semibold mb-4">
                                Why Customers Choose This
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                                {Array.isArray(productData.features?.benefits)
                                    ? productData.features.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="w-3 h-3 mt-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))
                                    : null}
                            </ul>
                        </div>
                    </div>
                );

            case "faq":
                // Define static FAQs directly here
                const staticFaqs = [
                    {
                        question: "What is this type of flooring?",
                        answer:
                            "It’s a durable and stylish flooring solution designed to enhance interiors while remaining practical.",
                    },
                    {
                        question: "Is it waterproof?",
                        answer:
                            "Yes, it is engineered to resist water, spills, and humidity, making it suitable for tropical climates.",
                    },
                    {
                        question: "Can it be used in humid climates like Malaysia?",
                        answer:
                            "Absolutely. Its moisture resistance makes it perfect for Malaysia’s tropical weather.",
                    },
                    {
                        question: "How long does it last?",
                        answer: "With proper installation and care, it can last between 10–20 years.",
                    },
                    {
                        question: "How is it installed?",
                        answer:
                            "Depending on the type, it can be glued down, loose-laid, or simply placed over existing surfaces.",
                    },
                    {
                        question: "What are the main benefits?",
                        answer:
                            "It’s waterproof, anti-slip, low-maintenance, affordable, and designed for modern spaces.",
                    },
                    {
                        question: "Is it anti-slip?",
                        answer:
                            "Yes, the surface is designed to reduce slipping, making it safe for wet areas.",
                    },
                    {
                        question: "Is it suitable for kitchens and bathrooms?",
                        answer:
                            "Yes, its moisture resistance and easy cleaning make it ideal for high-use areas.",
                    },
                    {
                        question: "Is it easy to clean?",
                        answer: "Yes, simple sweeping and occasional mopping are enough to maintain it.",
                    },
                    {
                        question: "Is it comfortable underfoot?",
                        answer: "Yes, it provides a softer and warmer feel compared to tiles or stone.",
                    },
                    {
                        question: "Can it be installed over existing floors?",
                        answer:
                            "In most cases, yes. It can go over tiles, cement, or other smooth surfaces.",
                    },
                    {
                        question: "Is it cost-effective?",
                        answer:
                            "Yes, it’s one of the most budget-friendly options while offering premium looks.",
                    },
                ];

                // Check if faqs are valid (non-null question and answer)
                const hasValidFaqs = Array.isArray(productData.faqs) &&
                    productData.faqs.length > 0 &&
                    productData.faqs.every(
                        (faq) => faq.question != null && faq.answer != null
                    );

                return (
                    <div className="py-8">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            Frequently Asked Questions
                        </h3>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {hasValidFaqs ? (
                                productData.faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-b pb-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-gray-900 text-lg">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 pt-4">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            ) : (
                                staticFaqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border-b pb-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-gray-900 text-lg">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 pt-4">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            )}
                        </Accordion>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-8 py-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={
                                    productData.images.gallery?.[selectedImage] ||
                                    productData.images.main_image ||
                                    "/placeholder.svg"
                                }
                                alt={productData.images.alt_texts?.[selectedImage] || productData.name}
                                className="w-full h-full object-cover"
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                        {/* Thumbnail Images */}
                        <div className="flex space-x-4 overflow-x-auto">
                            {productData.images.gallery?.map((img, index) => (
                                <div
                                    key={index}
                                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 ${selectedImage === index ? "border-orange-500" : "border-transparent"
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={img || "/placeholder.svg"}
                                        alt={productData.images.alt_texts?.[index] || `Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        width={80}
                                        height={80}
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-2">
                                SKU: <span className="font-medium">{productData.id}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-2">
                                Brand: <span className="font-medium">{productData.brand}</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                                Category:{" "}
                                <span className="font-medium">{typeof productData.category === 'string' ? productData.category : productData.category?.name || 'Uncategorized'}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {productData.name}
                            </h1>
                            <div className="text-gray-600 leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{ __html: productData.description.short || '' }}>
                            </div>
                        </div>

                        {/* Key Features Quick Preview */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold mb-3">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Array.isArray(productData.features?.main_features)
                                    ? productData.features.main_features
                                        .slice(0, 6)
                                        .map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center text-sm text-gray-600"
                                            >
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                {feature}
                                            </div>
                                        ))
                                    : null}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-orange-50 rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-orange-800">
                                Get This Product
                            </h3>
                            <p className="text-orange-700">
                                {productData.call_to_action?.primary || "Contact us for pricing and availability"}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/contact"
                                    className="flex items-center justify-center bg-orange-600  text-white px-6 py-3 rounded-md transition-colors">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call for Quote
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-center border border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-md transition-colors">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Visit Showroom

                                </Link>
                            </div>
                            <p className="text-sm text-orange-600">
                                {productData.call_to_action?.secondary || "Free consultation available"}
                            </p>
                            <p className="text-sm text-orange-500 font-medium">
                                {productData.call_to_action?.tertiary || "Professional installation recommended"}
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center space-x-4 pt-4 border-t">
                            <span className="text-gray-600">Share:</span>
                            <div className="flex items-center space-x-3">
                                <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                                <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer transition-colors" />
                                <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8">
                    {/* Tab Navigation */}
                    <div className="flex space-x-8 border-b">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === "description"
                                ? "text-orange-500 border-b-2 border-orange-500"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab("specifications")}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === "specifications"
                                ? "text-orange-500 border-b-2 border-orange-500"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Specifications
                        </button>
                        <button
                            onClick={() => setActiveTab("faq")}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === "faq"
                                ? "text-orange-500 border-b-2 border-orange-500"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            FAQ
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="h-auto">{renderTabContent()}</div>
                </div>

                {/* Related Products */}
                <div className="border-t pt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Related Products
                    </h2>

                    {loadingRelated ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
                            ))}
                        </div>
                    ) : relatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product) => {
                                // Fix image URL
                                const imageUrl = product.images.main_image?.startsWith('http')
                                    ? product.images.main_image
                                    : `https://cms.furnishings.daikimedia.com${product.images.main_image}`;

                                return (
                                    <Link
                                        key={product.id}
                                        href={`/shop/${product.slug}`}
                                        className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-48 overflow-hidden bg-orange-100">
                                            <Image
                                                src={imageUrl || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover p-4"
                                                width={300}
                                                height={200}
                                            />
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {product.description.short}
                                            </p>
                                            <div className="flex items-center text-orange-600 font-medium">
                                                <span className="text-sm font-semibold">View Product</span>
                                                <svg
                                                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-8">No related products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}