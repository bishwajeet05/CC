/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Configure environment variables with defaults
  env: {
    REDIS_URL: '',  // Disable Redis by default
    RATE_LIMIT_MAX_REQUESTS: '60',
    RATE_LIMIT_WINDOW_MS: '60000',
    CACHE_TTL_SECONDS: '3600',
  },

  // Temporarily ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize for hosting environment
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // Configure headers for security and CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },

  // Configure redirects
  async redirects() {
    return [
      {
        source: '/convert',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Optimize for production
  swcMinify: true,
  reactStrictMode: true,
  
  // Disable server-side features that might not be supported
  experimental: {
    serverActions: false,
  },
};

export default nextConfig; 