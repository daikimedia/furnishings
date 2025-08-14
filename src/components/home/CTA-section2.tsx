
import { PhoneCall, Earth } from "lucide-react";
export default function CTASection2() {
    return (
        <section className="py-8 px-6">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl py-12 px-6 text-white text-center shadow-md">
                <h3 className="text-3xl font-bold mb-4">Let’s Shape Your Interior Together</h3>
                <p className="text-base md:text-lg max-w-3xl mx-auto mb-6">
                    Ready to transform your living or working space? At <strong>Furnishing Solutions</strong>, we pair smart materials with expert workmanship to create floors that are beautiful, functional, and built to last.
                </p>
                <p className="font-medium text-sm md:text-base mb-8">
                    Contact us today for your free consultation and quotation.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white text-sm">
                    <div className="flex items-center gap-2">
                        <a
                            href="https://wa.me/60123498710"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 duration-300 cursor-pointer"
                        >
                            <PhoneCall className="w-5 h-5" />
                            WhatsApp: <strong>+60 12-349 8710</strong>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* <Mail /> | Email: <strong> [Insert Email]</strong> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <Earth /> | Website: <a href="https://www.furnishings.com.my" className="underline hover:text-orange-200">www.furnishings.com.my</a>
                    </div>
                </div>
            </div>
        </section>
    );
}