import { CheckCircle, HeartHandshake, ShieldCheck, Leaf, PhoneCall, Mail, Earth } from "lucide-react";

export default function CompanyOverviewSection() {
    return (
        <section className="bg-white py-20 px-4">
            <div className="container mx-auto space-y-20">

                {/* Company Profile */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-black mb-12">Company Profile</h2>
                    <p className="text-lg text-gray-700  leading-relaxed">
                        Established to bring advanced flooring solutions to Malaysians, <strong>Furnishing Solutions</strong> has rapidly built a reputation for reliability and design excellence.
                        We collaborate with industry-leading manufacturers to source products suited to tropical conditions—ensuring long-term beauty, safety, and style.
                    </p>
                    <p className="text-lg text-gray-700  mt-4 leading-relaxed">
                        From apartments and landed homes to offices, retail spaces, and factories, our team provides tailored solutions backed by transparent service, ethical sourcing, and performance-focused installations.
                        We believe that great interiors start from the ground up—and that quality flooring underpins functional, beautiful spaces.
                    </p>
                </div>

                {/* Core Values */}
                <div>
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Value 1 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-lg transition">
                            <ShieldCheck className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Quality Assurance</h4>
                            <p className="text-base text-gray-600">
                                Every product is rigorously inspected and certified for performance.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-lg  transition">
                            <HeartHandshake className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Customer Focus</h4>
                            <p className="text-base text-gray-600">
                                We value clear communication, tailored service, and support from start to finish.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-lg transition">
                            <CheckCircle className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Trust & Transparency</h4>
                            <p className="text-base text-gray-600">
                                Honest pricing, reliable warranties, and dependable installation schedules.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="p-6 border border-orange-100 rounded-xl shadow-lg transition">
                            <Leaf className="w-8 h-8 text-orange-600 mb-4" />
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Innovation & Sustainability</h4>
                            <p className="text-base text-gray-600">
                                We offer eco-friendly products and modern, healthy solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl py-12 px-6 text-white text-center shadow-lg">
                    <h3 className="text-3xl font-bold mb-4">Let’s Shape Your Interior Together</h3>
                    <p className="text-base md:text-lg max-w-3xl mx-auto mb-6">
                        Ready to transform your living or working space? At <strong>Furnishing Solutions</strong>, we pair smart materials with expert workmanship to create floors that are beautiful, functional, and built to last.
                    </p>
                    <p className="font-medium text-sm md:text-base mb-8">
                        Contact us today for your free consultation and quotation.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white text-sm">
                        <div className="flex items-center gap-2">
                            <PhoneCall /> | WhatsApp: <strong> [Insert Phone Number]</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail /> Email: <strong> [Insert Email]</strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <Earth /> Website: <a href="https://www.wcd.com.my" className="underline hover:text-orange-200">www.wcd.com.my</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
