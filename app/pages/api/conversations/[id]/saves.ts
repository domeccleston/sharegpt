import { NextRequest } from "next/server";
import { conn } from "@/lib/planetscale";

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
    const response = await conn.execute(
      "SELECT COUNT(*) FROM Save WHERE conversationId = ?",
      [id]
    );
    let count;
    try {
      // @ts-ignore
      count = response.rows[0]["count(*)"];
    } catch (e) {
      count = 0;
    }
    return new Response(
      JSON.stringify({
        count,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}
