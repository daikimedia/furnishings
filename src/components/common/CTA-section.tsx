"use client";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-8 px-6">
            <div className="bg-white rounded-3xl py-12 px-6 text-center shadow-md border border-orange-600">
                <p className="font-bold text-3xl mb-8 text-black">
                    Transform Your Space – Discover Comfort & Style with Furnishings Today!
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg">
                    {/* WhatsApp */}
                    <Link
                        href="https://wa.me/60123498710"
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-xl 
                                   transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
                    >
                        <MessageCircle className="w-6 h-6" />
                        WhatsApp: <strong>+60 12-349 8710</strong>
                    </Link>

                    {/* Website */}
                    <Link
                        href="/contact"
                        // target="_blank"
                        className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-xl 
                                   transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
                    >
                        <Phone className="w-6 h-6 " />
                        <strong>Contact Us</strong>
                    </Link>

                    {/* Email */}
                    <Link
                        href="mailto:info@furnishings.com.my"
                        className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-5 py-3 rounded-xl 
                                   transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
                    >
                        <Mail className="w-6 h-6" />
                        Email: <strong>info@furnishings.com.my</strong>
                    </Link>
                </div>
            </div>
        </section>
    );
}
