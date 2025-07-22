import React from "react";
import {
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Send,

} from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 text-sm">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* ABOUT US */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">ABOUT US</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        From supply to professional installation, Furnishing is your one-stop destination for innovative, lasting, and visually striking interior solutions.
                    </p>
                    <div className="flex space-x-4 text-white">
                        < Facebook className="hover:text-orange-500 cursor-pointer" />
                        <Twitter className="hover:text-orange-500 cursor-pointer" />
                        <Linkedin className="hover:text-orange-500 cursor-pointer" />
                        <Youtube className="hover:text-orange-500 cursor-pointer" />

                    </div>
                </div>

                {/* INFORMATION */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">INFORMATION</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><a href="/about-us" className="hover:text-orange-500">About Us</a></li>
                        <li><Link href="/" className="hover:text-orange-500">Manufactures</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">Tracking Order</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">Privacy & Policy</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* MY ACCOUNT */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">MY ACCOUNT</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><Link href="/" className="hover:text-orange-500">Login</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">My Cart</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">Wishlist</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">Compare</Link></li>
                        <li><Link href="/" className="hover:text-orange-500">My Account</Link></li>
                    </ul>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">NEWSLETTER</h4>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter E-Mail Adheres"
                            className="w-full bg-transparent border border-gray-500 text-white px-4 py-3 rounded focus:outline-none"
                        />
                    </div>
                    <button className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                    </button>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-gray-400 text-center text-xs">
                <p>
                    © {new Date().getFullYear()}, Daiki Media.
                </p>
            </div>

        </footer>
    );
}
