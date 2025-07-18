"use client";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Phone, MapPin } from "lucide-react";
import mockData from "@/data/mockData";
import Link from "next/link";
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
    category: string;
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
        waterproof: boolean;
        slip_resistant: boolean;
        durability: string;
        installation_type: string;
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
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);

    // Related products - same category ke products, current product ko exclude kar ke
    const relatedProducts = mockData.products
        .filter(
            (p) =>
                p.product.category === productData.category &&
                p.product.id !== productData.id
        )
        .slice(0, 4);

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
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {productData.description.long}
                                </p>
                            </div>

                            {/* Additional Description Sections */}
                            {productData.additional_description && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        {productData.additional_description.headline}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {productData.additional_description.sections.map(
                                            (section, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-md "
                                                >
                                                    <h4 className="text-lg font-semibold mb-4 text-orange-800">
                                                        {section.title}
                                                    </h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {section.content}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                            <div>
                                <h4 className="text-lg font-semibold mb-3">
                                    Design Compatibility
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {productData.features.design_compatibility.map(
                                        (style, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium"
                                            >
                                                {style}
                                            </span>
                                        )
                                    )}
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
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Waterproof:</span>
                                        <span className="font-medium">
                                            {productData.specifications.waterproof ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Slip Resistant:</span>
                                        <span className="font-medium">
                                            {productData.specifications.slip_resistant ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Durability:</span>
                                        <span className="font-medium">
                                            {productData.specifications.durability}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Installation Type:</span>
                                        <span className="font-medium">
                                            {productData.specifications.installation_type}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Surface Requirement:</span>
                                        <span className="font-medium">
                                            {productData.specifications.surface_requirement}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Maintenance:</span>
                                        <span className="font-medium">
                                            {productData.specifications.maintenance}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Installation Details
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="font-medium mb-2">Installation Method:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {productData.installation.method}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium mb-2">Surface Types:</h5>
                                        <p className="text-gray-600 text-sm">
                                            {productData.installation.surface_types.join(", ")}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium mb-2">Requirements:</h5>
                                        <ul className="text-gray-600 text-sm space-y-1">
                                            {productData.installation.requirements.map(
                                                (req, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                                        {req}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation.diy_friendly
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            DIY Friendly:{" "}
                                            {productData.installation.diy_friendly ? "Yes" : "No"}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full ${productData.installation.professional_recommended
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            Professional Recommended:{" "}
                                            {productData.installation.professional_recommended
                                                ? "Yes"
                                                : "No"}
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
                                {productData.features.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-3 h-3 mt-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                                        <span className="text-gray-600">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );

            case "faq":
                return (
                    <div className="py-8">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            Frequently Asked Questions
                        </h3>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {productData.faqs.map((faq, index) => (
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
                            ))}
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
                            <img
                                src={
                                    productData.images.gallery[selectedImage] ||
                                    "/placeholder.svg"
                                }
                                alt={productData.images.alt_texts[selectedImage]}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Thumbnail Images */}
                        <div className="flex space-x-4 overflow-x-auto">
                            {productData.images.thumbnails.map((thumb, index) => (
                                <div
                                    key={index}
                                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 ${selectedImage === index
                                        ? "border-orange-500"
                                        : "border-transparent"
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={thumb || "/placeholder.svg"}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
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
                                <span className="font-medium">{productData.category}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {productData.name}
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {productData.description.short}
                            </p>
                        </div>

                        {/* Key Features Quick Preview */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold mb-3">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {productData.features.main_features
                                    .slice(0, 6)
                                    .map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center text-sm text-gray-600"
                                        >
                                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-orange-50 rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-orange-800">
                                Get This Product
                            </h3>
                            <p className="text-orange-700">
                                {productData.call_to_action.primary}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="flex items-center justify-center bg-orange-600  text-white px-6 py-3 rounded-md transition-colors">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call for Quote
                                </button>
                                <button className="flex items-center justify-center border border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-md transition-colors">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Visit Showroom
                                </button>
                            </div>
                            <p className="text-sm text-orange-600">
                                {productData.call_to_action.secondary}
                            </p>
                            <p className="text-sm text-orange-500 font-medium">
                                {productData.call_to_action.tertiary}
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center space-x-4 pt-4 border-t">
                            <span className="text-gray-600">Share:</span>
                            <div className="flex items-center space-x-3">
                                <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                                <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
                                <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
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
                {relatedProducts.length > 0 && (
                    <div className="border-t pt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((productItem) => (
                                <Link
                                    key={productItem.product.id}
                                    href={`/shop/${productItem.product.slug}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 overflow-hidden bg-orange-100">
                                        <img
                                            src={productItem.product.images.main_image || "/placeholder.svg"}
                                            alt={productItem.product.name}
                                            className="w-full h-full object-cover p-4 "
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                            {productItem.product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {productItem.product.description.short}
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

                                    {/* Decorative Accent */}

                                </Link>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
