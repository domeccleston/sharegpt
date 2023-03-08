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

    // POST /api/conversations (for saving conversations)
  } else if (req.method === "POST") {
    try {
      const { success } = await ratelimit.limit("sharegpt-save-endpoint");
      if (!success) {
        return res.status(429).json({ error: "Don't DDoS me pls 🥺" });
      }
      const session = await getServerSession(req, res);

      if(!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const content = req.body;
      const response = await saveConversationAndGetConversationHash(content, session?.user?.id ?? null);
      return res.status(200).json(response);
    } catch (error: unknown) {
      console.log("Error saving conversation: ", error);
      return res.status(500).json({ message: "Error saving conversation." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function saveConversationAndGetConversationHash(
  content: ConversationProps["content"],
  userId: string | null
): Promise<any> {
  const id = nanoid();
  const title = content?.items[0]?.value
    ? truncate(content?.items[0]?.value, 180)
    : "Untitled";
  const avatar = content?.avatarUrl || `https://avatar.vercel.sh/${id}`;
  try {
    const data = {
      id,
      title,
      avatar,
      content,
      ...(userId && { creatorId: userId }),
    };
    await prisma.conversation.create({
      data: data,
    });
    return { id };
  } catch (e: any) {
    if (e.code === "P2002") {
      console.log("Key already exists, trying again...");
      return saveConversationAndGetConversationHash(content, userId);
    }
    throw e;
  }
}
