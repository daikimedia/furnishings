import { Phone, MapPin, Palette, FileText, Wrench, Shield } from "lucide-react";

const projectSteps = [
    {
        step: "01",
        icon: Phone,
        title: "Free Design Consultation",
        description: "Contact us by phone or WhatsApp for a free design consultation.",
        action: "Call Now"
    },
    {
        step: "02",
        icon: MapPin,
        title: "Site Assessment",
        description: "We visit your site to assess and measure.",
        action: "Book Visit"
    },
    {
        step: "03",
        icon: Palette,
        title: "Product Selection",
        description: "Choose your preferred product sample or style.",
        action: "View Samples"
    },
    {
        step: "04",
        icon: FileText,
        title: "Detailed Quotation",
        description: "Receive a detailed, no-obligation quotation.",
        action: "Get Quote"
    },
    {
        step: "05",
        icon: Wrench,
        title: "Professional Installation",
        description: "Licensed installers complete the job.",
        action: "Schedule Install"
    },
    {
        step: "06",
        icon: Shield,
        title: "Warranty & Support",
        description: "Enjoy your floor with full warranty and aftercare support.",
        action: "Learn More"
    }
];

const locations = [
    "Kuala Lumpur",
    "Selangor (Klang Valley)",
    "Penang",
    "Johor Bahru",
    "Melaka",
    "Ipoh",
    "Sabah & Sarawak",
];

export default function FlooringProjectSection() {
    return (
        <div className="bg-white">

            <section className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">
                        Start Your Flooring Project Today
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                        From consultation to completion, we make your flooring dreams a reality with our streamlined 6-step process.
                    </p>
                </div>

                {/* Process Steps - Horizontal Timeline */}
                <div className="relative">
                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {projectSteps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <div key={index} className="group relative h-full flex flex-col">
                                    {/* Step Card */}
                                    <div className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 border border-orange-100 text-center h-full flex flex-col justify-between">
                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-base leading-relaxed flex-grow">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            <section className="py-12 px-6 ">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Nationwide Coverage
                    </h2>
                    <p className="text-xl text-gray-700   mb-6">
                        Furnishing Solutions serves all of Malaysia, delivering professional service and installation across the nation.
                    </p>
                </div>

                {/* Locations Grid */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="w-[45%] sm:w-[30%] md:w-[22%] bg-orange-600 text-white text-center px-6 py-3 rounded-2xl text-base font-semibold shadow-md transition-all duration-300"
                        >
                            {location}
                        </div>
                    ))}
                </div>
                <p className="text-base text-gray-600  text-center mx-auto ">No matter your location or project size, our team is equipped to deliver consistent quality and service.</p>
            </section>
        </div>
    );
}