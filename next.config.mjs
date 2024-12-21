/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'drive.google.com',
            pathname: '/**',
        },],
    },
};

export default nextConfig;
