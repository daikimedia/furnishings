"use client";
import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Nur Hanis",
            place: "Shah Alam",
            rating: 5,
            text: "Our kitchen vinyl floor survived multiple floods—no damage, no peeling. Furnishing Solutions did an excellent job.",
        },
        {
            id: 2,
            name: "Imran Rafiq",
            place: "Kuala Lumpur",
            rating: 5,
            text: "Stylish and easy to maintain. Our café looks great and still looks brand new after a year of daily use.",
        },
        {
            id: 3,
            name: "Lee Wei Ming",
            place: "Penang",
            rating: 5,
            text: "The team installed office flooring quickly, silently, and efficiently—highly professional.",
        },
    ];

    return (
        <section className="px-6 py-12">
            <div className="container mx-auto ">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-black">Client Testimonials</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-xl border border-orange-100 shadow-md p-6 h-full flex flex-col justify-between"
                        >
                            <div>
                                <Quote className="w-8 h-8 text-orange-500 mb-4" />
                                <p className="text-gray-700 text-base mb-6 ">
                                    “{testimonial.text}”
                                </p>
                            </div>

                            <div>
                                {testimonial.rating && (
                                    <div className="flex gap-1 mb-2">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                )}
                                <h5 className="text-black font-semibold text-base">{testimonial.name}</h5>
                                <p className="text-sm text-gray-500">{testimonial.place}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
