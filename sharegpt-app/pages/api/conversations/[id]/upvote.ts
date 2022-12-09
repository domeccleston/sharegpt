import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [, , , id] = req?.url?.split("/") as string[];
  if (req.method === "POST") {
    const session = (await unstable_getServerSession(
      req,
      res,
      authOptions
    )) as Session;
    const userId = session?.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    try {
      const response = await prisma.upvote.create({
        data: {
          conversationId: id,
          userId,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
