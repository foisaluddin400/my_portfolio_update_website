/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
    
      {
        protocol: 'http',
        hostname: '10.10.20.60',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',           // Allow all HTTPS domains (safe for production)
      },
    ],
  },
};

export default nextConfig;
