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

            {/* Main Footer Grid with Asymmetric Columns */}
            <div className="relative container mx-auto px-6 lg:px-16 py-12 grid grid-cols-[3.3fr_1fr_1fr] gap-12">

                {/* === Left Column (Wider & More Spaced) === */}
                <div className="pr-32 space-y-6">
                    <h4 className="text-xl font-bold tracking-tight text-orange-600">ABOUT US</h4>
                    <p className="text-gray-300 leading-relaxed ">
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
                        className="mt-4 flex items-center justify-center space-x-2 border border-white px-4 py-2 rounded-md hover:bg-orange-600 hover:text-black transition">
                        <ArrowUp className="w-5 h-5" />
                        <span className="uppercase text-xs tracking-wide">Back to Top</span>
                    </button>
                </div>

                {/* === Middle Column === */}
                <div>
                    <h4 className="font-bold mb-4 text-orange-600">INFORMATION</h4>
                    <ul className="space-y-3 text-gray-300">
                        <li><Link href="/about-us" className="hover:text-orange-600">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-orange-600">Contact Us</Link></li>
                        <li><Link href="/terms-&-conditions" className="hover:text-orange-600">Terms & Conditions</Link></li>
                        <li><Link href="/return-and-refunds-policy" className="hover:text-orange-600">Return and Refunds Policy</Link></li>
                    </ul>
                </div>

                {/* === Right Column === */}
                <div>
                    <h4 className="font-bold mb-4 text-orange-600">CATEGORIES</h4>
                    <ul className="space-y-3 text-gray-300">
                        <li><Link href="/category/flooring" className="hover:text-orange-600">Flooring</Link></li>
                        <li><Link href="/category/carpet-tiles" className="hover:text-orange-600">Carpet Tiles</Link></li>
                        <li><Link href="/category/spc-and-laminate" className="hover:text-orange-600">Spc & Laminate</Link></li>
                        <li><Link href="/category/vinyl-sheet-flooring" className="hover:text-orange-600">Vinyl Sheet</Link></li>
                        <li><Link href="/category/alberta" className="hover:text-orange-600">Alberta</Link></li>
                        <li><Link href="/category/versafloor" className="hover:text-orange-600">Versafloor</Link></li>
                        <li><Link href="/category/artificial-grass" className="hover:text-orange-600">Artificial Grass</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black text-center py-2 text-xs text-white border-t border-orange-600">
                © {new Date().getFullYear()} Furnishings powered by{" "}
                <a
                    href="https://www.daikimedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600  underline"
                >
                    Daiki Media
                </a>. All rights reserved.
            </div>
        </footer>
    );
}
