import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS
  images: {
    unoptimized: true, // Required for GitHub Pages deployment
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddnzrjcbozvwswjluqpi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // If your repo is NOT "Friedrhys25.github.io" (e.g., it is "lachibugan"),
  // you MUST add the repository name as a basePath:
  basePath: '/lachibugan',
};

export default nextConfig;
