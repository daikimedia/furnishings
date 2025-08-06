import { Droplet, ShieldCheck, Brush, Wrench, Globe, Check, Home, Layers, Building, } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Climate-Ready Durability",
        description:
            "Malaysia’s hot, humid, and rainy environment can compromise traditional flooring—causing buckling, warping, and swelling. Furnishing Solutions offers flooring products specifically engineered for moisture resilience, thermal stability, and termite resistance, making them ideal for local conditions.",
    },
    {
        icon: Droplet,
        title: "100% Waterproof Performance",
        description:
            "All our flooring options—including luxury vinyl plank (LVP), luxury vinyl tile (LVT), and PVC sheet—are fully waterproof when installed properly. They withstand moisture in kitchens, bathrooms, laundry rooms, and other wet zones without risk of damage or leakage.",
    },
    {
        icon: Brush,
        title: "Wide Range of Stylish Designs",
        description: (
            <>
                <p>Choose from thousands of inspiring patterns and colours, including:</p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">

                    <li>Wood-look vinyl planks (oak, walnut, teak)</li>
                    <li>Stone, marble, and concrete-effect tiles</li>
                    <li>
                        Monochrome or vibrant patterned rolls suitable for modern, minimalist, or traditional Malaysian interiors
                    </li>

                </ul>
                <p>Our diverse design range ensures every customer finds the perfect match for their décor.</p>
            </>
        ),
    },
    {
        icon: Wrench,
        title: "Professional Installation & Aftercare",
        description:
            "Our flooring specialists handle every step—from precise subfloor preparation to seamless installation, edge finishing, and final inspection. We also provide maintenance guidance and warranties to ensure your peace of mind.",
    },
    {
        icon: Globe,
        title: "Transparent Pricing & Nationwide Reach",
        description:
            "Furnishing Solutions provides honest per-sq-ft costing, including materials and labour. We offer volume discounts for large projects, and our services cover key Malaysian regions—Kuala Lumpur, Klang Valley, Penang, Johor, Melaka, East Malaysia, Ipoh, and beyond.",
    },
];

const flooringData = [
    {
        type: "Luxury Vinyl Plank (LVP)",
        description: "Durable wood-look planks with natural texture",
        idealFor: "Living rooms, bedrooms, retail outlets",
        icon: <Home className="w-6 h-6" />,
        features: ["Wood-look finish", "Natural texture", "High durability"]
    },
    {
        type: "Luxury Vinyl Tile (LVT)",
        description: "Stone-look tiles with anti-slip & stain-resistant finishes",
        idealFor: "Kitchens, bathrooms, hallways",
        icon: <Layers className="w-6 h-6" />,
        features: ["Stone-look design", "Anti-slip surface", "Stain-resistant"]
    },
    {
        type: "Click-Lock Vinyl",
        description: "Easy-to-install floating flooring—no adhesive required",
        idealFor: "DIY projects, rental units, renovations",
        icon: <Wrench className="w-6 h-6" />,
        features: ["No adhesive needed", "Easy installation", "DIY friendly"]
    },
    {
        type: "Loose-Lay Vinyl",
        description: "Heavy, densified sheets that adhere without glue",
        idealFor: "Showrooms, temporary setups, events",
        icon: <Building className="w-6 h-6" />,
        features: ["No glue required", "Heavy-duty sheets", "Temporary friendly"]
    },
    {
        type: "Vinyl Sheet Flooring",
        description: "Seamless vinyl rolls for large, wet areas",
        idealFor: "Clinics, labs, commercial wet zones",
        icon: <Droplet className="w-6 h-6" />,
        features: ["Seamless design", "Waterproof", "Commercial grade"]
    }
];




export default function MainContentSections() {
    return (
        <div className="bg-white px-6">
            {/* Trust Section */}
            <div className="container mx-auto ">
                <section className="py-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-12">
                            Malaysia’s  Most Trusted Vinyl Flooring & Carpet Provider
                        </h2>
                        <p className="text-xl text-gray-700 mb-6">
                            Waterproof · Durable · Stylish — Perfect for Malaysian Homes and Businesses
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Furnishing Solutions is Malaysia’s foremost specialist in vinyl and PVC flooring,
                            offering high-quality products and professional installation services tailored to
                            the country’s humid, tropical climate. Whether you’re renovating a condominium in
                            Kuala Lumpur, fitting a café in Penang, or refurbishing offices in Johor Bahru, our
                            waterproof, stylish, and easy-to-maintain flooring solutions deliver exceptional
                            performance and customer satisfaction.
                        </p>
                    </div>
                </section>
                {/* Why Choose Us */}
                <section className="py-12 ">
                    <h3 className="text-3xl font-bold items-center text-center mb-12">Why Choose Furnishing Solutions?</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="w-full md:w-[47%] lg:w-[30%] max-w-sm p-6 border border-orange-100 rounded-xl shadow-md  transition"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 ">
                                    <feature.icon className="w-6 h-6 text-white " />
                                </div>
                                <h4 className="text-lg font-semibold text-black mb-4">{feature.title}</h4>
                                <p className="text-base text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Header Section */}
                <section className="py-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black mb-12">
                            Our Featured Vinyl Flooring & Carpet Provider
                        </h2>
                        <p className="text-lg text-gray-600 ">
                            Each flooring category is engineered to be waterproof, scratch-resistant,
                            and safe for high-traffic environments.
                        </p>
                    </div>
                </section>

                {/* Flooring Types Grid */}
                <section className="py-12">
                    <div className="flex flex-wrap justify-center gap-12">
                        {flooringData.map((flooring, index) => (
                            <div
                                key={index}
                                className="w-full md:w-[47%] lg:w-[30%] max-w-sm bg-white rounded-xl shadow-md   border border-orange-100"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-xl">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="text-white">{flooring.icon}</div>
                                        <h3 className="text-xl font-bold text-white">{flooring.type}</h3>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {flooring.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                                        <div className="space-y-2">
                                            {flooring.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center space-x-2">
                                                    <Check className="w-4 h-4 text-orange-600" />
                                                    <span className="text-sm text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ideal For */}
                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold text-gray-800 inline-block mr-2">Ideal For:</h4>
                                        <span className="bg-orange-50 text-orange-800 font-medium px-2 py-1 rounded-lg">
                                            {flooring.idealFor}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div >
    );
}
