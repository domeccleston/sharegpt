import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const hostname = `https://sharegpt.com`;
const pageSize = 10000;

function generateSiteMapIndex({ pageCount }: { pageCount: number }) {
  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `;

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    sitemapIndex += `
      <sitemap>
        <loc>${hostname}/sitemap-${pageNumber}.xml</loc>
      </sitemap>
    `;
  }

  sitemapIndex += `</sitemapindex>`;

  return sitemapIndex;
}

function generateSiteMap({
  conversations,
}: {
  conversations: { id: string }[];
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  // Get the total number of conversations
  const conversationCount = await prisma.conversation.count({
    where: {
      private: false,
      views: {
        gte: 5,
      },
    },
  });

  // Calculate the number of pages needed
  const pageCount = Math.ceil(conversationCount / pageSize);

  if (req.query.pageNumber) {
    // Get the page number from the query string
    const pageNumber = parseInt(req.query.pageNumber as string, 10);

    // Get conversations for the specified page
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
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });

    // Generate the sitemap for the specified page
    const sitemap = generateSiteMap({ conversations });

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } else {
    // Generate the sitemap index
    const sitemapIndex = generateSiteMapIndex({ pageCount });

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapIndex);
    res.end();
  }

  return {
    props: {},
  };
}

export default SiteMap;
