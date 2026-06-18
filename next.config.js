/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/sitemap.xml' },
      { source: '/robots.txt', destination: '/robots.txt' },
    ];
  },
};

module.exports = nextConfig;
