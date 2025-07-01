"use client";
import React, { useState } from 'react';

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
        // Handle form submission here
        alert('Message sent successfully!');
        setFormData({
            firstName: '',
            lastName: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
            {/* Map Section */}
            <div className="w-full h-96 bg-gray-200 relative overflow-hidden">
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

                {/* Map overlay with location marker */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info - Left Side */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Info</h2>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Phone:</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">+012 345 678 102</p>
                                        <p className="text-gray-600">+012 345 678 203</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Email:</h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-600">email@here.com</p>
                                        <p className="text-gray-600">your@email.here</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Address:</h3>
                                    <div className="space-y-1">
                                        <p className="text-gray-600">Address goes here,</p>
                                        <p className="text-gray-600">street, Crossroad 123.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form - Right Side */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

                            <div className="space-y-6">
                                {/* First Name and Last Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                        placeholder="Enter subject"
                                        required
                                    />
                                </div>

                                {/* Message */}
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
                                        placeholder="Enter your message"
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                                    >
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;