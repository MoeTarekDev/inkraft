/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "mhaecmyismipbjjgpdys.supabase.co",
      },
    ],
  },
};

export default nextConfig;
