import { NextResponse } from 'next/server';

let productsCache: any = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const category = searchParams.get('category');

        const now = Date.now();
        if (productsCache && now - cacheTime < CACHE_DURATION) {
            
            let filtered = productsCache;
            if (category) {
                const categories = category.split(',');
                filtered = productsCache.filter((p: any) => 
                    p.category && categories.includes(p.category.name)
                );
            }

            const total = filtered.length;
            const start = (page - 1) * limit;
            const paginatedProducts = filtered.slice(start, start + limit);

            return NextResponse.json({
                products: paginatedProducts,
                total,
                page,
                totalPages: Math.ceil(total / limit),
                fromCache: true
            });
        }

        
        // Fetch from CMS (NO next: revalidate)
        const response = await fetch('https://cms.furnishings.daikimedia.com/api/products');
        
        const data = await response.json();
        
        if (!data.success) {
            return NextResponse.json({ products: [], total: 0 });
        }

        // Transform to minimal payload
        const transformedProducts = data.data.map((p: any) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category ? {
                name: p.category.name,
                slug: p.category.slug
            } : null,
            images: {
                main_image: p.images?.main_image || ''
            },
            description: {
                short: p.description?.short?.substring(0, 100) || ''
            },
            brand: p.brand || '',
            retail_price: p.retail_price,
            purchase_price: p.purchase_price
        }));

        productsCache = transformedProducts;
        cacheTime = Date.now();

        let filtered = transformedProducts;
        if (category) {
            const categories = category.split(',');
            filtered = transformedProducts.filter((p: any) => 
                p.category && categories.includes(p.category.name)
            );
        }

        const total = filtered.length;
        const start = (page - 1) * limit;
        const paginatedProducts = filtered.slice(start, start + limit);

        return NextResponse.json({
            products: paginatedProducts,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error('Error in products API:', error);
        return NextResponse.json({ 
            products: [], 
            total: 0,
            error: 'Failed to fetch products'
        });
    }
}