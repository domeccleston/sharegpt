// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers.origin !== "https://chat.openai.com")
    return res.status(400).json("Invalid origin");
  const html = req.body;
  console.log(html);
  if (req.method !== "OPTIONS") {
    const id = nanoid();
    await redis.set(id, html);
    res.status(200).json({ id });
  } else {
    return res.status(200).end();
  }
}
