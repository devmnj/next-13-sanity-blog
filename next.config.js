/** @type {import('next').NextConfig} */

const nextConfig =  {
  
   reactStrictMode:false,
  experimental: {
    transpilePackages: ["ui"],
    appDir: true,
  },
}

module.exports = nextConfig
