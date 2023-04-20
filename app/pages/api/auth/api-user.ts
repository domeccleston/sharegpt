import { generateToken } from "@/lib/generate-token";
import { NextApiRequest, NextApiResponse } from "next";

export default async function generateApiUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Missing JWT_SECRET" });
  }
  const token = generateToken({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({ userId });
}
