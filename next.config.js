/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/image-to-pdf/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/image-to-pdf' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

