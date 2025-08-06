import { CheckCircle, HeartHandshake, ShieldCheck, Leaf } from "lucide-react";

export default function CompanyOverviewSection() {
    return (
        <section className="py-8 px-6">
            <div className="container mx-auto ">

                {/* Company Profile */}
                <section className="mb-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-black mb-12">Company Profile</h2>
                        <p className="text-lg text-gray-700">
                            Established to bring advanced flooring solutions to Malaysians, <strong>Furnishing Solutions</strong> has rapidly built a reputation for reliability and design excellence.
                            We collaborate with industry-leading manufacturers to source products suited to tropical conditions—ensuring long-term beauty, safety, and style.
                        </p>
                        <p className="text-lg text-gray-700  mt-4">
                            From apartments and landed homes to offices, retail spaces, and factories, our team provides tailored solutions backed by transparent service, ethical sourcing, and performance-focused installations.
                            We believe that great interiors start from the ground up—and that quality flooring underpins functional, beautiful spaces.
                        </p>
                    </div>
                </section>
                {/* Core Values */}
                <section className="mb-12">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Value 1 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-md transition">
                            <ShieldCheck className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Quality Assurance</h4>
                            <p className="text-base text-gray-600">
                                Every product is rigorously inspected and certified for performance.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-md  transition">
                            <HeartHandshake className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Customer Focus</h4>
                            <p className="text-base text-gray-600">
                                We value clear communication, tailored service, and support from start to finish.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-md transition">
                            <CheckCircle className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Trust & Transparency</h4>
                            <p className="text-base text-gray-600">
                                Honest pricing, reliable warranties, and dependable installation schedules.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-md transition">
                            <Leaf className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Innovation & Sustainability</h4>
                            <p className="text-base text-gray-600">
                                We offer eco-friendly products and modern, healthy solutions.
                            </p>
                        </div>
                    </div>
                </section>


            </div>
        </section>
    );
}
