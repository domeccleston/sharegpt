import Image from "next/image";
import prisma from "@/lib/prisma";
import { ParsedUrlQuery } from "node:querystring";
import cn from "classnames";
import GPTAvatar from "@/components/shared/icons/GPTAvatar";
import styles from "@/styles/utils.module.css";
import Banner from "@/components/layout/banner";
import { getConvo } from "@/lib/api";
import { ViewTracker } from "@/components/shared/view-tracker";
import { Toaster } from "@/components/shared/toaster";
import { Comments } from "@/components/shared/comments";

interface ChatParams extends ParsedUrlQuery {
  id: string;
}

// TODO make description dynamic - need to fetch the convo from prisma
export function generateMetadata({ params }: { params: ChatParams }) {
  return {
    title: "Check out this ShareGPT conversation",
    description: "This is a conversation between a human and a GPT-3 chatbot.",
    image: `https://sharegpt.com/api/conversations/${params.id}/og`,
    imageAlt: `This is a preview image for a conversation betwen a human and a GPT-3 chatbot.`,
    canonical: `https://sharegpt.com/c/${params.id}`,
  };
}

export default async function ChatPage({ params }: { params: ChatParams }) {
  const props = await getConvo(params.id);
  const {
    // @ts-expect-error TODO: correct the prisma schema
    id,
    // @ts-expect-error TODO: correct the prisma schema
    comments: initialComments,
    // @ts-expect-error TODO: correct the prisma schema
    content: { avatarUrl, items, model },
    // @ts-expect-error TODO: correct the pcrisma schema
    views,
  } = props;

  if (!items[0]) return null;

  return (
    <>
      <ViewTracker />
      <Toaster />
      <div className="flex flex-col items-center pb-24 dark:bg-[#343541] min-h-screen">
        {model ? (
          <div className="bg-gray-100 dark:bg-[#434654] w-full text-center text-gray-500 dark:text-gray-300 p-3">
            {model}
          </div>
        ) : null}
        {/* TODO */}
        {items.map((item: any, idx: number) => (
          <div
            id={idx.toString()}
            key={item.value}
            className={cn(
              "relative  dark:bg-[#343541] text-gray-700 w-full border-b dark:border-gray-700 border-gray-200",
              {
                "bg-gray-100 dark:bg-[#434654]": item.from === "gpt",
              }
            )}
          >
            <div className="relative mx-auto max-w-screen-xl dark:text-gray-100 text-gray-700 w-full px-4 py-10">
              <div className="w-full max-w-screen-md flex flex-1 mx-auto gap-[1.5rem] leading-[1.75] overflow-x-scroll whitespace-pre-wrap">
                {item.from === "human" ? (
                  <Image
                    className="mr-2 rounded-sm h-[28px]"
                    alt="Avatar of the person chatting"
                    width="28"
                    height="28"
                    src={avatarUrl}
                  />
                ) : (
                  <GPTAvatar model={model} />
                )}
                <div className="flex flex-col">
                  {item.from === "human" ? (
                    <p className="pb-2 whitespace-prewrap">{item.value}</p>
                  ) : (
                    <div
                      className={styles.response}
                      dangerouslySetInnerHTML={{ __html: item.value }}
                    />
                  )}
                </div>
              </div>
              <Comments id={id} idx={idx} initialComments={initialComments} />
            </div>
          </div>
        ))}
      </div>
      <Banner views={views} />
    </>
  );
}

export async function generateStaticParams() {
  const convos = await prisma.conversation.findMany({
    select: {
      id: true,
    },
    where: {
      views: {
        gte: 20,
      },
    },
  });

  return convos.map((convo) => ({ id: convo.id }));
}

export const revalidate = 60;
