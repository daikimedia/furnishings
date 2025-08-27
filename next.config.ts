import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.furnishings.daikimedia.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
