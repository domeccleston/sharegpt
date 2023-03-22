import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Twitter from "@/components/shared/icons/twitter";
import { ExamplesSection } from "@/components/home/examples";
import { getConvos } from "@/lib/api";
import { Search } from "lucide-react";
import YoutubeEmbed from "@/components/home/youtube-embed";
import { InstallButton } from "@/components/home/install-button";
import { Navigation } from "@/components/shared/navigation";
import { decode } from "next-auth/jwt";
import { LoginSection } from "@/components/shared/login-section";
import { Examples } from "@/components/home/examples-list";

export default async function Home() {
  const cookieList = cookies();
  const cookie = cookieList.get("next-auth.session-token");

  const decoded = await decode({
    token: cookie?.value,
    secret: process.env.SECRET as string,
  });

  const jwtSession = decoded
    ? {
        user: {
          email: decoded?.email,
          name: decoded?.name,
          image: decoded?.picture,
        },
      }
    : null;

  const data = await getHomepageData();

  return (
    <>
      <Navigation>
        <LoginSection session={jwtSession} />
      </Navigation>
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
              {Intl.NumberFormat("en-us").format(data.totalConvos)}
            </span>{" "}
            conversations shared so far.
          </p>
          <div className="flex flex-col sm:flex-row">
            <InstallButton />
            <Link
              className="flex min-w-[200px] justify-center space-x-3 items-center rounded-lg px-5 py-3 font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-75 border border-gray-100 shadow-md"
              href="/explore"
            >
              <Search className="w-4 h-4" />
              <p>Explore examples</p>
            </Link>
          </div>
        </div>
        <YoutubeEmbed />
        <div className="w-full bg-gray-100 py-5 sm:py-10 mb-10">
          <div className="flex justify-center space-x-5">
            <Link
              href="https://techcrunch.com/2022/12/08/sharegpt-lets-you-easily-share-your-chatgpt-conversations/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/techcrunch.png"
                alt="TechCrunch logo"
                width={2244}
                height={318}
                className="w-48 sm:w-60 hover:scale-105 transition-all"
              />
            </Link>
          </div>
        </div>
        <ExamplesSection>
          <Examples topConvos={data.topConvos} session={jwtSession} />
        </ExamplesSection>
      </div>
      <div className="h-[100px] bg-gray-50 flex flex-col items-center justify-center w-full">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/domeccleston/sharegpt"
        >
          <h1 className="mb-2 text-sm">View source on GitHub</h1>
        </Link>
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
    </>
  );
}

async function getHomepageData() {
  const totalConvos = await prisma.conversation.count();
  const topConvos = await getConvos({ orderBy: "views", take: 10 });
  return {
    totalConvos,
    topConvos,
  };
}
