"use client";

const pricingData = [
    {
        product: "PVC Sheet Flooring",
        standard: "RM 4 – RM 10",
        premium: "RM 11 – RM 15",
    },
    {
        product: "Luxury Vinyl Plank",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 35",
    },
    {
        product: "Luxury Vinyl Tile",
        standard: "RM 7 – RM 18",
        premium: "RM 19 – RM 40",
    },
    {
        product: "Click-Lock Vinyl",
        standard: "RM 10 – RM 25",
        premium: "RM 26 – RM 40",
    },
];

export default function PricingSection() {
    return (
        <section className=" py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-black">Pricing Guide</h2>
                    <p className="text-gray-500 mt-2 text-sm">(RM per sq ft)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pricingData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6  transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold text-orange-600 mb-4">{item.product}</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-100 p-4 rounded-md border">
                                    <p className="text-sm text-gray-600">Standard Range</p>
                                    <p className="text-lg font-bold text-gray-800">{item.standard}</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-md border">
                                    <p className="text-sm text-gray-600">Premium Range</p>
                                    <p className="text-lg font-bold text-gray-800">{item.premium}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-center text-gray-600 text-sm max-w-3xl mx-auto">
                    Actual prices vary based on wear-layer thickness, design complexity, and project scale. Volume and project-based discounts are available for contractors, developers, and bulk installations.

                </p>
            </div>
        </section>
    );
}
