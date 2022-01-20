const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const plugins = [[withSvgr]];

/** @type {import('next').NextConfig} */

module.exports = withPlugins(plugins, {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['www2.cs.put.poznan.pl', 'www.ibch.poznan.pl'],
  },
  async rewrites() {
    return [
      {
        source: '/api/task',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/task`, // Proxy to Backend
      },
      {
        source: '/api/task/:slug',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/task/:slug`, // Proxy to Backend
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
});
