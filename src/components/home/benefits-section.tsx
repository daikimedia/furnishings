import { Shield, Droplets, Zap, Volume2, Sparkles, Bug } from "lucide-react";

const benefits = [
    {
        icon: Droplets,
        title: "Water and Moisture Resistant",
        description: "Continue performing under wet or humid conditions."
    },
    {
        icon: Shield,
        title: "Scratch, Stain & Impact Proof",
        description: "Built to withstand pets, high heels, heavy furniture, and daily wear."
    },
    {
        icon: Volume2,
        title: "Comfortable & Sound-Absorbing",
        description: "Thicker vinyl layers cushion footsteps and reduce sound reverberation."
    },
    {
        icon: Sparkles,
        title: "Easy to Maintain",
        description: "Regular sweeping and damp mopping are all that's required."
    },
    {
        icon: Bug,
        title: "Termite and Pest Resistant",
        description: "Vinyl and PVC resist infestation, unlike timber flooring."
    },
    {
        icon: Zap,
        title: "Eco-Conscious Options",
        description: "Low-VOC and recyclable products are available to support healthier living spaces."
    }
];

export default function VinylBenefitsSection() {
    return (
        <section className="px-4 py-12">
            {/* Header */}
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Benefits of Vinyl & PVC Floors for Malaysian Homes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-xl border border-orange-200 p-6  transition-all duration-300 shadow-md "
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 ">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-gray-900 mb-3  transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}