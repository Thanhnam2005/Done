/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/image-to-pdf/',
  basePath: '/image-to-pdf',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

