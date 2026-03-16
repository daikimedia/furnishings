export default function ProductLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                {/* Breadcrumb skeleton */}
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                
                {/* Product grid skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image gallery skeleton */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-lg"></div>
                        <div className="flex space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Product info skeleton */}
                    <div className="space-y-6">
                        {/* Title */}
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        
                        {/* SKU, Brand, Category */}
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        
                        {/* Description */}
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        
                        {/* Key Features Box */}
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                        
                        {/* CTA Box */}
                        <div className="h-40 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Tabs skeleton */}
                <div className="mt-12">
                    <div className="flex space-x-8 border-b">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-10 w-24 bg-gray-200 rounded-t-lg"></div>
                        ))}
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}