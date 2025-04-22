import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*\\.(jpg|jpeg|png|gif|webp|svg|ico)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-store, no-cache, max-age=0, must-revalidate', // Disable caching
  //         },
  //       ],
  //     },
  //     // {
  //     //   source: '/:path*', // Apply to all other routes if needed (e.g. all pages or assets)
  //     //   headers: [
  //     //     {
  //     //       key: 'Cache-Control',
  //     //       value: 'no-store, no-cache, max-age=0, must-revalidate', // Disable caching globally
  //     //     },
  //     //   ],
  //     // }
  //   ];
  // },
};

export default nextConfig;
