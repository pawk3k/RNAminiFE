const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');

const plugins = [[withSvgr]];

/** @type {import('next').NextConfig} */

module.exports = withPlugins(plugins, {
  reactStrictMode: true,
  swcMinify: false,
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
