import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Meta from "@/components/meta";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col items-center py-36 bg-gray-50">
        <div className="h-[40px] w-full absolute top-0 flex items-center pl-4 pt-4 font-display font-medium text-xl">
          <Image
            src="/logo.png"
            alt="Logo image of a chat bubble"
            width="30"
            height="30"
            className="mr-2 rounded-sm"
          ></Image>
          <p>ShareGPT</p>
        </div>
        <div className="flex flex-col items-center space-y-8 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            ShareGPT
          </h1>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            Share your wildest ChatGPT conversations with one click.
          </p>
          <div className="flex flex-col sm:flex-row">
            <a
              className="flex space-x-3 justify-center items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg px-5 py-3 font-medium bg-indigo-400 text-white hover:bg-indigo-500 transition-colors duration-75 shadow-md"
              href="https://github.com/domeccleston/sharegpt"
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
            <a
              className="flex min-w-[250px] justify-center space-x-3 items-center rounded-lg px-5 py-3 font-medium text-gray-600 bg-white hover:bg-[#fcfcfc] transition-colors duration-75 border border-gray-100 shadow-md"
              href="#examples"
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
            </a>
          </div>
        </div>
        <div className="my-16 sm:max-w-[800px] lg:max-w-[1000px] w-full">
          <LiteYouTubeEmbed
            id="lrjC9PTemJw"
            poster="maxresdefault"
            title="Whats new in Material Design for the web (Chrome Dev Summit 2019)"
          />
        </div>
        <div
          id="examples"
          className="py-4 min-h-[200px] max-w-[400px] sm:max-w-[800px] lg:max-w-[1000px] w-full"
        >
          <h1 className="text-4xl font-medium font-display">Examples</h1>
          <ul className="list-disc ml-6 sm:ml-4 mt-4 font-default underline">
            <li className="text-lg mb-1">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                className="text-indigo-600"
                href="https://shareg.pt/mcgucu3rdb"
              >
                Rewriting Git from scratch
              </Link>{" "}
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/tylerangert/status/1598389755997290507"
              >
                (credit)
              </Link>
            </li>
            <li className="text-lg mb-1">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                className="text-indigo-600"
                href="https://shareg.pt/pjh5ezagkc"
              >
                Seinfeld: Jerry learns bubble sort
              </Link>{" "}
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/goodside/status/1598077257498923010"
              >
                (credit)
              </Link>
            </li>
            <li className="text-lg mb-1">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                className="text-indigo-600"
                href="https://shareg.pt/76hmx7ef8h"
              >
                Virtual machine
              </Link>{" "}
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.engraved.blog/building-a-virtual-machine-inside/"
              >
                (read the full blog post!)
              </Link>
            </li>
          </ul>
          <div className="py-5">
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
      <div className="h-[100px] flex items-center justify-center w-full">
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
};

export default Home;
