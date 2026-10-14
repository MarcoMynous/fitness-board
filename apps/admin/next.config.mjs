/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  transpilePackages: ['@repo/ui', '@repo/domain', '@repo/auth', '@repo/database'],
};

export default nextConfig;
