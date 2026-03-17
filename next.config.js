/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config, { isServer }) => {
    // Konva requires the native `canvas` module for Node.js SSR,
    // but we load StudioCanvas with `dynamic(..., { ssr: false })` so it
    // never actually runs server-side. Aliasing to false prevents the
    // webpack "Module not found: Can't resolve 'canvas'" build error.
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
