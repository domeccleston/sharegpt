import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

function generateSiteMap({
  hostname,
  conversations,
}: {
  hostname: string;
  conversations: { id: string }[];
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${hostname}</loc>
       </url>
       <url>
         <loc>${hostname}/explore</loc>
       </url>
       <url>
         <loc>${hostname}/explore/new</loc>
       </url>
       ${conversations
         .map(({ id }) => {
           return `
         <url>
             <loc>${`${hostname}/c/${id}`}</loc>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const hostname = `https://sharegpt.com`;

  // Get all conversations
  const conversations = await prisma.conversation.findMany({
    select: {
      id: true,
    },
    where: {
      private: false,
      views: {
        gte: 100,
      },
    },
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({
    hostname,
    conversations,
  });

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
