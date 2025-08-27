import { Phone, MapPin, Palette, FileText, Wrench, Shield } from "lucide-react";

const processSteps = [
    {

        icon: Phone,
        title: "Free Consultation",
        description: "Contact us by phone or WhatsApp with your room dimensions and preferred flooring style. Our team will guide you through suitable choices and available designs.",

    },
    {

        icon: MapPin,
        title: "On-Site Floor Survey",
        description: "We conduct a site visit to assess subfloor conditions (flatness, moisture content, shade exposure) to recommend the best solution.",

    },
    {

        icon: Palette,
        title: "Product Sampling",
        description: "Visit our Selangor showroom to view actual flooring samples under natural lighting, or receive sample swatches to evaluate before purchase.",
    },
    {

        icon: FileText,
        title: "Tailored Quotation",
        description: "We provide a full breakdown including material costs, labour, installation time, warranty information, and optional accessories—ensuring no surprises.",

    },
    {

        icon: Wrench,
        title: "Professional Installation & Quality Inspection",
        description: "Our certified installers execute precise layout, cut, and seal work. We ensure cleanliness and safety throughout—and perform a final quality check once installation is complete.",

    },
    {
        step: "06",
        icon: Shield,
        title: "Aftercare & Warranty Support",
        description: "Depending on product selection, warranty ranges from 5 to 15 years. We offer ongoing maintenance advice and respond promptly to any concerns.",
    }
];

export default function ProcessSection() {
    return (
        <section className="px-6 py-12">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-black mb-12">
                        Our Process — Clear, Efficient, Customer-Centric
                    </h2>
                </div>

                {/* Timeline Wrapper */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Center Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
                        {/* Line */}
                        <div className="w-1 h-full bg-orange-200 relative">
                            {/* Top Circle */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-300 rounded-full shadow-md" />
                            {/* Bottom Circle */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-300 rounded-full shadow-md" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {processSteps.map((process, index) => {
                            const IconComponent = process.icon;
                            const isEven = index % 2 === 0; // alternate left-right

                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center gap-4 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                                        <div className="bg-white rounded-2xl p-4 shadow-md border border-orange-100">
                                            <h3 className="text-xl font-semibold text-black mb-2">{process.title}</h3>
                                            <p className="text-gray-600 text-justify text-base">{process.description}</p>
                                        </div>
                                    </div>

                                    {/* Icon (center line par fix) */}
                                    <div className="flex-shrink-0 z-10">
                                        <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-md">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Spacing */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}