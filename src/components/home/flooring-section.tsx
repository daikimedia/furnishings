import { CloudRainWind, Layers, Sprout, LayoutDashboard, Home, RulerDimensionLine } from "lucide-react";


interface FlooringItem {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const flooringItems: FlooringItem[] = [
    {
        title: "Laminate Flooring Malaysia",
        description:
            "Upgrade your space with high gloss laminates Malaysia or wooden laminates Malaysia. Our laminate wood flooring is durable and affordable, perfect for residential and commercial use.",
        icon: <CloudRainWind size={24} className="text-white" />,
    },
    {
        title: "Vinyl Flooring Malaysia",
        description:
            "Choose from vinyl floor tiles Malaysia, vinyl sheet flooring Malaysia, or buy vinyl flooring Malaysia in rolls. Our waterproof kitchen vinyl flooring and bathroom waterproof vinyl flooring are ideal for any home.",
        icon: <Layers size={24} className="text-white" />,
    },
    {
        title: "Synthetic Grass Malaysia",
        description:
            "Enhance your outdoor space with artificial grass Malaysia or outdoor artificial turf. Perfect for fake grass installation Malaysia or artificial grass for balcony areas.",
        icon: <Sprout size={24} className="text-white" />,
    },
    {
        title: "Carpet Store Malaysia",
        description:
            "Visit our carpet store Malaysia for office carpet Malaysia, carpet tiles Malaysia, or buy carpets online Malaysia. Explore cheap carpet tiles Malaysia and office carpet tiles for your space.",
        icon: <LayoutDashboard size={24} className="text-white" />,
    },
    {
        title: "Home Flooring Solutions Malaysia",
        description:
            "From vinyl sheet flooring for office to commercial vinyl sheet flooring Malaysia, we offer the best vinyl floor supplier in Malaysia. Check out homogeneous vinyl flooring Malaysia and wooden flooring Malaysia.",
        icon: <Home size={24} className="text-white" />,
    },
    {
        title: "Interior Design Malaysia",
        description:
            "Collaborate with vinyl sheet supplier Malaysia for home decor Malaysia. Find affordable vinyl sheet flooring Malaysia and carpet tile supplier Malaysia for your interior design projects.",
        icon: <RulerDimensionLine size={24} className="text-white" />,
    },
];

const FlooringSection = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Explore Flooring Solutions in Malaysia
                </h2>
                <p className="text-lg text-gray-600 mb-10 text-center">
                    Discover the best home flooring solutions Malaysia has to offer, including laminate flooring Malaysia, vinyl flooring Malaysia, and more. Whether you&apos;re looking for waterproof vinyl flooring, affordable laminate flooring, or artificial grass Malaysia, we’ve got you covered!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {flooringItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-orange-200 shadow-md"
                        >
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                            <p className="text-gray-600 text-justify mb-4">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default FlooringSection;