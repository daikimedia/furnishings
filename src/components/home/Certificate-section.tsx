"use client"
import React from 'react';

const CertificateMarquee = () => {
    // You can replace these with your actual certificate images
    const certificates = [
        {
            id: 1,
            name: "OEKO-TEX",
            logo: "/images/marquee/img1.png"
        },
        {
            id: 2,
            name: "ISO 14001",
            logo: "/images/marquee/img2.png"
        },
        {
            id: 3,
            name: "Indoor Air Quality A+",
            logo: "/images/marquee/img3.png"
        },
        {
            id: 4,
            name: "GREENGUARD",
            logo: "/images/marquee/img4.png"
        },
        {
            id: 5,
            name: "1KG Certification",
            logo: "/images/marquee/img5.png"
        },
        {
            id: 6,
            name: "ASTM International",
            logo: "/images/marquee/img6.png"
        },
        {
            id: 7,
            name: "ASTM International",
            logo: "/images/marquee/img7.png"
        },
        {
            id: 8,
            name: "ASTM International",
            logo: "/images/marquee/img8.png"
        },
        {
            id: 9,
            name: "ASTM International",
            logo: "/images/marquee/img9.png"
        },
        {
            id: 10,
            name: "ASTM International",
            logo: "/images/marquee/img10.png"
        },
        {
            id: 11,
            name: "ASTM International",
            logo: "/images/marquee/img11.png"
        }
    ];

    return (
        <div className=" py-10 overflow-hidden">
            <div className="mx-auto ">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
                    <span className="text-orange-600">CHOOSE WITH CONFIDENT WITH OUR </span>
                    <span className="text-gray-800">CERTIFICATE</span>
                </h2>

                <div className="relative">


                    {/* Marquee container - seamless infinite scroll */}
                    <div className="flex animate-seamless-marquee gap-12">
                        {/* Triple the certificates for ultra-smooth seamless loop */}
                        {[...certificates, ...certificates, ...certificates].map((cert, index) => (
                            <div
                                key={`cert-${index}`}
                                className="flex-shrink-0 flex items-center justify-center w-40 h-32 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={cert.logo}
                                    alt={cert.name}
                                    className="h-20 w-20 object-contain filter hover:brightness-110 transition-all duration-300"
                                    style={{ background: 'transparent' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes seamless-marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-100% / 3));
                    }
                }
                
                .animate-seamless-marquee {
                    animation: seamless-marquee 40s linear infinite;
                    width: max-content;
                }
                
                // .animate-seamless-marquee:hover {
                //     animation-play-state: paused;
                // }

                /* Ensure PNG transparency is preserved */
                .animate-seamless-marquee img {
                    background: none !important;
                    backdrop-filter: none;
                }
            `}</style>
        </div>
    );
};

export default CertificateMarquee;