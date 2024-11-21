import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*', // Apply to all routes, adjust as necessary
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-store, max-age=0, must-revalidate', // Disable caching
  //         },
  //       ],
  //     },
  //   ]
  // },
};

export default nextConfig;
