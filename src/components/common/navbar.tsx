'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    const downloadLinks = [
        { title: "Alberta", href: "#" },
        { title: "Versafloor", href: "#" },
    ]

    const NavLink = ({ title, href }: { title: string, href: string }) => (
        <Link
            href={href}
            className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
            {title}
        </Link>
    )

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Flooring", href: "#flooring" },
        { label: "Carpet tiles", href: "#" },
        { label: "Spc & Laminate", href: "#" },
        { label: "Vinyl", href: "#" },
        { label: "Vinyl Sheet", dropdown: downloadLinks, key: "download" },
        { label: "Artificial Grass", href: "/contact" },
        { label: "Contact", href: "/contact" },
    ]

    return (
        <header className="w-full bg-white border-b border-gray-200">
            {/* Desktop Nav */}
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Left - Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/logo (2).png"
                            alt="Furns Logo"
                            width={50}
                            height={50}
                            className="rounded-md"
                        />
                    </Link>
                </div>

                {/* Center - Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navItems.map((item, i) => (
                        <div
                            key={i}
                            className="relative"
                            onMouseEnter={() => item.key && setActiveDropdown(item.key)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <div className="flex items-center text-black hover:text-orange-400 transition cursor-pointer">
                                <Link href={item.href || "#"} className="flex items-center space-x-1">
                                    <span>{item.label}</span>
                                    {item.dropdown && (
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                </Link>
                            </div>
                            {item.dropdown && activeDropdown === item.key && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                                    <div className="p-2 space-y-1">
                                        {item.dropdown.map((link, idx) => (
                                            <NavLink key={idx} {...link} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right - Search Bar */}
                <div className="hidden md:flex items-center space-x-2">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="pr-12 pl-4 py-2 border rounded-md text-sm"
                        />

                        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-6 border-l pl-2 flex items-center">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>


                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <div className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen p-4' : 'max-h-0 p-0'}`}>
                <div className="flex flex-col space-y-4">
                    <NavLink title="Home" href="/" />
                    <NavLink title="About Us" href="/about-us" />
                    <NavLink title="Flooring" href="#flooring" />
                    <NavLink title="Carpet tiles" href="#" />
                    <NavLink title="Spc & Laminate" href="#" />
                    <NavLink title="Vinyl" href="#" />
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Vinyl Sheet</p>
                        {downloadLinks.map((link, idx) => (
                            <NavLink key={idx} {...link} />
                        ))}
                    </div>
                    <NavLink title="Artificial Grass" href="/contact" />
                    <NavLink title="Contact" href="/contact" />

                    {/* Mobile Search */}
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 border rounded-md text-sm"
                        />
                        <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
