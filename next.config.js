const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const plugins = [[withSvgr]];

/** @type {import('next').NextConfig} */

module.exports = withPlugins(plugins, {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/task',
        destination: 'http://rna-server:8080/api/task', // Proxy to Backend
      },
      {
        source: '/api/task/:slug',
        destination: 'http://rna-server:8080/api/task/:slug', // Proxy to Backend
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
