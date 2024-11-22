/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: '/image-to-pdf/',
  basePath: '/image-to-pdf',
}

module.exports = nextConfig

