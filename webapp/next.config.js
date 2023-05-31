/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.dicebear.com", "picsum.photos", "yt3.ggpht.com"],
  },
};

module.exports = nextConfig;
