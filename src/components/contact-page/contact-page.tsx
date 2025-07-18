"use client";
import { Phone, Layers, HelpCircle, Ruler, Truck, Info, CalendarCheck, Clock, Building2, Calendar, MapPin } from 'lucide-react';
import React, { useState } from 'react';

export const metadata = {
    title: "Contact Us | Furnishing – Vinyl & PVC Flooring Experts in Malaysia",
    description: "Need flooring advice in Malaysia? Contact Furnishing for expert guidance, free quotes, and top-quality vinyl & PVC flooring installation nationwide.",
};
const services = [
    {
        icon: <Phone className="w-6 h-6 text-white" />,
        title: "Free Flooring Consultation",
    },
    {
        icon: <Layers className="w-6 h-6 text-white" />,
        title: "Product Recommendations",
    },
    {
        icon: <HelpCircle className="w-6 h-6 text-white" />,
        title: "Detailed Quotes (Materials + Installation)",
    },
    {
        icon: <Ruler className="w-6 h-6 text-white" />,
        title: "On-Site Measurement Scheduling",
    },
    {
        icon: <Truck className="w-6 h-6 text-white" />,
        title: "Product Sample Requests",
    },
    {
        icon: <Info className="w-6 h-6 text-white" />,
        title: "After-Sales Support & Warranty Info",
    },
];

const quoteItems = [
    {
        icon: <Layers className="w-6 h-6 text-white" />,
        text: "Type of flooring you're interested in (LVP, LVT, PVC Sheet, SPC)",
    },
    {
        icon: <Ruler className="w-6 h-6 text-white" />,
        text: "Area size in square feet or meters",
    },
    {
        icon: <Building2 className="w-6 h-6 text-white" />,
        text: "Room type and intended use (e.g., kitchen, living room, office)",
    },
    {
        icon: <MapPin className="w-6 h-6 text-white" />,
        text: "Property location (city and state)",
    },
    {
        icon: <Calendar className="w-6 h-6 text-white" />,
        text: "Preferred time for installation",
    },
];

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Message sent successfully!');
        setFormData({
            firstName: '',
            lastName: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className=" bg-white">
            <div className='container mx-auto px-6'>
                {/* Introduction Section */}
                <section className="py-12">
                    <div className=" text-center">
                        <h2 className="text-3xl font-bold text-black mb-12">
                            Let&apos;s Start Your Flooring Project with Confidence
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Looking for premium vinyl, PVC, or SPC flooring solutions in Malaysia? At Furnishing, we&apos;re committed to transforming residential and commercial spaces with high-quality, durable, and stylish flooring options. Whether you need expert advice, a custom quote, or an on-site consultation, our experienced team is ready to assist you.
                        </p>
                    </div>
                </section>

                {/* Contact Information Section */}

                {/* Services Section */}
                <section className="py-12">
                    <div className="text-center   mb-12">
                        <h2 className="text-3xl font-bold text-black mb-12">
                            Why Reach Out to Furnishing ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            As a leading provider of vinyl and PVC flooring in Malaysia, every flooring project begins with a clear conversation. We encourage homeowners, business owners, interior designers, and contractors to get in touch for:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {services.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md border border-orange-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className=" flex items-center justify-center rounded-lg w-12 h-12 bg-orange-600">{item.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg text-gray-700 ">
                            We are here to make your flooring process simple, transparent, and stress-free—from inquiry to installation.
                        </p>
                    </div>
                </section>

                {/* Business Hours Section */}
                <section className="py-12">
                    <div className=" text-center">
                        <h2 className="text-3xl md:text-4xl font-bold  mb-12">
                            Business Hours
                        </h2>
                        <div className="space-y-6 text-lg text-black">
                            <div className="flex justify-center items-center gap-3">
                                <Clock className="w-6 h-6 text-green-600" />
                                <span >
                                    <strong>Monday – Saturday:</strong> 9:00 AM to 6:00 PM
                                </span>
                            </div>
                            <div className="flex justify-center items-center gap-3">
                                <Clock className="w-6 h-6 text-red-500" />
                                <span>
                                    <strong>Sunday:</strong> Closed{" "}
                                    <span className="text-gray-500">
                                        (Appointments available upon request)
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 bg-orange-50 p-6 rounded-xl">
                            <div className="flex justify-center items-center gap-3 text-orange-600">
                                <CalendarCheck className="w-5 h-5" />
                                <p className="text-base">
                                    If you&apos;d like to visit our showroom or need on-site flooring samples, please call ahead to schedule your visit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-12 ">


                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-black mb-12">
                            Request a Free Quote
                        </h3>
                        <p className="text-lg text-gray-600">
                            To receive a fast and accurate quote, please provide the following:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 ">
                        {quoteItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-6  rounded-xl shadow-md border border-orange-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg">{item.icon}</div>
                                    <p className="text-gray-700  text-lg">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 ">
                            Our team will provide a comprehensive estimate, including material costs, installation services, delivery fees (if applicable), and available warranties.
                        </p>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-12">

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Contact Info */}
                            <div className="bg-orange-600 text-white p-8 lg:p-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact Info</h2>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Showroom Address:</h3>
                                        <div className="space-y-2 text-orange-100">
                                            <p>Furnishing Flooring Solutions</p>
                                            <p>[Insert Full Address Here]</p>
                                            <p>Selangor, Malaysia</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Phone / WhatsApp:</h3>
                                        <div className="space-y-2 text-orange-100">
                                            <p>[Insert Phone Number]</p>
                                            <p>(Call or message during business hours)</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Email:</h3>
                                        <div className="space-y-2 text-orange-100">
                                            <p>[Insert Email Address]</p>
                                            <p>(We typically respond within 24 hours)</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold mb-3">Website:</h3>
                                        <div className="text-orange-100">
                                            <a href="https://www.furnishings.com.my" className="hover:text-white transition-colors">
                                                https://www.furnishings.com.my
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="p-8 lg:p-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                                placeholder="Enter your first name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Enter your last name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                            placeholder="Enter subject"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                                            placeholder="Enter your message"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-orange-600  text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                                    >
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl  font-bold text-black mb-12">
                            Get Directions to Our Showroom
                        </h2>
                        <p className="text-base text-gray-600">
                            If you prefer an in-person consultation or would like to browse physical samples, our Selangor showroom is open during business hours.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="h-96 bg-gray-200 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1635824543210!5m2!1sen!2sau"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-6 h-6 bg-orange-600 rounded-full border-4 border-white shadow-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-12">

                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
                        Why Clients Choose Furnishing
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">High-quality flooring materials tailored for Malaysia&apos;s humid climate</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">Expert installation teams with years of industry experience</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">Competitive and transparent pricing – no hidden fees</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">Full warranties and aftercare for peace of mind</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700">Outstanding customer service – before, during, and after installation</p>
                            </div>
                        </div>
                    </div>

                    <section className="bg-orange-50 p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-12">
                            Your Trusted Flooring Partner in Malaysia
                        </h3>
                        <p className="text-gray-700 text-lg">
                            No matter the size or scope of your flooring project, Furnishing offers industry expertise, quality assurance, and complete customer satisfaction. Contact us today and take the first step toward stylish, long-lasting floors.
                        </p>
                    </section>

                </section>
            </div>
        </div>
    );
};

export default ContactUsPage;