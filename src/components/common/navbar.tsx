'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
    const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
    const [subDropdownTimeout, setSubDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    const handleDropdownEnter = (key: string) => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout)
            setDropdownTimeout(null)
        }
        setActiveDropdown(key)
    }

    const handleDropdownLeave = () => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null)
            setActiveSubDropdown(null)
        }, 300)
        setDropdownTimeout(timeout)
    }

    const handleSubDropdownEnter = (key: string) => {
        if (subDropdownTimeout) {
            clearTimeout(subDropdownTimeout)
            setSubDropdownTimeout(null)
        }
        setActiveSubDropdown(key)
    }

    const handleSubDropdownLeave = () => {
        const timeout = setTimeout(() => {
            setActiveSubDropdown(null)
        }, 300)
        setSubDropdownTimeout(timeout)
    }

    const vinylSheetLinks = [
        { title: "Alberta", href: "#" },
        { title: "Versafloor", href: "#" },
    ]

    const exploreCategories = [
        { label: "Flooring", href: "#" },
        { label: "Carpet tiles", href: "#" },
        { label: "Spc & Laminate", href: "#" },
        { label: "Vinyl Sheet", href: "category/vinyl-sheet-flooring", dropdown: vinylSheetLinks, key: "vinyl" },
        { label: "Artificial Grass", href: "#" },
    ]

    const NavLink = ({ title, href }: { title: string, href: string }) => (
        <Link
            href={href}
            className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 hover:text-orange-400 rounded-md transition-colors duration-200"
        >
            {title}
        </Link>
    )

    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        { label: "Explore Categories", dropdown: exploreCategories, key: "explore" },
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
                <nav className="hidden md:flex space-x-8 items-center">
                    {mainNavItems.map((item, i) => (
                        <div
                            key={i}
                            className="relative group"
                            onMouseEnter={() => handleDropdownEnter(item.key || '')}
                            onMouseLeave={handleDropdownLeave}
                        >
                            <Link
                                href={item.href || "#"}
                                className="flex items-center space-x-1 font-semibold px-3 py-2 text-black hover:text-orange-400 transition-colors duration-300"
                            >
                                <span>{item.label}</span>
                                {item.dropdown && <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />}
                            </Link>

                            {item.dropdown && activeDropdown === item.key && (
                                <div
                                    className="absolute top-full left-0 mt-1 w-52 bg-white shadow-lg rounded-md border z-50 opacity-100 visible transition-all duration-300"
                                    onMouseEnter={() => handleDropdownEnter(item.key || '')}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <div className="p-3 space-y-2">
                                        {item.dropdown.map((categoryItem, idx) => (
                                            <div
                                                key={idx}
                                                className="relative"
                                                onMouseEnter={() => handleSubDropdownEnter(categoryItem.key || '')}
                                                onMouseLeave={handleSubDropdownLeave}
                                            >
                                                <Link
                                                    href={categoryItem.href || "#"}
                                                    className="flex justify-between items-center px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 hover:text-orange-400 rounded-md transition-colors duration-200"
                                                >
                                                    {categoryItem.label}
                                                    {categoryItem.dropdown && <ChevronDown className="h-4 w-4 -rotate-90" />}
                                                </Link>

                                                {categoryItem.dropdown && activeSubDropdown === categoryItem.key && (
                                                    <div
                                                        className="absolute left-full top-0 ml-1 w-44 bg-white shadow-lg rounded-md border z-50 opacity-100 visible transition-all duration-300"
                                                        onMouseEnter={() => handleSubDropdownEnter(categoryItem.key || '')}
                                                        onMouseLeave={handleSubDropdownLeave}
                                                    >
                                                        <div className="p-3 space-y-2">
                                                            {categoryItem.dropdown.map((subItem, subIdx) => (
                                                                <Link
                                                                    key={subIdx}
                                                                    href={subItem.href}
                                                                    className="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 hover:text-orange-400 rounded-md transition-colors duration-200"
                                                                >
                                                                    {subItem.title}
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

                    {/* Mobile Explore Categories */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Explore Categories</p>
                        <div className="ml-4 space-y-2">
                            {exploreCategories.map((categoryItem, idx) => (
                                <div key={idx}>
                                    <NavLink title={categoryItem.label} href={categoryItem.href || "#"} />
                                    {categoryItem.dropdown && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {categoryItem.dropdown.map((subItem, subIdx) => (
                                                <NavLink key={subIdx} {...subItem} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

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