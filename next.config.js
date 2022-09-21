/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //allow images
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;
