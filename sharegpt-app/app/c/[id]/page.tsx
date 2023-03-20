import { GetStaticPropsContext } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ParsedUrlQuery } from "node:querystring";
import cn from "classnames";
import GPTAvatar from "@/components/shared/icons/GPTAvatar";
import styles from "@/styles/utils.module.css";
import Banner from "@/components/layout/banner";
import Meta from "@/components/layout/meta";
import { CommentProps, ConversationProps } from "@/lib/types";
import useView from "@/lib/hooks/use-view";
import CommentBubbleGroup from "@/components/comments/bubble-group";
// import { useRouter } from "next/router";
// import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { getConvo } from "@/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { ViewTracker } from "@/components/shared/view-tracker";
import { Toaster } from "@/components/shared/toaster";
import { Comments } from "@/components/shared/comments";

interface ChatParams extends ParsedUrlQuery {
  id: string;
}

// content: { avatarUrl, items, model },

export default async function ChatPage({ params }: { params: { id: string } }) {
  const props = await getConvo(params.id);
  const {
    // @ts-expect-error TODO: correct the prisma schema
    id,
    // @ts-expect-error TODO: correct the prisma schema
    comments: initialComments,
    // @ts-expect-error TODO: correct the prisma schema
    content: { avatarUrl, items, model },
    // @ts-expect-error TODO: correct the prisma schema
    views,
  } = props;

  // TODO
  // useEffect(() => {
  //   if (comment || position) {
  //     setShowCommentModal(true);
  //   } else {
  //     setShowCommentModal(false);
  //   }
  // }, [comment, position, setShowCommentModal]);

  // TODO
  // const currentPosition = useMemo(() => {
  //   if (position) {
  //     return parseInt(position as string);
  //   } else if (comment) {
  //     return comments?.find((c) => c.id === comment)?.position || 1;
  //   } else {
  //     return null;
  //   }
  // }, [comment, comments, position]);

  if (!items[0]) return null;

  return (
    <>
      <ViewTracker />
      {/* TODO replace with metadata */}
      {/* <Meta
        title={`Check out this ShareGPT conversation`}
        description={`This is a conversation between a human and a GPT-3 chatbot. The human first asks: ${items[0]?.value}. The GPT-3 chatbot then responds: ${items[1]?.value}`}
        image={`https://sharegpt.com/api/conversations/${id}/og`}
        imageAlt={`This is a preview image for a conversation betwen a human and a GPT-3 chatbot. The human first asks: ${items[0]?.value}. The GPT-3 chatbot then responds: ${items[1]?.value}`}
        canonical={`https://sharegpt.com/c/${id}`}
      /> */}
      {/* <CommentModal /> */}
      <Toaster />
      <div className="flex flex-col items-center pb-24 dark:bg-[#343541] min-h-screen">
        {model ? (
          <div className="bg-gray-100 dark:bg-[#434654] w-full text-center text-gray-500 dark:text-gray-300 p-3">
            {model}
          </div>
        ) : null}
        {items.map((item, idx) => (
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
            {/* <AnimatePresence>
              {currentPosition && currentPosition !== idx + 1 && (
                <motion.div
                  {...FADE_IN_ANIMATION_SETTINGS}
                  className="absolute w-full h-full z-10 bg-gray-300 dark:bg-black/30 bg-opacity-50 backdrop-blur-[2px] pointer-events-none"
                />
              )}
            </AnimatePresence> */}
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
