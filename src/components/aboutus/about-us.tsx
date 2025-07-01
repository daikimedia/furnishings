import React from 'react';
import { Heart } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Hero Section */}


            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* First Row - Our Motto & Our Mission */}
                <div className="grid lg:grid-cols-2 gap-16 mb-32">

                    {/* Our Motto */}
                    <div className="group relative">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
                            <img
                                src="/about1.jpg"
                                alt="Luxurious carpet installation"
                                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center mb-4">
                                    <Heart className="w-8 h-8 text-red-500 mr-3" />
                                    <h2 className="text-3xl font-bold text-white">Our Motto</h2>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                &quot;Floor with passion, design with purpose.&quot; We believe that every carpet should tell a story and every floor should reflect the personality of those who walk on it. Our commitment is to bring you carpeting that doesn&apos;t just cover a floor, but transforms it into a foundation of comfort and elegance.
                            </p>
                            <div className="mt-6 flex items-center text-orange-600 hover:text-orange-700 cursor-pointer transition-colors">

                            </div>
                        </div>
                    </div>

                    {/* Our Mission */}
                    <div className="group relative">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105">
                            <img
                                src="/about2.jpg"
                                alt="Premium carpet flooring design"
                                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center mb-4">

                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To revolutionize the flooring industry by providing cutting-edge carpet designs that blend durability with aesthetic excellence. We strive to make premium carpeting accessible to everyone while maintaining our commitment to quality, sustainability, and customer satisfaction in every installation.
                            </p>
                            <div className="mt-6 flex items-center text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">

                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row - Our Vision (Centered) */}
                <div className="flex justify-center">
                    <div className="max-w-4xl group relative">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-orange-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 mb-8">
                            <img
                                src="/about3.jpg"
                                alt="Future of carpet flooring design"
                                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-2xl p-10 shadow-lg border border-purple-100">
                            <p className="text-gray-800 text-xl leading-relaxed text-center mb-8">
                                To become the world&apos;s most trusted carpet flooring destination, setting new standards in design innovation and installation excellence. We envision a future where every home and office features flooring that serves as the foundation of comfort and style, where our carpet installations become cherished elements of spaces for generations to come.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                    <div className="text-3xl font-bold ">50+</div>
                                    <div className="text-gray-600">Cities Served</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                    <div className="text-3xl font-bold mb-2">1M+</div>
                                    <div className="text-gray-600">Sq Ft Installed</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                    <div className="text-3xl font-bold  mb-2">15</div>
                                    <div className="text-gray-600">Years of Excellence</div>
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button className="bg-gradient-to-r from-orange-300 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
                                    Start Your Flooring Journey
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutUs;