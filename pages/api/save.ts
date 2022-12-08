// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.origin !== "https://chat.openai.com")
    return res.status(400).json("Invalid origin");
  const html = req.body;
  if (req.method !== "OPTIONS") {
    const { success } = await ratelimit.limit("sharegpt-save-endpoint");
    if (!success) {
      res.status(429).json({ error: "Don't DDoS me pls 🥺" });
    }
    const id = await setRandomKey(html);
    res.status(200).json({ id });
  } else {
    return res.status(200).end();
  }
}

async function setRandomKey(html: any): Promise<string> {
  const key = nanoid();
  const response = await redis.set(key, html, {
    nx: true, // only set if key does not exist
  });
  if (response === "OK") {
    return key;
  }
  // by the off chance that the key already exists, try again
  return setRandomKey(html);
}
