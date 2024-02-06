const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  env: {
    VERSION: version,
  },
};

module.exports = nextConfig;
