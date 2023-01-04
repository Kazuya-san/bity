/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  //allow images
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
