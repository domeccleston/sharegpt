import { NextApiRequest, NextApiResponse } from "next";
import { getConvos } from "@/lib/api";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { getServerSession } from "@/lib/auth";
import { ratelimit } from "@/lib/upstash";
import sanitize from "sanitize-html";
import prisma from "@/lib/prisma";
import { nanoid, truncate } from "@/lib/utils";
import { ConversationProps } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/conversations (for fetching conversations)
  if (req.method === "GET") {
    const { type, page, search } = req.query as {
      type: string;
      page?: string;
      search?: string;
    };

    const response = await getConvos({
      orderBy: type === "new" ? "createdAt" : "views",
      take: PAGINATION_LIMIT,
      skip: page ? parseInt(page) * 50 : 0,
      search,
    });
    res.status(200).json(response);

    // OPTIONS /api/conversations (for CORS)
  } else if (req.method === "OPTIONS") {
    res.status(200).send("OK");

    // DELETE /api/conversations
  } else if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res);
      const { id } = req.query as { id: string };
      const conversation = await prisma.conversation.findUnique({
        where: { id },
      });
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      const timeCreated = conversation.createdAt.getTime();
      // check if time created is less than one hour ago
      if (timeCreated + 1000 * 60 * 60 > Date.now()) {
        await prisma.conversation.delete({
          where: { id },
        });
        return res.status(200).json({ message: "Conversation deleted" });
      }
      return res.status(401).json({ error: "Not authorized" });
      // if (conversation.creatorId !== session?.user?.id) {
      //   return res.status(401).json({ error: "Not authorized" });
      // }
      return res.status(200).json({ message: "Conversation deleted" });
    } catch (error: unknown) {
      console.log("Error deleting conversation: ", error);
      return res.status(500).json({ message: "Error deleting conversation." });
    }

    // POST /api/conversations (for saving conversations)
  } else if (req.method === "POST") {
    try {
      const { success } = await ratelimit.limit("sharegpt-save-endpoint");
      if (!success) {
        return res.status(429).json({ error: "Don't DDoS me pls 🥺" });
      }
      const session = await getServerSession(req, res);
      const content = req.body;
      const response = await setRandomKey(content, session?.user?.id ?? null);
      return res.status(200).json(response);
    } catch (error: unknown) {
      console.log("Error saving conversation: ", error);
      return res.status(500).json({ message: "Error saving conversation." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function setRandomKey(
  content: ConversationProps["content"],
  userId: string | null
): Promise<any> {
  console.log({ content: content.items });
  const id = nanoid();
  const title = content?.items[0]?.value
    ? truncate(content?.items[0]?.value, 180)
    : "Untitled";
  console.log({ title });
  const avatar = content?.avatarUrl || `https://avatar.vercel.sh/${id}`;
  try {
    await prisma.conversation.create({
      data: {
        id,
        title,
        avatar,
        content,
        ...(userId && { userId }),
      },
    });
    return { id };
  } catch (e: any) {
    if (e.code === "P2002") {
      console.log("Key already exists, trying again...");
      return setRandomKey(content, userId);
    }
    throw e;
  }
}
