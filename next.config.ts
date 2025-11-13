import type {NextConfig} from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Solves the "Unknown module type" error for @mapbox/node-pre-gyp
    config.resolve.alias['@mapbox/node-pre-gyp/lib/util/nw-pre-gyp/index.html'] = path.resolve(
      __dirname,
      'src/lib/empty-module.js'
    );
    return config;
  },
};

export default nextConfig;
