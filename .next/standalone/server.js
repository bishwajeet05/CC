const path = require('path')

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// Use Hostinger's port and hostname
const port = process.env.PORT || 3000
// Allow connections from any hostname
const hostname = '0.0.0.0'

// Disable Redis for now since it's not configured
process.env.REDIS_URL = ''

require('next')
const { startServer } = require('next/dist/server/lib/start-server')

const nextConfig = {
  env: {
    REDIS_URL: '',
    RATE_LIMIT_MAX_REQUESTS: '60',
    RATE_LIMIT_WINDOW_MS: '60000',
    CACHE_TTL_SECONDS: '3600'
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  // Add these settings for better compatibility
  poweredByHeader: false,
  generateEtags: true,
  compress: true
}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port,
  allowRetry: false,
  // Add keepAliveTimeout for better connection handling
  keepAliveTimeout: 60000
}).catch((err) => {
  console.error(err);
  process.exit(1);
});