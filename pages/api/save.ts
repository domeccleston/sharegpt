// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

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
  return setRandomKey(html);
}
