"use client";

const ReviewSchema = () => {
    const reviews = [
        {
            name: "Teresa Whiting",
            date: "2025-06-18",
            rating: 4,
            text: "Amazing service and quality work. The team was professional and delivered exactly what we needed",
        },
        {
            name: "Nicola Reddish",
            date: "2025-06-18",
            rating: 5,
            text: "I'm a very nervous patient and I've loved that all my treatment appointments have felt quick and no nonsense and explained all the way through, thank you for making this experience so comfortable and stress-free.",
        },
        {
            name: "Bio's Story",
            date: "2025-06-18",
            rating: 4,
            text: "Very clean and modern practice, very nice dentist he listen to all my problem in details no rush, and in the end I was able to leave there practice pain free and with a beautiful smile.",
        },
        {
            name: "Nur Hanis",
            date: "2025-06-18",
            rating: 4,
            text: "Our kitchen vinyl floor survived multiple floods—no damage, no peeling. Furnishing Solutions did an excellent job with installation and customer service.",
        },
        {
            name: "Imran Rafiq",
            date: "2025-06-18",
            rating: 5,
            text: "Stylish and easy to maintain. Our café looks great and still looks brand new after a year of daily use. Highly recommend their flooring solutions.",
        },
        {
            name: "Sarah Ahmed",
            date: "2025-06-17",
            rating: 4,
            text: "Outstanding service from start to finish. The team was punctual, professional, and the quality exceeded our expectations.",
        },
    ];

    // ⭐ Calculate aggregate rating
    const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Furnishings",
        url: "https://www.furnishings.com.my/",
        image: "https://www.furnishings.com/logo.jpg",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Furnishing Flooring Solutions",
            addressLocality: "Selangor",
            addressRegion: "Malaysia",
            postalCode: "12345",
            addressCountry: "MY",
        },
        telephone: "+60 12-349 8710",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: reviews.length,
        },
        review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating,
                bestRating: "5",
            },
            reviewBody: r.text,
            datePublished: r.date,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default ReviewSchema;
