import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };
  if (req.method === "POST") {
    const response = await prisma.conversation.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return res.status(200).json({ views: response.views });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
