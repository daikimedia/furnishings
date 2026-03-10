import { NextResponse } from 'next/server';

// Simple in-memory cache
let categoriesCache: any = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
    try {
        // Return cached data if available
        const now = Date.now();
        if (categoriesCache && now - cacheTime < CACHE_DURATION) {
            return NextResponse.json({ 
                success: true, 
                data: categoriesCache,
                fromCache: true 
            });
        }

        const response = await fetch('https://cms.furnishings.daikimedia.com/api/categories');

        if (!response.ok) {
            return NextResponse.json({ success: false, data: [] });
        }

        const data = await response.json();
        
        if (data.success) {
            // Store in memory cache
            categoriesCache = data.data;
            cacheTime = Date.now();
        }

        return NextResponse.json({ 
            success: true, 
            data: data.success ? data.data : [] 
        });

    } catch (error) {
        console.error('Error in categories API:', error);
        return NextResponse.json({ success: false, data: [] });
    }
}