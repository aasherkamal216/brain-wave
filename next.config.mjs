/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the app directory feature directly
  appDir: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // Allow images from this domain
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Enable top-level await in Webpack
    };
    return config;
  },
};

export default nextConfig;