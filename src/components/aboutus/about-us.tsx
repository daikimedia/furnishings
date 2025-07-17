import React from 'react';
import { Heart, Target, Eye, Star, Users, Award, Home, Building, Leaf, Shield } from 'lucide-react';
import Image from 'next/image';
const AboutUs = () => {
    return (
        <div className="bg-white ">
            {/* Hero Section */}
            <div className=" text-black py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-6">About Furnishing</h1>
                        <p className="text-xl md:text-2xl text-black max-w-4xl mx-auto">
                            Malaysia's trusted name for delivering premium vinyl and SPC flooring, stylish interior solutions, and modern furnishing materials tailored to local tastes.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl  font-bold text-black mb-6">
                            Malaysia’s Trusted Interior & Flooring Partner
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Furnishing is Malaysia’s trusted name for delivering premium vinyl and SPC flooring,
                            stylish interior solutions, and modern furnishing materials tailored to local tastes.
                            We pride ourselves on offering durable, elegant, and affordable flooring and wall
                            furnishing options that enhance the look and function of homes, offices, and commercial
                            spaces nationwide.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            From supply to professional installation, Furnishing is your one-stop destination for
                            innovative, lasting, and visually striking interior solutions.
                        </p>
                    </div>
                    <div className="w-full h-[400px] relative rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/about3.jpg"
                            alt="Furnishing Malaysia"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-gray-900 mb-4">Our Story</h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                Established with a mission to transform spaces with practical yet beautiful materials, Furnishing has grown into a go-to brand for top-quality vinyl flooring, PVC tiles, SPC panels, and interior wall solutions.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our success is rooted in in-depth industry knowledge, consistent product quality, and a steadfast commitment to customer satisfaction. From initial consultation to final installation, Furnishing handles every step with care, offering solutions trusted by homeowners, designers, and contractors throughout Kuala Lumpur, Johor, Penang, Selangor, and East Malaysia.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision Row */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {/* Card List */}
                    {[
                        {
                            title: "Our Mission",
                            content:
                                "To supply modern, stylish, and resilient interior furnishing solutions that are optimized for Malaysia's climate and lifestyle needs, while offering clients high value and professional service.",
                            image: "/about1.jpg",
                        },
                        {
                            title: "Our Vision",
                            content:
                                "To be Malaysia's most reliable furnishing partner by delivering durable flooring, contemporary wall designs, and seamless project execution with a client-first mindset.",
                            image: "/about1.jpg",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-orange-100 rounded-3xl shadow-md overflow-hidden transition-all duration-500"
                        >
                            {/* Image Section with Colored Background */}
                            <div className="w-full h-56 bg-orange-100 flex items-center justify-center p-6">
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="object-cover h-full w-full rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                <p className="text-gray-700 text-base leading-relaxed">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* What We Offer Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-gray-900 mb-4">What We Offer</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Vinyl Flooring */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 ">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Home className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Vinyl Flooring Solutions</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Broad range of vinyl flooring options—planks, tiles, and sheets—with realistic wood, stone, and marble finishes.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    100% waterproof
                                </div>
                                <div className="flex items-center text-sm text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Anti-slip & scratch-resistant
                                </div>
                                <div className="flex items-center text-sm text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Hygienic and low-maintenance
                                </div>
                                <div className="flex items-center text-sm text-orange-600">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Easy installation
                                </div>
                            </div>
                        </div>

                        {/* SPC Flooring */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100  transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Building className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">SPC Flooring</h3>
                            <p className="text-gray-600 text-sm">
                                Highly durable SPC click-lock flooring designed for long-term performance in high-traffic areas. Resistant to wear, humidity, and impact.
                            </p>
                        </div>

                        {/* Wall Panels */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Star className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Wall Panels & Decorative Surfaces</h3>
                            <p className="text-gray-600 text-sm">
                                From PVC wall cladding to custom decorative panels, offering thermal insulation, sound dampening, and premium aesthetic finishes.
                            </p>
                        </div>

                        {/* Consultation */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100  transition-shadow">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Consultation & Installation</h3>
                            <p className="text-gray-600 text-sm">
                                Free consultation, on-site measurement, and professional installation services following high-quality standards.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-gray-900 mb-4">Why Choose Furnishing?</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Designed for Malaysia's Climate</h3>
                            <p className="text-gray-600">All products are selected for their resistance to moisture, heat, and tropical weather conditions—perfect for Malaysia's environment.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality Materials</h3>
                            <p className="text-gray-600">Our flooring and wall panels meet international quality standards and are backed by manufacturer warranties.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Wide Range of Designs</h3>
                            <p className="text-gray-600">Choose from hundreds of colors, grains, and patterns that suit minimalist, modern, industrial, and luxury interiors.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Start-to-Finish Service</h3>
                            <p className="text-gray-600">From consultation and delivery to skilled installation and after-sales support, we offer end-to-end convenience.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Prices</h3>
                            <p className="text-gray-600">We make professional-grade flooring and wall finishes affordable—ideal for homeowners, contractors, and designers alike.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
                            <p className="text-gray-600">With projects completed across residential and commercial sites, our products and services are trusted by clients nationwide.</p>
                        </div>
                    </div>
                </div>

                {/* Who We Serve Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Serve</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="border border-orange-100 shadow-lg rounded-xl bg-white p-6 text-center">
                            <Home className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Homeowners</h3>
                            <p className="text-sm text-gray-600">Updating floors with water-resistant, stylish options</p>
                        </div>

                        <div className="border border-orange-100 shadow-lg rounded-xl bg-white p-6 text-center">
                            <Star className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Interior Designers</h3>
                            <p className="text-sm text-gray-600">Seeking creative, reliable furnishing materials</p>
                        </div>

                        <div className="border border-orange-100 shadow-lg rounded-xl bg-white p-6 text-center">
                            <Building className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Commercial Businesses</h3>
                            <p className="text-sm text-gray-600">Requiring flooring with durability and design appeal</p>
                        </div>

                        <div className="border border-orange-100 shadow-lg bg-white rounded-xl p-6 text-center">
                            <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Developers</h3>
                            <p className="text-sm text-gray-600">Looking for bulk supply and expert installation</p>
                        </div>

                        <div className="border border-orange-100 shadow-lg bg-white rounded-xl p-6 text-center">
                            <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Hospitality & Retail</h3>
                            <p className="text-sm text-gray-600">Needing quick turnarounds and professional finishing</p>
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Values</h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600">Adopting new trends and sustainable materials</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
                            <p className="text-gray-600">Transparent processes and honest recommendations</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-Focused</h3>
                            <p className="text-gray-600">Every space and client need is unique</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-600">Promoting eco-friendly and recyclable products</p>
                        </div>
                    </div>
                </div>

                {/* Serving Across Malaysia */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Serving Across Malaysia</h2>

                    </div>

                    <div className=" rounded-2xl ">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  text-center">
                            <div className="bg-white rounded-lg p-4 border border-orange-100  shadow-sm">
                                <h3 className="font-bold text-orange-600 text-lg ">Kuala Lumpur</h3>
                            </div>
                            <div className="bg-white rounded-lg border border-orange-100 p-4 shadow-sm">
                                <h3 className="font-bold text-orange-600  text-lg">Selangor</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                                <h3 className="font-bold text-orange-600 text-lg">Penang</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                                <h3 className="font-bold text-orange-600 text-lg">Johor Bahru</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                                <h3 className="font-bold text-orange-600 text-lg">Ipoh</h3>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 shadow-sm">
                                <h3 className="font-bold text-orange-600 text-lg">Sabah & Sarawak</h3>
                            </div>
                        </div>
                        <p className="text-center text-gray-700 mt-8 text-lg">
                            We ensure fast delivery, expert installation, and dedicated support in every major city and region.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-orange-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Furnish Your Space with Confidence
                    </h3>
                    <p className="text-gray-700 text-lg">
                        Whether you're upgrading your home or re-fitting your commercial space, we’re ready to help.   <span className='text-orange-600'> <a href="https://www.furnishings.com.my/contact">Contact us</a></span>  for a free consultation today, and let us bring your vision to life.

                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;