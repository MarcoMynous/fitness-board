import Redis from 'ioredis';

let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  if (!redisClient) {
    try {
      redisClient = new Redis(url, {
        maxRetriesPerRequest: 1,
        connectTimeout: 2000,
        lazyConnect: true,
      });

      redisClient.on('error', (err) => {
        // Silently handle Redis unavailability in local environments without crashing
        // console.warn('Redis unavailable, using memory fallback:', err.message);
      });
    } catch {
      redisClient = null;
    }
  }

  return redisClient;
}

// In-memory fallback map: key -> Array of timestamps
const memoryStore = new Map<string, number[]>();

/**
 * Sliding window rate limiter using Redis (with seamless in-memory fallback)
 * @param identifier Unique ID (e.g. `magic_link:127.0.0.1` or `magic_link:user@example.com`)
 * @param limit Maximum allowed requests in the time window
 * @param windowSeconds Window length in seconds (default: 600s = 10 minutes)
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowSeconds: number = 600
): Promise<{ success: boolean; remaining: number; resetInSeconds: number }> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - windowSeconds;
  const key = `ratelimit:${identifier}`;

  const redis = getRedisClient();

  if (redis && redis.status === 'ready') {
    try {
      const multi = redis.multi();
      // Remove timestamps older than window
      multi.zremrangebyscore(key, 0, windowStart);
      // Count remaining in window
      multi.zcard(key);
      // Add current timestamp
      multi.zadd(key, now, `${now}-${Math.random()}`);
      // Set key expiry
      multi.expire(key, windowSeconds);

      const results = await multi.exec();
      const count = (results?.[1]?.[1] as number) || 0;

      if (count >= limit) {
        return {
          success: false,
          remaining: 0,
          resetInSeconds: windowSeconds,
        };
      }

      return {
        success: true,
        remaining: Math.max(0, limit - count - 1),
        resetInSeconds: windowSeconds,
      };
    } catch (e) {
      // Fall through to memory fallback on Redis error
    }
  }

  // --- In-Memory Fallback ---
  const timestamps = memoryStore.get(key) || [];
  const validTimestamps = timestamps.filter((t) => t > windowStart);

  if (validTimestamps.length >= limit) {
    memoryStore.set(key, validTimestamps);
    return {
      success: false,
      remaining: 0,
      resetInSeconds: windowSeconds,
    };
  }

  validTimestamps.push(now);
  memoryStore.set(key, validTimestamps);

  return {
    success: true,
    remaining: limit - validTimestamps.length,
    resetInSeconds: windowSeconds,
  };
}
