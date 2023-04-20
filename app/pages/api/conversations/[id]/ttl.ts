import { redis } from "@/lib/upstash";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const id = decodeURIComponent(url.split("/")[3]);
  if (!id) {
    return new Response("Invalid ID", { status: 400 });
  }

  if (req.method === "GET") {
    const ttl = await redis.ttl(`delete:${id}`);
    return NextResponse.json({ ttl });
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}
