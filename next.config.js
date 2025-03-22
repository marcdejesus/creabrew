/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disabling ESLint during production builds for faster deployments
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 