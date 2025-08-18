'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface ApiProduct {
    id: number;
    name: string;
    slug: string;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    images: {
        main_image: string;
        gallery: string[];
    };
    description: {
        short: string;
        long: string;
    };
}

interface ProductsApiResponse {
    success: boolean;
    data: ApiProduct[];
}

const categories = ['Artificial Grass', 'Carpet', 'Carpet Tiles', 'LVT & SPC', 'VINYL', 'Vinyl Sheet']

const CategoryTabs = () => {
    const [activeCategory, setActiveCategory] = useState('Artificial Grass')
    const [products, setProducts] = useState<ApiProduct[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://cms.furnishings.daikimedia.com/api/products')
                const result: ProductsApiResponse = await response.json()
                
                if (result.success && result.data) {
                    setProducts(result.data)
                }
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const filteredProducts = products.filter(
        (product) => product.category?.name === activeCategory
    )

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-black mb-3">Our Products</h2>
            <p className="text-gray-600 text-center text-xl max-w-2xl mx-auto my-10 mb-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                            'px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 border',
                            activeCategory === category
                                ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500 hover:text-orange-500'
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>


            {/* Animated Product Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                >
                    {loading ? (
                        // Loading skeleton
                        [...Array(8)].map((_, index) => (
                            <div key={index} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
                        ))
                    ) : (
                        filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer transform overflow-hidden"
                        >
                            <Link href={`/shop/${product.slug}`}>
                                {/* Image */}
                                <div className="relative h-60 overflow-hidden">
                                    <Image
                                        src={product.images.main_image?.startsWith('http') 
                                            ? product.images.main_image 
                                            : `https://cms.furnishings.daikimedia.com${product.images.main_image}`}
                                        alt={product.name}
                                        width={300}
                                        height={240}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-base mb-4 line-clamp-2">
                                        {product.description.short}
                                    </p>

                                    <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-600 transition-colors duration-300">
                                        <span className="text-sm font-semibold">View Details</span>
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Decorative border */}
                                <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        </motion.div>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>


        </div>
    )
}

export default CategoryTabs
