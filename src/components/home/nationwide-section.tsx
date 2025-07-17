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
            {/* Start Your Project Section */}
            <section className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Start Your Flooring Project Today
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                        From consultation to completion, we make your flooring dreams a reality with our streamlined 6-step process.
                    </p>
                </div>

                {/* Process Steps - Horizontal Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-20 left-0 right-0 h-0.5 bg-orange-600 hidden lg:block"></div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mb-16">
                        {projectSteps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <div key={index} className="group relative h-full flex flex-col">
                                    {/* Step Card */}
                                    <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300  border border-orange-100 text-center h-full flex flex-col justify-between">
                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4  transition-transform duration-300 shadow-lg">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3  transition-colors">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 ">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Nationwide Coverage
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                        <span className="font-semibold text-orange-600">Furnishing Solutions</span> serves all of Malaysia, delivering professional service and installation across the nation.
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
                <p className="text-base text-gray-600 max-w-3xl mx-auto mb-6">No matter your location or project size, our team is equipped to deliver consistent quality and service.</p>
            </section>
        </div>
    );
}