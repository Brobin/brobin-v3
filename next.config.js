/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
    ],
  },
};

module.exports = nextConfig;
