'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Shield, Users } from 'lucide-react';

const slides = [
    {
        title: 'Carpet Tiles',
        subtitle: 'New Products',
        description:
            'Transform your space with premium carpet tiles designed for modern living. Quality and style combined.',
        image: '/carpet-tile.jpg',
    },
    {
        title: 'Comfortable Sofa',
        subtitle: 'Trending Now',
        description:
            'Discover unmatched comfort and timeless elegance in our latest sofa collection for modern homes.',
        image: '/sofa.jpg',
    },
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () =>
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    return (
        <div className=" bg-gradient-to-br from-gray-50 to-white">

            <div
                className="relative bg-cover bg-center bg-no-repeat transition-all duration-500"
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70" />
                <div className="container mx-auto px-6 py-20 relative z-10">
                    <div className="text-center space-y-8">

                        <h1 className="text-5xl font-semibold text-white leading-tight">
                            Transform your space with{' '}
                            <span className="text-orange-500 relative">
                                {slides[currentSlide].title.toLowerCase()}

                            </span>
                        </h1>


                        <p className="text-2xl  text-white/90 max-w-2xl mx-auto leading-relaxed z-100">
                            {slides[currentSlide].description}
                        </p>
                        <div className="pt-4">
                            <button className="bg-orange-600  text-black px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center space-x-3 mt-12">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-3 rounded-full transition-all duration-200 ${index === currentSlide
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 w-3 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-10"
                >
                    <ArrowRight size={24} />
                </button>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex items-center justify-center space-x-3 text-gray-800">
                            <Star className="w-8 h-8 text-black" />
                            <span className="font-medium">Premium Quality Guaranteed</span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 text-gray-800">
                            <Users className="w-8 h-8 text-black" />
                            <span className="font-medium">10,000+ Happy Customers</span>
                        </div>
                        <div className="flex items-center justify-center space-x-3 text-gray-800">
                            <Shield className="w-8 h-8 text-black" />
                            <span className="font-medium">Secure & Fast Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
