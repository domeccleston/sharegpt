import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

function generateSiteMap({
  hostname,
  conversations,
  pageNumber,
}: {
  hostname: string;
  conversations: { id: string }[];
  pageNumber: number;
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
       ${
         conversations.length === 10000
           ? `
           <url>
             <loc>${`${hostname}/sitemap-${pageNumber + 1}.xml`}</loc>
           </url>
           `
           : ""
       }
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

  // Get the page number from the query string, default to 1
  const pageNumber = parseInt(req.query.pageNumber as string, 10) || 1;

  // Get a limited number of conversations using skip and take
  const conversations = await prisma.conversation.findMany({
    select: {
      id: true,
    },
    where: {
      private: false,
      views: {
        gte: 5,
      },
    },
    skip: (pageNumber - 1) * 10000,
    take: 10000,
  });

  // We generate the XML sitemap with the conversations data
  const sitemap = generateSiteMap({
    hostname,
    conversations,
    pageNumber,
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
