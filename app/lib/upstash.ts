import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initiate Redis instance
export const redis = Redis.fromEnv();

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});
