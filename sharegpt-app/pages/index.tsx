import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Twitter from "@/components/shared/icons/twitter";
import Layout from "@/components/layout";
import ConvoCard from "@/components/explore/convo-card";
import { ConversationMeta } from "@/lib/types";
import { motion } from "framer-motion";

export default function Home({
  totalConvos,
  topConvos,
}: {
  totalConvos: number;
  topConvos: ConversationMeta[];
}) {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center py-28 bg-gray-50">
        <Link
          href="https://twitter.com/steventey/status/1599816553490366464"
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 mb-5 transition-all hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing ShareGPT
          </p>
        </Link>
        <div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            ShareGPT
          </h1>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            Share your wildest ChatGPT conversations with one click.
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {Intl.NumberFormat("en-us").format(totalConvos)}
            </span>{" "}
            conversations shared so far.
          </p>
          <div className="flex flex-col sm:flex-row">
            <a
              className="flex space-x-3 justify-center items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg px-5 py-3 font-medium bg-indigo-400 text-white hover:bg-indigo-500 transition-colors duration-75 shadow-md"
              href="https://chrome.google.com/webstore/detail/sharegpt/daiacboceoaocpibfodeljbdfacokfjb?hl=en&authuser=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Chrome logo"
                src="/chrome.svg"
                width={20}
                height={20}
              />
              <p>Install extension</p>
            </a>
            <Link
              className="flex min-w-[200px] justify-center space-x-3 items-center rounded-lg px-5 py-3 font-medium text-gray-600 bg-white hover:bg-[#fcfcfc] transition-colors duration-75 border border-gray-100 shadow-md"
              rel="noopener noreferrer"
              target="_blank"
              href="https://shareg.pt/oPt72P3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <p>View an example</p>
            </Link>
          </div>
        </div>
        <div className="my-16 px-2 sm:px-0 sm:max-w-[800px] lg:max-w-[1000px] w-full">
          <LiteYouTubeEmbed
            id="lrjC9PTemJw"
            poster="maxresdefault"
            title="Whats new in Material Design for the web (Chrome Dev Summit 2019)"
          />
        </div>
        <div
          id="examples"
          className="py-4 px-2 min-h-[200px] max-w-[400px] sm:max-w-[800px] lg:max-w-[1000px] w-full"
        >
          <h2 className="text-4xl font-medium font-display">Browse Examples</h2>
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="mt-8 grid gap-2"
          >
            {topConvos.map((convo) => (
              <ConvoCard key={convo.id} data={convo} />
            ))}
          </motion.ul>
          <div className="py-7">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="bg-white rounded-md shadow border border-gray-100 px-4 py-3 text-gray-600 font-medium hover:bg-[#fcfcfc] transition-colors duration-75"
              href="https://tally.so/r/wM1J90"
            >
              Submit your own
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[100px] bg-gray-50 flex items-center justify-center w-full">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://vercel.com?utm_source=sharegpt&utm_campaign=oss"
        >
          <Image
            width="200"
            height="100"
            alt="Vercel Logo"
            src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
          />
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const totalConvos = await prisma.conversation.count();
  const topConvos = await prisma.conversation.findMany({
    select: {
      id: true,
      title: true,
      avatar: true,
      creator: true,
      _count: {
        select: {
          upvotes: true,
        },
      },
      views: true,
      createdAt: true,
    },
    orderBy: [{ views: "desc" }],
    take: 10,
  });
  return {
    props: {
      totalConvos,
      topConvos: topConvos.map((convo) => ({
        ...convo,
        upvotes: convo._count.upvotes,
        createdAt: convo.createdAt.toISOString(),
      })),
    },
    revalidate: 60,
  };
}
