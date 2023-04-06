import { NextApiRequest, NextApiResponse } from "next";
import { getConvos } from "@/lib/api";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { getServerSession } from "@/lib/auth";
import { ratelimit } from "@/lib/upstash";
import sanitizeHtml from "sanitize-html";

import prisma from "@/lib/prisma";
import { nanoid, truncate } from "@/lib/utils";
import { ConversationProps } from "@/lib/types";

const options = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["svg"]),
  allowedClasses: {
    div: [
      "bg-black",
      "mb-4",
      "rounded-md",
      "flex",
      "items-center",
      "relative",
      "text-gray-200",
      "bg-gray-800",
      "px-4",
      "py-2",
      "text-xs",
      "font-sans",
      "flex",
      "ml-auto",
      "gap-2",
    ],
  },
  allowedAttributes: Object.assign(
    {},
    sanitizeHtml.defaults.allowedAttributes,
    {
      div: ["class"],
      span: ["class"],
      button: ["class", "type", "aria-label", "aria-hidden", "title"],
      code: ["class"],
      svg: [
        "class",
        "viewBox",
        "xmlns",
        "fill",
        "width",
        "height",
        "x",
        "y",
        "d",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-width",
        "stroke",
        "fill-rule",
        "clip-rule",
        "stroke-miterlimit",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-opacity",
        "fill-opacity",
        "transform",
        "preserveAspectRatio",
      ],
    }
  ),
  allowedSchemes: ["http", "https", "mailto", "tel", "data"],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET /api/conversations (for fetching conversations) - disabled for now
  /*
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
  */

  // OPTIONS /api/conversations (for CORS)
  if (req.method === "OPTIONS") {
    res.status(200).send("OK");

    // POST /api/conversations (for saving conversations)
  } else if (req.method === "POST") {
    try {
      const { success } = await ratelimit.limit("sharegpt-save-endpoint");
      if (!success) {
        return res.status(429).json({ error: "Don't DDoS me pls 🥺" });
      }
      const session = await getServerSession(req, res);
      console.log("session data: ", session);
      const content = JSON.parse(JSON.stringify(req.body));
      for (let i = 0; i < content.items.length; i++) {
        content.items[i].value = sanitizeHtml(content.items[i].value, options);
      }
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
  const id = nanoid();
  let title;

  if (content?.title && content?.title !== "New conversation") {
    title = content?.title;
  } else {
    title = content?.items[0]?.value
      ? truncate(content?.items[0]?.value, 180)
      : "Untitled";
  }
  
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
