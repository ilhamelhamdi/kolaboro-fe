import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v1.padlet.pics',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'padlet.net',
        port: '',
        pathname: '**',
      },
    ],
  },

};

export default nextConfig;
