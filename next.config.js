/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["b797b0-3.myshopify.com"],
  },

  env: {
    baseURL: process.env.BASE_URL,
    

  },
}

module.exports = nextConfig
