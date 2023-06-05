/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const productionAPI = 'https://geluhorotancom-horotangelu17.b4a.run';
const developmentAPI = 'http://localhost:5000';

const apiDomain =
  process.env.NODE_ENV === 'production' ? productionAPI : developmentAPI;

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',

  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'www.res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiDomain}/api/:path*`,
      },
    ];
  },
});
