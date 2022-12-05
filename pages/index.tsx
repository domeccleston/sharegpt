import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Meta from "@/components/meta";

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <div className="flex min-h-screen flex-col items-center py-36 bg-gray-50">
        <div className="h-[40px] w-full absolute top-0 flex items-center pl-4 pt-4 font-default font-medium text-xl">
          <Image
            src="/logo.png"
            alt="Logo image of a chat bubble"
            width="30"
            height="30"
            className="mr-2 rounded-sm"
          ></Image>
          <p>ShareGPT</p>
        </div>
        <div className="mx-5 flex flex-col items-center space-y-8 text-center sm:mx-auto">
          <h1 className="font-default tracking-tight font-bold text-4xl text-gray-800 transition-colors sm:text-7xl">
            ShareGPT
          </h1>
          <p className="max-w-lg font-default text-gray-600 transition-colors sm:text-lg">
            Share your wildest ChatGPT conversations with one click.
          </p>
          <div className="flex flex-col sm:flex-row">
            <a
              className="flex space-x-3 items-center mb-3 sm:mr-3 sm:mb-0 rounded-lg px-5 py-3 font-medium bg-indigo-400 text-white hover:bg-indigo-500 transition-colors duration-75 shadow-md"
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
              <p>Install Chrome Extension</p>
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
        <div className="my-16 max-w-[400px] sm:max-w-[800px] lg:max-w-[1000px] w-full">
          <div
            style={{ position: "relative", paddingBottom: "62.5%", height: 0 }}
          >
            <iframe
              src="https://www.loom.com/embed/b209f8d2e39d4b7987d72063deb9bee6"
              frameBorder="0"
              allowFullScreen
              style={{
                position: "absolute",
                borderRadius: "0.5rem",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
        </div>
        <div
          id="examples"
          className="py-4 min-h-[200px] max-w-[400px] sm:max-w-[800px] lg:max-w-[1000px] w-full"
        >
          <h1 className="text-4xl font-medium">Examples</h1>
          <ul className="list-disc ml-4 mt-4 font-default underline">
            <li className="text-lg mb-1">
              <Link href="https://shareg.pt/vr3v7ntnj7">
                Rewriting Git from scratch
              </Link>{" "}
              <Link href="https://twitter.com/tylerangert/status/1598389755997290507">
                (credit)
              </Link>
            </li>
            <li className="text-lg mb-1">
              <Link href="https://shareg.pt/pjh5ezagkc">
                Seinfeld: Jerry learns bubble sort
              </Link>{" "}
              <Link href="https://twitter.com/goodside/status/1598077257498923010">
                (credit)
              </Link>
            </li>
            <li className="text-lg mb-1">
              <Link href="https://shareg.pt/76hmx7ef8h">Virtual machine</Link>{" "}
              <Link href="https://www.engraved.blog/building-a-virtual-machine-inside/">
                (read the full blog post)!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
