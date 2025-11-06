import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
    ],
  },
  // Redirect root to default locale
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ru',
        permanent: false,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
