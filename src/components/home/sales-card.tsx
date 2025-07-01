'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FurniturePromoBanner() {
    return (
        <section className='container mx-auto px-4   py-16'>
            <div className="w-full flex flex-col md:flex-row gap-4 ">
                {/* Left Banner */}
                <div className="relative w-full md:w-1/2 h-[300px] bg-[#f8f7fb] overflow-hidden flex items-center">
                    <Image
                        src="/banner1.avif"
                        alt="Sofa"
                        fill
                        className="object-cover object-left md:object-center"
                    />

                    <div className="relative z-10 ml-auto mr-10 max-w-[300px] text-white">
                        <h2 className="text-3xl font-semibold mb-2 leading-tight">Cool Looks. <br /> Hot Deals.</h2>
                        <Link href='#' className="text-lg">Great Discounts Here</Link>
                    </div>
                </div>

                {/* Right Banner */}
                <div className="relative w-full md:w-1/2 h-[300px] bg-[#f8f7fb] overflow-hidden flex items-center">
                    <Image
                        src="/banner2.jpg"
                        alt="Chair"
                        fill
                        className="object-cover object-right md:object-center"
                    />

                    <div className="relative z-10 ml-10 max-w-[300px] text-white">
                        <h2 className="text-3xl font-semibold mb-2 leading-tight">Crafted for <br /> Comfort & Class</h2>
                        <Link href='#' className="text-lg">Great Discounts Here</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
