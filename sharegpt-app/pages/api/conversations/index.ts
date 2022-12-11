import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getConvos } from "@/lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { type } = req.query as { type: string };
    const response = await getConvos({
      orderBy: type === "new" ? "createdAt" : "views",
      take: 100,
    });
    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
