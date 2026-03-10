"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Facebook, Twitter, Instagram, Phone, MapPin, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

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
    specifications: any;
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

// Helper function to normalize URLs
const normalizeUrl = (input: unknown): string => {
    if (typeof input !== 'string') return '';
    const trimmed = input.trim();
    if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
        return '';
    }
    return trimmed.startsWith('http') ? trimmed : `https://cms.furnishings.daikimedia.com${trimmed}`;
};

export default function SingleProduct({ productData }: SingleProductProps) {
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<ApiProduct[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(true);

    // Memoize description data parsing
    const descriptionData = useMemo(() => {
        try {
            if (typeof productData.additional_description === 'string') {
                return JSON.parse(productData.additional_description);
            } else if (typeof productData.additional_description === 'object') {
                return productData.additional_description;
            }
        } catch (e) {
            console.error("Invalid JSON in additional_description", e);
        }
        return null;
    }, [productData.additional_description]);

    // Memoize category name
    const categoryName = useMemo(() => {
        return typeof productData.category === 'string' 
            ? productData.category 
            : productData.category?.name;
    }, [productData.category]);

    // Memoize gallery images
    const galleryImages = useMemo(() => {
        return productData.images.gallery?.filter(img => img) || [];
    }, [productData.images.gallery]);

    // Fetch related products from API
    useEffect(() => {
        const abortController = new AbortController();

        const fetchRelatedProducts = async () => {
            try {
                setLoadingRelated(true);
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products', {
                    signal: abortController.signal,
                    next: { revalidate: 3600 }
                });
                
                const result: ProductsApiResponse = await response.json();
                
                if (result.success) {
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

                    setRelatedProducts(filtered);
                }
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Error fetching related products:', error);
                }
            } finally {
                setLoadingRelated(false);
            }
        };

        fetchRelatedProducts();

        return () => abortController.abort();
    }, [categoryName, productData.id]);

    // Memoize static FAQs
    const staticFaqs = useMemo(() => [
        {
            question: "What is this type of flooring?",
            answer: "It's a durable and stylish flooring solution designed to enhance interiors while remaining practical.",
        },
        {
            question: "Is it waterproof?",
            answer: "Yes, it is engineered to resist water, spills, and humidity, making it suitable for tropical climates.",
        },
        {
            question: "How long does it last?",
            answer: "With proper installation and care, it can last between 10–20 years.",
        },
        {
            question: "Is it anti-slip?",
            answer: "Yes, the surface is designed to reduce slipping, making it safe for wet areas.",
        },
        {
            question: "Is it easy to clean?",
            answer: "Yes, simple sweeping and occasional mopping are enough to maintain it.",
        },
        {
            question: "Is it cost-effective?",
            answer: "Yes, it's one of the most budget-friendly options while offering premium looks.",
        },
    ], []);

    // Memoize has valid FAQs
    const hasValidFaqs = useMemo(() => {
        return Array.isArray(productData.faqs) &&
            productData.faqs.length > 0 &&
            productData.faqs.every(
                (faq) => faq.question != null && faq.answer != null
            );
    }, [productData.faqs]);

    // Memoize FAQs to display
    const faqsToDisplay = useMemo(() => {
        return hasValidFaqs ? productData.faqs : staticFaqs;
    }, [hasValidFaqs, productData.faqs, staticFaqs]);

    // Memoize tab content renderer
    const renderTabContent = useCallback(() => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="py-8">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Product Description
                                </h3>
                                <div 
                                    className="text-gray-600 leading-relaxed mb-4 prose max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: productData.description.long || productData.description.short || '' 
                                    }}
                                />
                            </div>

                            {/* Additional Description Sections */}
                            {descriptionData?.sections?.length > 0 && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        {descriptionData.heading ?? descriptionData.headline}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {descriptionData.sections.map((section: any, index: number) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
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
                            
                            {/* Design Compatibility */}
                            {productData.features?.design_compatibility?.length > 0 && (
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
                            )}
                        </div>
                    </div>
                );

            case "specifications":
                return (
                    <div className="py-8 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Product Specifications */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Product Specifications
                                </h4>
                                <div className="space-y-3">
                                    {productData.specifications && 
                                     Object.keys(productData.specifications).length > 0 ? (
                                        Object.entries(productData.specifications).map(([key, value]) => {
                                            if (!value) return null;
                                            return (
                                                <div key={key} className="flex justify-between border-b pb-2">
                                                    <span className="text-gray-600 capitalize">
                                                        {key.replace(/_/g, ' ')}:
                                                    </span>
                                                    <span className="font-medium">
                                                        {typeof value === 'boolean' 
                                                            ? (value ? 'Yes' : 'No') 
                                                            : String(value)}
                                                    </span>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        // Fallback to static specifications
                                        <>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Waterproof:</span>
                                                <span className="font-medium">Yes</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Slip Resistant:</span>
                                                <span className="font-medium">Yes</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Durability:</span>
                                                <span className="font-medium">10 to 15 years</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Installation Type:</span>
                                                <span className="font-medium">Cut and stick down</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-gray-600">Surface Requirement:</span>
                                                <span className="font-medium">Dry, flat surfaces</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Maintenance:</span>
                                                <span className="font-medium">Sweep and damp mop only</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Installation Details */}
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Installation Details
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-medium">Installation Method:</span>
                                        <p className="text-gray-600 text-sm">
                                            {productData.installation?.method || "Cut and stick down onto dry surfaces"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-medium">Surface Types:</span>
                                        <p className="text-gray-600 text-sm">
                                            {(productData.installation?.surface_types || []).join(", ") || "Tile, concrete"}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm mt-4">
                                        {productData.installation?.diy_friendly && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                                DIY Friendly
                                            </span>
                                        )}
                                        {productData.installation?.professional_recommended && (
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                                                Professional Recommended
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        {productData.features?.benefits?.length > 0 && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                    Why Customers Choose This
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
                                    {productData.features.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case "faq":
                return (
                    <div className="py-8">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            Frequently Asked Questions
                        </h3>
                        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-4">
                            {faqsToDisplay.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border rounded-lg px-6"
                                >
                                    <AccordionTrigger className="font-semibold text-gray-900 text-lg hover:text-orange-600 transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 pt-4 pb-6">
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
    }, [activeTab, productData, descriptionData, faqsToDisplay]);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                            <Image
                                src={
                                    galleryImages[selectedImage] ||
                                    productData.images.main_image ||
                                    "/placeholder.svg"
                                }
                                alt={productData.images.alt_texts?.[selectedImage] || productData.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>
                        
                        {/* Thumbnail Images */}
                        {galleryImages.length > 0 && (
                            <div className="flex space-x-4 overflow-x-auto pb-2">
                                {galleryImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === index 
                                                ? 'border-orange-500 scale-105' 
                                                : 'border-transparent hover:border-orange-300'
                                        }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                <span>SKU: <span className="font-medium">{productData.id}</span></span>
                                <span>Brand: <span className="font-medium">{productData.brand}</span></span>
                                <span>Category: <span className="font-medium">{categoryName || 'Uncategorized'}</span></span>
                            </div>
                            
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {productData.name}
                            </h1>
                            
                            <div 
                                className="text-gray-600 leading-relaxed mb-6 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: productData.description.short || '' }}
                            />
                        </div>

                        {/* Key Features Quick Preview */}
                        {productData.features?.main_features?.length > 0 && (
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
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="bg-orange-50 rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-orange-800 text-lg">
                                {productData.call_to_action?.primary || "Get This Product"}
                            </h3>
                            
                            <p className="text-orange-700">
                                {productData.call_to_action?.secondary || "Contact us for pricing and availability"}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link 
                                    href="/contact"
                                    className="flex-1 flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call for Quote
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex-1 flex items-center justify-center border-2 border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 rounded-md transition-colors"
                                >
                                    <MapPin className="w-4 h-4 mr-2" />
                                    Visit Showroom
                                </Link>
                            </div>
                            
                            <p className="text-sm text-orange-600 font-medium">
                                {productData.call_to_action?.tertiary || "Professional installation recommended"}
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="flex items-center space-x-4 pt-4 border-t">
                            <span className="text-gray-600">Share:</span>
                            <div className="flex items-center space-x-3">
                                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all">
                                    <Instagram className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t pt-8">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 border-b">
                        {['description', 'specifications', 'faq'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 font-medium capitalize transition-all relative ${
                                    activeTab === tab
                                        ? 'text-orange-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">{renderTabContent()}</div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
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
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((product) => {
                                    const imageUrl = normalizeUrl(product.images.main_image) || "/placeholder.svg";

                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/shop/${product.category?.slug || 'uncategorized'}/${product.slug}`}
                                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Image Section */}
                                            <div className="relative h-48 overflow-hidden bg-orange-100">
                                                <Image
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover p-4 transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {product.description.short}
                                                </p>
                                                <div className="flex items-center text-orange-600 font-medium">
                                                    <span className="text-sm font-semibold">View Product</span>
                                                    <svg
                                                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}