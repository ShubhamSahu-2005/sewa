// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    minimumCacheTTL: 60,
    domains: ['example.com','res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
