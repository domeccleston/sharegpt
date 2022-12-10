import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (req.method === "GET") {
    const response = await prisma.upvote.count({
      where: {
        conversationId: id,
      },
    });
    res.status(200).json({
      count: response,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
