
import Image from "next/image";
export default function CTASection() {
    return (
        <section className="py-8 px-6">
            <div className="bg-white rounded-3xl py-12 px-6 text-orange-600 text-center shadow-md border border-orange-600">
                <p className="font-medium text-lg mb-8">
                    Transform Your Space – Discover Comfort & Style with Furnishings Today!.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6  text-sm">
                    <div className="flex items-center gap-2 bg-orange-600 text-white px-4 rounded-xl">
                        <a
                            href="https://wa.me/60123498710"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 duration-300 cursor-pointer"
                        >
                            <Image
                                src="/whats-aap.png"
                                width={50}
                                height={50}
                                alt="whats-aap"
                            />
                            WhatsApp: <strong>+60 12-349 8710</strong>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* <Mail /> | Email: <strong> [Insert Email]</strong> */}
                    </div>
                    <div className="flex items-center gap-2 bg-orange-600 text-white px-4 rounded-xl">
                        <Image
                            src="/earth.png"
                            width={50}
                            height={50}
                            alt="www"
                        />Website: <a href="https://www.furnishings.com.my" className="hover:underline">www.furnishings.com.my</a>
                    </div>
                </div>
            </div>
        </section>
    );
}