/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/image-to-pdf' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/image-to-pdf' : '',
}

module.exports = nextConfig

