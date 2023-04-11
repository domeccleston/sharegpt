import { redis } from "@/lib/upstash";
import { conn } from "@/lib/planetscale";
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
  } else if (req.method === "DELETE") {
    const ttl = await redis.ttl(`delete:${id}`);
    if (ttl > 0) {
      const response = await conn.execute(
        `DELETE FROM Conversation WHERE id = ?`,
        [id]
      );
      return NextResponse.json(response);
    } else {
      return new Response("Not deletable", { status: 400 });
    }
  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}
