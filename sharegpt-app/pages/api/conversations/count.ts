import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { search } = req.query as {
      search?: string;
    };

    const response = await prisma.conversation.count({
      ...(search && {
        where: {
          title: {
            search: search,
          },
        },
      }),
    });

    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
