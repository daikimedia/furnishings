'use client'

import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,

} from 'lucide-react'


export default function SocialMediaBanner() {
    return (
        <section className="relative bg-green-100 overflow-hidden py-16">
            {/* SVG Curve Background */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path
                    fill="#c0e3d6"
                    fillOpacity="1"
                    d="M0,128L60,144C120,160,240,192,360,181.3C480,171,600,117,720,117.3C840,117,960,171,1080,181.3C1200,192,1320,160,1380,144L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                ></path>
            </svg>

            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="mb-10 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
                        Have You Joined Our Telegram Channel?
                    </h2>
                    <p className="mt-2 text-lg text-black">
                        For the latest designs and collections
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <SocialIcon bg="#3b5998" icon={<Facebook className="text-white w-5 h-5" />} />
                    <SocialIcon bg="#000" icon={<Twitter className="text-white w-5 h-5" />} />
                    <SocialIcon bg="#E4405F" icon={<Instagram className="text-white w-5 h-5" />} />
                    <SocialIcon bg="#FF0000" icon={<Youtube className="text-white w-5 h-5" />} />
                    <SocialIcon bg="#0A66C2" icon={<Linkedin className="text-white w-5 h-5" />} />

                </div>
            </div>
        </section>
    )
}

function SocialIcon({ bg, icon }: { bg: string; icon: React.ReactNode }) {
    return (
        <div
            className="w-11 h-11 rounded-full flex items-center justify-center transition transform hover:scale-110 hover:shadow-lg"
            style={{ backgroundColor: bg }}
        >
            {icon}
        </div>
    )
}
