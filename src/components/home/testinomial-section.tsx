"use client"
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Interior Designer",
            company: "Design Studio Pro",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcKO8CCTiyyelEB0caQ-WxbggB42Lb-3Ul-MFtr4NJ_pxJGLHwVMnhMFP7PRaPQFpfyI&usqp=CAU",
            rating: 5,
            text: "I love this shop, they have so many wallpapers (more than you can imagine, basically the whole shop is full of all types of wallpapers) for you to choose 😊 You can easily spend 2 hours there.",
            bgColor: "from-green-400 to-green-700"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Luxury Home Owner",
            company: "Premium Estates",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "I'm so excited that  customer service has shown me the VIP Lounge which has all the Luxury brand wallcoverings like Versace, Porsche and etc which I never heard before is all available here!",
            bgColor: "from-green-400 to-green-700"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Project Manager",
            company: "Elite Renovations",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Dealing with  is one of the best purchase experience. They are very helpful and the installation is done by professionals. So happy with the result!",
            bgColor: "from-green-400 to-green-700"
        }
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: React.SetStateAction<number>) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative  bg-gray-200 overflow-hidden">
            {/* Animated Background Elements */}


            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">

                <div className="text-center mb-20">
                    <h2 className="text-4xl  font-bold mb-6  text-black">
                        What Our
                    </h2>
                    <h2 className="text-4xl font-bold mb-6 text-black">
                        Customers Say
                    </h2>
                </div>

                {/* Main Testimonial Display */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                        {/* Quote Icon */}
                        <div className="absolute -top-6 left-8">
                            <div className="bg-gradient-to-r from-white p-4 rounded-full shadow-lg">
                                <Quote className="w-8 h-8 text-black" />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Customer Image */}
                            <div className="relative flex-shrink-0">
                                <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${testimonials[currentIndex].bgColor} p-1 shadow-2xl`}>
                                    <img
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-2 shadow-lg">
                                    <div className="w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* Rating Stars */}
                                <div className="flex justify-center lg:justify-start mb-4">
                                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-xl md:text-2xl text-black/90 leading-relaxed mb-6 font-light">
                                    &quot;{testimonials[currentIndex].text}&quot;
                                </p>

                                {/* Customer Info */}
                                <div>
                                    <h4 className="text-2xl font-bold text-black mb-1">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-black text-lg">
                                        {testimonials[currentIndex].role}
                                    </p>
                                    <p className="text-black text-sm">
                                        {testimonials[currentIndex].company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 group"
                    >
                        <ChevronLeft className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border border-white/30 group"
                    >
                        <ChevronRight className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-12 space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-gradient-to-r from-white-400 to-pink-400 scale-125'
                                : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>


                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            onClick={() => goToSlide(index)}
                            className={`cursor-pointer transition-all duration-500 transform hover:scale-105 rounded-2xl ${index === currentIndex ? 'scale-105 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                                }`}
                        >

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h5 className="text-black font-semibold">{testimonial.name}</h5>
                                        <p className="text-black text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-black/80 text-sm line-clamp-3">
                                    &quot;{testimonial.text}&quot;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </section>
    );
};

export default TestimonialsSection;