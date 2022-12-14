import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getComments } from "@/lib/api";
import { nanoid } from "@/lib/utils";
import { getServerSession } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: conversationId } = req.query as { id: string };

  if (req.method === "GET") {
    const response = await getComments(conversationId);
    res.status(200).json(response);
  } else if (req.method === "POST") {
    const { position, content, parentCommentId } = req.body;
    if (!position || !content) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const session = await getServerSession(req, res);
    if (!session?.user?.id) {
      res
        .status(401)
        .json({ error: "Need to be logged in to leave a comment." });
      return;
    }
    const id = nanoid();
    const response = await prisma.comment.create({
      data: {
        id,
        conversationId,
        position,
        content,
        parentCommentId,
        userId: session.user.id,
      },
    });
    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
