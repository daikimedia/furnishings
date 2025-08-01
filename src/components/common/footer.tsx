"use client";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-black text-white rounded-t-3xl overflow-hidden font-sans">
            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 L300 0 L600 200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                    <path d="M400 300 L800 100 L1200 400" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                </svg>
            </div>

            {/* Main Footer Grid - Responsive Layout */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12">

                {/* Mobile First - Stacked Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3.3fr_1fr_1fr] gap-8 lg:gap-12">

                    {/* === About Us Section === */}
                    <div className="space-y-4 sm:space-y-6 md:col-span-2 lg:col-span-1 lg:pr-16">
                        <h4 className="text-lg sm:text-xl font-bold tracking-tight text-orange-600">ABOUT US</h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                            From supply to professional installation, Furnishing is your one-stop destination
                            for innovative, lasting, and visually striking interior solutions.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4 text-white">
                            <Link href="/"><Facebook className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/"><Twitter className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/"><Linkedin className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                            <Link href="/"><Youtube className="w-5 h-5 hover:text-orange-600 transition-colors" /></Link>
                        </div>

                        {/* Back to Top Button */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center justify-center space-x-2 border border-white px-3 py-2 rounded-md hover:bg-orange-600 hover:text-black transition-colors text-xs sm:text-sm w-full sm:w-auto">
                            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="uppercase tracking-wide">Back to Top</span>
                        </button>
                    </div>

                    {/* === Information Section === */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-orange-600 text-base sm:text-lg">INFORMATION</h4>
                        <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                            <li><Link href="/about-us" className="hover:text-orange-600 transition-colors block py-1">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-orange-600 transition-colors block py-1">Contact Us</Link></li>
                            <li><Link href="/terms-&-conditions" className="hover:text-orange-600 transition-colors block py-1">Terms & Conditions</Link></li>
                            <li><Link href="/return-and-refunds-policy" className="hover:text-orange-600 transition-colors block py-1">Return and Refunds Policy</Link></li>
                        </ul>
                    </div>

                    {/* === Categories Section === */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-orange-600 text-base sm:text-lg">CATEGORIES</h4>
                        <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                            <li><Link href="/category/flooring" className="hover:text-orange-600 transition-colors block py-1">Flooring</Link></li>
                            <li><Link href="/category/carpet-tiles" className="hover:text-orange-600 transition-colors block py-1">Carpet Tiles</Link></li>
                            <li><Link href="/category/spc-and-laminate" className="hover:text-orange-600 transition-colors block py-1">Spc & Laminate</Link></li>
                            <li><Link href="/category/vinyl-sheet-flooring" className="hover:text-orange-600 transition-colors block py-1">Vinyl Sheet</Link></li>
                            <li><Link href="/category/alberta" className="hover:text-orange-600 transition-colors block py-1">Alberta</Link></li>
                            <li><Link href="/category/versafloor" className="hover:text-orange-600 transition-colors block py-1">Versafloor</Link></li>
                            <li><Link href="/category/artificial-grass" className="hover:text-orange-600 transition-colors block py-1">Artificial Grass</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black text-center py-3 px-4 text-xs sm:text-sm text-white border-t border-orange-600">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0">
                    <span>© {new Date().getFullYear()} Furnishings powered by</span>
                    <span className="sm:ml-1">
                        <a
                            href="https://www.daikimedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 underline hover:text-orange-400 transition-colors"
                        >
                            Daiki Media
                        </a>. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}