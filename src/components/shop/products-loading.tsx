export default function ProductsLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
                {/* Header skeleton */}
                <div className="text-center mb-12">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>

                {/* Filters and grid layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar filter skeleton */}
                    <div className="w-full lg:w-64">
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products grid skeleton */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                    <div className="h-56 bg-gray-200"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}