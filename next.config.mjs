/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ESLint checks during build for code quality
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Enable TypeScript checks during build for type safety
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable image optimization for better performance
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
