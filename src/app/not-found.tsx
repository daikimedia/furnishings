import Link from 'next/link';
import { TriangleAlert, ArrowLeft } from 'lucide-react';

export default function Custom404() {
    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-black" />

            <div className="container mx-auto text-center px-4 relative">
                {/* Flag Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="bg-orange-600 p-4 rounded-lg">
                        <TriangleAlert className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Error Title */}
                <h1 className="text-5xl font-bold text-white mb-4">
                    Error 404
                </h1>

                {/* Error Message */}
                <p className="text-xl text-white mb-2 font-medium">
                    It looks like something went <span className='text-orange-600'>wrong</span>
                </p>

                {/* Sub Message */}
                <p className="text-gray-400 mb-8 leading-relaxed">
                    We&apos;re sorry for the inconvenience. The page you&apos;re trying to
                    <br />
                    access has either been removed or never existed.
                </p>

                {/* Back Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-full font-semibold scale-100 hover:scale-105 transition duration-300 ease-in-out"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    BACK HOME
                </Link>
            </div>
        </div>
    );
}