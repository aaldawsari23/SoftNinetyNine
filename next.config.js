const isDev = process.env.NODE_ENV !== 'production'
const isUnoptimized = process.env.NEXT_IMAGE_UNOPTIMIZED === 'true' || isDev

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: isUnoptimized,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      try {
        const { BundleAnalyzerPlugin } = require('next/dist/compiled/webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: isServer
              ? 'analyze/server.html'
              : 'analyze/client.html',
            openAnalyzer: false,
          })
        )
      } catch (error) {
        console.warn('Bundle analyzer is not available in this environment.', error)
      }
    }

    return config
  },
}

module.exports = nextConfig
