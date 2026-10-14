/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/domain', '@repo/auth', '@repo/database'],
};

export default nextConfig;
