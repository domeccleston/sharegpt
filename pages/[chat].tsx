import { GetStaticPropsContext } from "next";
import Image from "next/image";

import { ParsedUrlQuery } from "node:querystring";
import { Redis } from "@upstash/redis";
import cn from "classnames";

import GPTAvatar from "@/components/GPTAvatar";

import styles from "@/styles/utils.module.css";
import Banner from "@/components/banner";
import Meta from "@/components/meta";

interface ChatParams extends ParsedUrlQuery {
  chat: string;
}

type ConversationItem = {
  from: "human" | "gpt";
  value: string;
};

type ChatProps = {
  slug: string;
  gravatarUrl: string;
  items: ConversationItem[];
};

export default function ChatPage({ slug, gravatarUrl, items }: ChatProps) {
  const firstUserMessage = items[0].value;
  const userAvatar = gravatarUrl.includes("gravatar")
    ? gravatarUrl
    : `https://avatar.vercel.sh/${slug}`;

  return (
    <>
      <Meta
        title={`ShareGPT: ${firstUserMessage}`}
        image={`https://shareg.pt/api/og?title=${encodeURIComponent(
          firstUserMessage
        )}&logo=${encodeURIComponent(userAvatar)}`}
      />
      <div className="flex flex-col items-center">
        {items.map((item) => (
          <div
            key={item.value}
            className={cn(
              "dark:bg-[#343541] dark:text-gray-100 text-gray-700  w-full px-4 py-[2.5rem] flex justify-center border-solid border dark:border-gray-700 border-[(217, 217, 227)] border-t-0",
              {
                "bg-gray-100": item.from === "gpt",
                "dark:bg-[#434654]": item.from === "gpt",
              }
            )}
          >
            <div className="w-full sm:w-[48rem] flex gap-[1.5rem] leading-[1.75]">
              {item.from === "human" ? (
                <Image
                  className="mr-2 rounded-sm h-[28px]"
                  alt="Avatar of the person chatting"
                  width="28"
                  height="28"
                  src={userAvatar}
                />
              ) : (
                <GPTAvatar />
              )}
              <div className="flex flex-col">
                {item.from === "human" ? (
                  <p className="pb-2">{item.value}</p>
                ) : (
                  <div
                    className={styles.response}
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Banner />
    </>
  );
}

const redis = Redis.fromEnv();

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          chat: "z3ftry4pjp",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext & { params: ChatParams }
) => {
  const { chat } = context.params;

  const page = await redis.get(chat);

  if (page) {
    return { props: { ...page, slug: chat } };
  } else {
    return { notFound: true };
  }
};
