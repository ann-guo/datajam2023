/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false};
    return config
  },
  images: {
    domains: ['cdn.dota2.com'],
   
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = nextConfig