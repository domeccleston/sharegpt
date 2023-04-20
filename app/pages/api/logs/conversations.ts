import { NextRequest } from "next/server";
import { redis } from "@/lib/upstash";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  if (!search) {
    return new Response("Invalid search param", { status: 400 });
  }
  if (req.method === "POST") {
    const response = await redis.zincrby("searches", 1, search.toLowerCase());
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}
