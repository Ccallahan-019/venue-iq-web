import { withPayload } from '@payloadcms/next/withPayload'

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  transpilePackages: ['venue-iq-ui', 'venue-iq-shared'],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
