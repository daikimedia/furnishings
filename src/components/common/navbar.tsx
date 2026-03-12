'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SearchAutoComplete from '@/components/common/SearchAutoComplete';

interface Category {
    id: number;
    name: string;
    slug: string;
    products_count: number;
    parent_id?: number | null; // Add this if you have parent-child relationship
}

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/categories');
                const result = await response.json();

                if (result.success) {
                    setCategories(result.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Find the Vinyl Sheet Flooring category and its subcategories
    const vinylSheetCategory = categories.find(cat => cat.name === 'Vinyl Sheet Flooring');
    
    const vinylSheetSubcategories = categories.filter(cat => 
        cat.name === 'Alberta' || cat.name === 'Versafloor'
    ).map(cat => ({
        title: cat.name,
        href: `/category/${cat.slug}`
    }));

    // Structure the explore categories with proper nesting
    const exploreCategories = categories
        .filter(cat => cat.name !== 'Alberta' && cat.name !== 'Versafloor') // Remove subcategories from top level
        .map(cat => {
            // If this is Vinyl Sheet Flooring, add its subcategories as dropdown
            if (cat.name === 'Vinyl Sheet Flooring' && vinylSheetSubcategories.length > 0) {
                return {
                    label: cat.name,
                    href: `/category/${cat.slug}`,
                    dropdown: vinylSheetSubcategories.map(sub => ({
                        label: sub.title, // Change from 'title' to 'label' for consistency
                        href: sub.href
                    }))
                };
            }
            // Regular category without dropdown
            return {
                label: cat.name,
                href: `/category/${cat.slug}`
            };
        });

    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-us" },
        {
            label: "Explore Categories",
            href: "/category",
            dropdown: loading ? [] : exploreCategories,
        },
        { label: "Contact", href: "/contact" },
        { label: "Shop", href: "/shop" },
        { label: "Blogs", href: "/blog" },
    ];

    // Desktop NavLink component for better reusability
    const DesktopNavLink = ({ item }: { item: any }) => (
        <div className="relative group">
            <Link 
                href={item.href || "#"} 
                className="flex items-center font-semibold px-3 py-2 text-black hover:text-orange-400 transition"
            >
                {item.label}
                {item.dropdown && item.dropdown.length > 0 && (
                    <ChevronDown className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" />
                )}
            </Link>

            {item.dropdown && item.dropdown.length > 0 && (
                <div className="absolute top-full left-0 mt-0 bg-white shadow-lg border rounded-md w-48 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 delay-150">
                    <div className="flex flex-col p-2">
                        {item.dropdown.map((cat: any, idx: number) => (
                            <div key={idx} className="relative group/item">
                                <Link 
                                    href={cat.href} 
                                    className="flex justify-between items-center px-3 py-2 text-base font-normal hover:bg-gray-100 hover:text-orange-400 rounded-md"
                                >
                                    {cat.label}
                                    {cat.dropdown && <ChevronDown className="h-3 w-3 -rotate-90" />}
                                </Link>

                                {cat.dropdown && (
                                    <div className="absolute left-full top-0 ml-1 bg-white shadow-lg border rounded-md w-44 opacity-0 group-hover/item:opacity-100 invisible group-hover/item:visible transition duration-300">
                                        <div className="flex flex-col p-2">
                                            {cat.dropdown.map((sub: any, i2: number) => (
                                                <Link 
                                                    key={i2} 
                                                    href={sub.href} 
                                                    className="block px-3 py-2 text-sm hover:bg-gray-100 hover:text-orange-400 rounded-md"
                                                >
                                                    {sub.label}
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
    );

    // Mobile NavLink component
    const MobileNavLink = ({ title, href, icon }: { title: string, href: string, icon?: React.ReactNode }) => (
        <Link
            href={href}
            className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-md transition flex items-center"
            onClick={() => setMobileMenuOpen(false)}
        >
            {title}
            {icon}
        </Link>
    );

    return (
        <header className="w-full bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center space-x-2">
                    <Image 
                        src="/images/logo (2).png" 
                        alt="Logo" 
                        width={50} 
                        height={50} 
                        className="rounded-md"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {mainNavItems.map((item, i) => (
                        <DesktopNavLink key={i} item={item} />
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

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center px-4 py-3 border-b shadow-md bg-white sticky top-0 z-10">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/images/logo (2).png" alt="Logo" width={40} height={40} className="rounded-md" />
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <div className="h-full overflow-y-auto pb-20">
                    <div className="p-4 border-b bg-white sticky top-0 z-10">
                        <SearchAutoComplete />
                    </div>

                    <div className="flex flex-col space-y-2 p-4">
                        {mainNavItems.map((item, idx) => (
                            <div key={idx} className="w-full">
                                <MobileNavLink title={item.label} href={item.href || "#"} />
                                {item.dropdown && item.dropdown.length > 0 && (
                                    <div className="ml-4 border-l pl-4 space-y-2 mt-2">
                                        {item.dropdown.map((cat: any, i2: number) => (
                                            <div key={i2}>
                                                <MobileNavLink title={cat.label} href={cat.href} />
                                                {cat.dropdown && (
                                                    <div className="ml-4 border-l pl-3 space-y-1 mt-2">
                                                        {cat.dropdown.map((sub: any, i3: number) => (
                                                            <MobileNavLink key={i3} title={sub.label} href={sub.href} />
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
    );
}

export default Navbar;