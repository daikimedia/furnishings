import React from "react";
import {
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 text-sm font-sans">
            <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 items-start justify-center">
                {/* ABOUT US */}
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold mb-6 text-white tracking-tight">ABOUT US</h4>
                    <p className="text-gray-300 leading-relaxed mb-8 max-w-xs mx-auto md:mx-0">
                        From supply to professional installation, Furnishing is your one-stop destination for innovative, lasting, and visually striking interior solutions.
                    </p>
                    <div className="flex space-x-6 text-white justify-center md:justify-start">
                        <a href="#" className="hover:text-orange-500 transition-colors duration-200">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-200">
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-200">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors duration-200">
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* INFORMATION */}
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold mb-6 text-white tracking-tight">INFORMATION</h4>
                    <ul className="space-y-3 text-gray-300">
                        <li><a href="/about-us" className="hover:text-orange-500 transition-colors duration-200">About Us</a></li>
                        <li><Link href="/contact" className="hover:text-orange-500 transition-colors duration-200">Contact Us</Link></li>
                        <li><Link href="/terms-&-conditions" className="hover:text-orange-500 transition-colors duration-200">Terms & Conditions</Link></li>
                        <li><Link href="/return-and-refunds-policy" className="hover:text-orange-500 transition-colors duration-200">Return and Refunds Policy</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold mb-6 text-white tracking-tight">Categories</h4>
                    <ul className="space-y-3 text-gray-300">
                        <li><Link href="/category/flooring" className="hover:text-orange-500 transition-colors duration-200">Flooring</Link></li>
                        <li><Link href="/category/carpet-tiles" className="hover:text-orange-500 transition-colors duration-200">Carpet tiles</Link></li>
                        <li><Link href="/category/spc-and-laminate" className="hover:text-orange-500 transition-colors duration-200">Spc & Laminate</Link></li>
                        <li><Link href="/category/vinyl-sheet-flooring" className="hover:text-orange-500 transition-colors duration-200">Vinyl Sheet</Link></li>
                        <li><Link href="/category/alberta" className="hover:text-orange-500 transition-colors duration-200">Alberta</Link></li>
                        <li><Link href="/category/versafloor" className="hover:text-orange-500 transition-colors duration-200">Versafloor</Link></li>
                        <li><Link href="/category/artificial-grass" className="hover:text-orange-500 transition-colors duration-200">Artificial Grass</Link></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400 text-center text-xs">
                <p>
                    © {new Date().getFullYear()} Daiki Media. All rights reserved.
                </p>
            </div>
        </footer>
    );
}