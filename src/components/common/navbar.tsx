'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import SearchAutoComplete from '@/components/common/SearchAutoComplete'

interface Category {
    id: number
    name: string
    slug: string
    products_count: number
}

interface ApiResponse {
    success: boolean
    data: Category[]
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    // const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    // const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories')
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result: ApiResponse = await response.json()

                if (result.success) {
                    setCategories(result.data)
                }
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    // Create subcategories for Vinyl Sheet Flooring
    const vinylSheetSubcategories = categories.filter(cat =>
        cat.name === 'Alberta' || cat.name === 'Versafloor'
    ).map(cat => ({
        title: cat.name,
        href: `/category/${cat.slug}`
    }))

    // Create explore categories from API data
    const exploreCategories = categories
        .filter(cat => !['Alberta', 'Versafloor'].includes(cat.name)) // Exclude subcategories
        .map(cat => ({
            label: cat.name,
            href: `/category/${cat.slug}`,
            ...(cat.name === 'Vinyl Sheet Flooring' && vinylSheetSubcategories.length > 0
                ? { dropdown: vinylSheetSubcategories, key: "vinyl" }
                : {})
        }))

    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        {
            label: "Explore Categories",
            href: "/category",
            dropdown: loading ? [] : exploreCategories,
            key: "explore"
        },
        { label: "Contact", href: "/contact" },
        { label: "Shop", href: "/shop" },
        { label: "Blogs", href: "/blog" },
        // { label: "", href: "/shop", icon: <ShoppingCart className="h-5 w-5 ml-2" /> },
    ]

    const NavLink = ({ title, href, icon }: { title: string, href: string, icon?: React.ReactNode }) => (
        <Link
            href={href}
            className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md transition flex items-center"
            onClick={() => setMobileMenuOpen(false)} // Close menu on link click
        >
            {title}
            {icon}
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
                                {/* {item.icon && item.icon} */}
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

            {/* ✅ Mobile Fullscreen Menu (Scrollable) */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Fixed Top Bar with Close */}
                <div className="flex justify-between items-center px-4 py-3 border-b shadow-md bg-white sticky top-0 z-10">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/images/logo (2).png" alt="Logo" width={40} height={40} className="rounded-md" />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}><X className="w-6 h-6" /></Button>
                </div>

                {/* Scrollable Content Area */}
                <div className="h-full overflow-y-auto pb-20"> {/* Added pb-20 for bottom padding */}
                    {/* Mobile Search - Fixed at top of scrollable area */}
                    <div className="p-4 border-b bg-white sticky top-0 z-10">
                        <SearchAutoComplete />
                    </div>

                    {/* Mobile Nav Links - Scrollable content */}
                    <div className="flex flex-col space-y-2 p-4">
                        {mainNavItems.map((item, idx) => (
                            <div key={idx} className="w-full">
                                <NavLink title={item.label} href={item.href || "#"} />
                                {item.dropdown && (
                                    <div className="ml-4 border-l pl-4 space-y-2 mt-2">
                                        {item.dropdown.map((cat, i2) => (
                                            <div key={i2}>
                                                <NavLink title={cat.label} href={cat.href} />
                                                {cat.dropdown && (
                                                    <div className="ml-4 border-l pl-3 space-y-1 mt-2">
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
            </div>
        </header>
    )
}

export default Navbar