'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FurniturePromoBanner() {
    return (
        <section className='container mx-auto px-6 py-12'>
            <div className="w-full flex flex-col md:flex-row gap-4">
                {/* Left Banner */}
                <div className="relative group w-full md:w-1/2 h-[300px] bg-[#f8f7fb] overflow-hidden flex items-center">
                    <Image
                        src="/banner1.avif"
                        alt="Sofa"
                        fill
                        className="object-cover object-left md:object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="relative z-10 ml-auto mr-10 max-w-[300px] text-white">
                        <h2 className="text-3xl font-semibold mb-2 leading-tight">
                            Cool Looks. <br /> Hot Deals.
                        </h2>
                        <Link
                            href="/shop"
                            className="text-lg flex items-center gap-2 relative overflow-hidden"
                        >
                            Great Discounts Here
                            <span className="translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-2xl">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Right Banner */}
                <div className="relative group w-full md:w-1/2 h-[300px] bg-[#f8f7fb] overflow-hidden flex items-center">
                    <Image
                        src="/banner2.jpg"
                        alt="Chair"
                        fill
                        className="object-cover object-right md:object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="relative z-10 ml-10 max-w-[300px] text-white">
                        <h2 className="text-3xl font-semibold mb-2 leading-tight">
                            Crafted for <br /> Comfort & Class
                        </h2>
                        <Link
                            href="/shop"
                            className="text-lg flex items-center gap-2 relative overflow-hidden"
                        >
                            Great Discounts Here
                            <span className="translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-2xl">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    );
}
