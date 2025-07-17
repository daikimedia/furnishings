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
        <section className="container mx-auto px-4 py-16 ">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-black mb-4">
                    Our Process — Clear, Efficient, Customer-Centric
                </h2>
            </div>

            {/* Process Steps */}
            <div className="max-w-4xl mx-auto space-y-8">
                {processSteps.map((process, index) => {
                    const IconComponent = process.icon;
                    const isEven = index % 2 === 0;

                    return (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < processSteps.length - 1 && (
                                <div className="absolute left-1/2 top-36 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200 transform -translate-x-px hidden md:block"></div>
                            )}

                            <div className={`flex flex-col md:flex-row items-center gap-4 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Content Card */}
                                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="bg-white rounded-2xl p-4 shadow-lg  transition-all duration-300 border border-orange-100">
                                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                                            {/* <span className="text-3xl font-bold text-gray-300">{process.step}</span> */}
                                            <h3 className="text-xl font-semibold  text-black">{process.title}</h3>
                                        </div>
                                        <p className="text-gray-600 text-justify text-base">
                                            {process.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Icon Circle */}
                                <div className="flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-lg  transition-transform duration-300`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}