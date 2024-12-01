import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s3-alpha-sig.figma.com' , 'res.cloudinary.com']
  }
};

export default nextConfig;
