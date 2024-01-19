/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    domains: ["localhost", "jwpharma.me", "images.pexels.com"],
    minimumCacheTTL: 60,
  },

  env: {
    baseURL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
