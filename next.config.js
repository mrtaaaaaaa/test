const withFonts = require('next-fonts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['']
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(docx)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
};

module.exports = withFonts(nextConfig);

// const withCSS = require("@zeit/next-css");

// module.exports = withCSS({
//   /* Other Next.js configuration options */
// });