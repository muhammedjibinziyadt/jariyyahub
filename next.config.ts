import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Optimize for SSR
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Performance optimizations
  compress: true,
  
  // Enable static generation where possible
  output: 'standalone',
};

export default nextConfig;
