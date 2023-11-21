/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  async headers() {
    return [
      {
        source: "/:photos*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=86400, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
