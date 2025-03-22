/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disabling ESLint during production builds for faster deployments
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = nextConfig; 