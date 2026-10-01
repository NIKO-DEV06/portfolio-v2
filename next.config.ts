import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Project screenshots and the portrait live on Cloudinary (carried over from v1).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/djabkdvek/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
