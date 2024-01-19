/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "jwpharma.me",
      "phplaravel-1199312-4234008.cloudwaysapps.com",
      "images.pexels.com",
    ],
    minimumCacheTTL: 60,
  },

  env: {
    baseURL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
