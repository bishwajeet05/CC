import Redis from 'ioredis';

// In-memory cache as fallback
const memoryCache = new Map<string, { value: unknown; expiry: number }>();

// Initialize Redis client only if URL is provided
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      retryStrategy: (times: number) => {
        if (times > 3) {
          return null; // Stop retrying after 3 attempts
        }
        return Math.min(times * 50, 1000); // Exponential backoff
      },
      connectTimeout: 1000, // 1 second
      commandTimeout: 1000, // 1 second
    })
  : null;

if (redis) {
  redis.on('error', (error) => {
    console.error('Redis connection error:', error);
  });
}

// Cache conversion result with fallback to memory cache
export async function cacheConversion(key: string, result: unknown) {
  try {
    if (redis?.status === 'ready') {
      await redis.set(key, JSON.stringify(result), 'EX', 3600); // Cache for 1 hour
    } else {
      // Use in-memory cache as fallback
      memoryCache.set(key, {
        value: result,
        expiry: Date.now() + 3600000, // 1 hour
      });
    }
  } catch (error) {
    console.error('Cache error:', error);
    // Use in-memory cache as fallback
    memoryCache.set(key, {
      value: result,
      expiry: Date.now() + 3600000, // 1 hour
    });
  }
}

// Get cached conversion result with fallback to memory cache
export async function getCachedConversion(key: string) {
  try {
    if (redis?.status === 'ready') {
      const cached = await redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } else {
      // Use in-memory cache as fallback
      const cached = memoryCache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.value;
      }
      memoryCache.delete(key);
      return null;
    }
  } catch (error) {
    console.error('Cache get error:', error);
    // Try memory cache as fallback
    const cached = memoryCache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.value;
    }
    memoryCache.delete(key);
    return null;
  }
}

// In-memory rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(ip);

  if (!limit) {
    rateLimits.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Reset counter if more than a minute has passed
  if (now - limit.timestamp > 60000) {
    rateLimits.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Increment counter if within the same minute
  if (limit.count >= 60) { // 60 requests per minute
    return false;
  }

  limit.count += 1;
  return true;
}

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  // Clean up rate limits
  for (const [ip, limit] of rateLimits.entries()) {
    if (now - limit.timestamp > 60000) {
      rateLimits.delete(ip);
    }
  }
  // Clean up memory cache
  for (const [key, cached] of memoryCache.entries()) {
    if (cached.expiry <= now) {
      memoryCache.delete(key);
    }
  }
}, 60000); // Clean up every minute

export { redis }; 