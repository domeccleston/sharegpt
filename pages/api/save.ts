// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://global-real-gibbon-30346.upstash.io",
  token:
    "AXaKACQgYTY3YTUwYjMtMWFlZC00ZTBhLWJlNTEtOGJmNmIyOTIwM2U0ZmYzNjVkYjk1NDNjNGVhNTk1MWJmM2NlOTcyYjlhYmQ=",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = req.headers;
  if (req.headers.origin !== "https://chat.openai.com")
    return res.status(400).json("Invalid origin");
  res.status(200).json({ headers });
}
