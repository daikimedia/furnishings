'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SearchAutoComplete from '@/components/common/SearchAutoComplete'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    // const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    // const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    const vinylSheetLinks = [
        { title: "Alberta", href: "/category/alberta" },
        { title: "Versafloor", href: "/category/versafloor" },
    ]

    const exploreCategories = [
        { label: "Flooring", href: "/category/flooring" },
        { label: "Carpet tiles", href: "/category/carpet-tiles" },
        { label: "Spc & Laminate", href: "/category/spc-and-laminate" },
        { label: "Vinyl Sheet", href: "/category/vinyl-sheet-flooring", dropdown: vinylSheetLinks, key: "vinyl" },
        { label: "Artificial Grass", href: "/category/artificial-grass" },
    ]

    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Explore Categories", href: "/", dropdown: exploreCategories, key: "explore" },
        { label: "Contact", href: "/contact" },
    ]

    const NavLink = ({ title, href }: { title: string, href: string }) => (
        <Link href={href} className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md transition">
            {title}
        </Link>
    )

    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
            {/* Top Navbar */}
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/images/logo (2).png" alt="Logo" width={50} height={50} className="rounded-md" />
                </Link>

                {/* ✅ Desktop Menu with Dropdown Restored */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {mainNavItems.map((item, i) => (
                        <div key={i} className="relative group">
                            <Link href={item.href || "#"} className="flex items-center font-semibold px-3 py-2 text-black hover:text-orange-400 transition">
                                {item.label}
                                {item.dropdown && <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />}
                            </Link>

                            {item.dropdown && (
                                <div className="absolute top-full left-0 mt-0 bg-white shadow-lg border rounded-md  w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 delay-150">
                                    <div className="flex flex-col p-2">
                                        {item.dropdown.map((cat, idx) => (
                                            <div key={idx} className="relative group/item">
                                                <Link href={cat.href} className="flex justify-between items-center px-3 py-2 text-base font-normal hover:bg-gray-100 hover:text-orange-400 rounded-md">
                                                    {cat.label}
                                                    {cat.dropdown && <ChevronDown className="h-3 w-3 -rotate-90" />}
                                                </Link>

                                                {cat.dropdown && (
                                                    <div className="absolute left-full top-0 ml-1 bg-white shadow-lg border rounded-md w-44 opacity-0 group-hover/item:opacity-100 invisible group-hover/item:visible transition duration-300">
                                                        <div className="flex flex-col p-2">
                                                            {cat.dropdown.map((sub, i2) => (
                                                                <Link key={i2} href={sub.href} className="block px-3 py-2 text-sm hover:bg-gray-100 hover:text-orange-400 rounded-md">
                                                                    {sub.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Desktop Search */}
                <div className="hidden md:block w-64">
                    <SearchAutoComplete />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* ✅ Mobile Fullscreen Menu (Improved) */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Top Bar with Close */}
                <div className="flex justify-between items-center px-4 py-3 border-b shadow-md">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/images/logo (2).png" alt="Logo" width={40} height={40} className="rounded-md" />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}><X className="w-6 h-6" /></Button>
                </div>

                {/* Mobile Search */}
                <div className="p-4 border-b">
                    <SearchAutoComplete />
                </div>

                {/* Mobile Nav Links */}
                <div className="flex flex-col space-y-2 p-4">
                    {mainNavItems.map((item, idx) => (
                        <div key={idx} className="w-full">
                            <NavLink title={item.label} href={item.href || "#"} />
                            {item.dropdown && (
                                <div className="ml-4 border-l pl-4 space-y-2">
                                    {item.dropdown.map((cat, i2) => (
                                        <div key={i2}>
                                            <NavLink title={cat.label} href={cat.href} />
                                            {cat.dropdown && (
                                                <div className="ml-4 border-l pl-3 space-y-1">
                                                    {cat.dropdown.map((sub, i3) => (
                                                        <NavLink key={i3} title={sub.title} href={sub.href} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Navbar
