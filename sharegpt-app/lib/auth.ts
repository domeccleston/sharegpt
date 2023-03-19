import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export interface Session {
  user: {
    email?: string | null;
    id?: string | null;
    name?: string | null;
  };
}

/**
 * @deprecated
 */
export async function getServerSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return (await unstable_getServerSession(req, res, authOptions)) as Session;
}
