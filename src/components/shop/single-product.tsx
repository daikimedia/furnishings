"use client";
import React, { useState } from "react";
import {
    Star,
    Facebook,
    Twitter,
    Instagram,
} from "lucide-react";
import mockData from "@/data/mockData";
import Link from "next/link";
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number | null;
    discount: number | null;
    image: string;
    category: string;
    isAlreadyAdded: boolean;
};

type SingleProductProps = {
    product: Product;
};

export default function SingleProduct({ product }: SingleProductProps) {
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);

    // Related products - same category ke products, current product ko exclude kar ke
    const relatedProducts = mockData.products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4); // sirf 4 products show karenge

    const thumbnails = [
        product.image,
        // product.image,
        // product.image,
        // product.image
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div className="py-8">
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                        <br />
                        <p className="text-gray-600 leading-relaxed">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
                            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                        </p>
                    </div>
                );
            case "additional":
                return (
                    <div className="py-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold mb-4">Size:</h4>
                                <p className="text-gray-600">S, M, L, XL</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Color:</h4>
                                <p className="text-gray-600">Red, Green, Blue, Yellow, White</p>
                            </div>
                        </div>
                    </div>
                );
            case "reviews":
                return (
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-gray-600 font-semibold">WL</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">White Lewis</h4>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia euismod
                                    vehicula. Phasellus congue nulla.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Add your Review</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Your Rating:</label>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message</label>
                                        <textarea
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
                                            placeholder="Write your review..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Name</label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                                placeholder="Your email"
                                            />
                                        </div>
                                    </div>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className=" bg-white">
            <div className="container mx-auto px-8 py-8">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                        {/* Main Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex space-x-4">
                            {thumbnails.map((thumb, index) => (
                                <div
                                    key={index}
                                    className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === index ? 'border-orange-500' : 'border-transparent'
                                        }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={thumb}
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
                                SKU: <span className="font-medium">#{product.id.toString().padStart(6, '0')}</span>
                            </div>
                            <div className="text-sm text-green-600 mb-4">
                                Availability: <span className="font-medium">10 in Stock</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Specifications</h3>
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">SKU:</span>
                                    <span className="font-medium">Galaxy 6503-23</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Product Type:</span>
                                    <span className="font-medium">06 AMAZON® CARPET TILES NYLON (PROMO)</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Collection:</span>
                                    <span className="font-medium">Galaxy 6503, Universal® Nylon/Pvc</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Product Composition:</span>
                                    <span className="font-medium">100% Universal Nylon 6,6</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Origin:</span>
                                    <span className="font-medium">Asia</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Construction:</span>
                                    <span className="font-medium">Multi-level loop</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Material:</span>
                                    <span className="font-medium">Nylon Carpet</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Unit of Measurement:</span>
                                    <span className="font-medium">box(s)</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">SQFT Per Box:</span>
                                    <span className="font-medium">54</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Thickness/undefined:</span>
                                    <span className="font-medium">6.0 mm</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Backing:</span>
                                    <span className="font-medium">PVC</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Pile Weight:</span>
                                    <span className="font-medium">21oz/yd2 or 710g/m!!</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Certification:</span>
                                    <span className="font-medium">CRI Green Label Plus</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Box Packaging (pcs/box):</span>
                                    <span className="font-medium">20 pcs</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Size Per Piece:</span>
                                    <span className="font-medium">500 mm x 500 mm</span>
                                </div>
                            </div>
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
                            onClick={() => setActiveTab("additional")}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === "additional"
                                ? "text-orange-500 border-b-2 border-orange-500"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Additional Info
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="h-auto">
                        {renderTabContent()}
                    </div>
                </div>


                {relatedProducts.length > 0 && (
                    <div className="border-t pt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product) => (
                                <div key={product.id} className="group">
                                    <div
                                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
                                    >
                                        <Link href={`/shop/${product.id}`}>
                                            {/* Image Container */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 text-base mb-4 line-clamp-2">
                                                    {product.description}
                                                </p>

                                                <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-600 transition-colors duration-300">
                                                    <span className="text-sm font-semibold">View Product</span>
                                                    <svg
                                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Decorative border */}
                                            <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}