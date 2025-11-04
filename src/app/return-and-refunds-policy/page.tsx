import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Return and Refund Policy – Easy Returns | Furnishing Solutions",
    description: "Read our easy return and refund policy to enjoy a secure and worry-free shopping experience for all your modern furniture and stylish home décor items.",
    alternates: {
        canonical: "https://www.furnishings.com.my/return-and-refunds-policy",
    },
};

export default function Refund() {
    return (
        <>

            <main className="container mx-auto px-4 py-10 text-gray-800 leading-relaxed">
                <h1 className="text-3xl font-bold text-black mb-12 item-center text-center">Return & Refund Policy</h1>

                <section className="space-y-5">
                    <h2 className="text-2xl font-semibold text-black">Overview</h2>
                    <p>
                        The information provided on this website is for general information purposes only. Every effort is made to ensure product information is accurate and complete. However, customers are responsible for ensuring the product they purchase suits their specific requirements.
                    </p>
                    <p>
                        For personalized services and recommendations, please contact us via email or telephone. Please note that any advice given by our staff will be based on the information provided by the customer at that time. Wallpaper & Carpets Distributor Sdn Bhd is responsible only for correct advice based on the given information, not the actual situation.
                    </p>
                    <p>
                        Despite our efforts to display accurate images, actual product colours and designs may vary slightly due to screen settings, lighting conditions, and product finishes. Colours can be verified by visiting our showroom.
                    </p>
                    <p>
                        Wallpaper & Carpets Distributor Sdn Bhd will not accept responsibility for colour or design differences that are not factory faults. By purchasing from our website, you agree to accept a small risk of variation between the product shown online and the actual product. Also, note that finishes and colours may differ between manufacturers.
                    </p>
                    <p>
                        To complete your return, we require a receipt or proof of purchase.
                    </p>

                    <h2 className="text-2xl font-semibold text-black mt-10">Refunds Policy</h2>
                    <p>
                        Sold items <span className="font-semibold text-orange-600">cannot be refunded</span>.
                    </p>

                    <h2 className="text-2xl font-semibold text-black mt-10">Return Policy</h2>
                    <p>
                        Any return, if eligible, must be made to WCD <span className="font-semibold text-orange-600">within 21 days</span> from the invoice date, at your own cost. Indent orders, cut-length items, photo murals, and some collections are not returnable. Returns are subject to a <span className="font-semibold text-orange-600">10% handling fee</span>. Please refer to the full Terms & Conditions of WCD.
                    </p>

                    <h2 className="text-2xl font-semibold text-black mt-10">Gifts</h2>
                    <p>
                        Items marked as gifts and shipped directly to you are <span className="font-semibold text-orange-600">not returnable</span>.
                    </p>

                    <h2 className="text-2xl font-semibold text-black mt-10">Shipping Returns</h2>
                    <p>
                        We only replace items if they are defective or damaged due to our manufacturing process. If you need to exchange it for the same item, please email us at:
                    </p>
                    <p >
                        <strong className="text-black"> Email: </strong>
                        businessdev@wcd.com.my
                    </p>
                    <p >
                        <strong className="text-black"> Return Address:</strong>

                        <br />
                        Lot 1509, Old Klang Road, Batu 8,
                        <br />
                        Petaling Jaya, 46500, Selangor, Malaysia.
                    </p>
                    <p>
                        Customers are responsible for the return shipping costs. These costs are non-refundable.
                    </p>
                    <p>
                        Depending on your location, the time it takes for the exchanged product to reach you may vary.
                    </p>
                    <p>
                        If you are returning a high-value item, we recommend using a trackable shipping service or purchasing shipping insurance. We do not guarantee receipt of your returned item.
                    </p>
                </section>
            </main>
        </>
    )
}