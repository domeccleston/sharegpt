import { GetStaticPropsContext } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ParsedUrlQuery } from "node:querystring";
import cn from "classnames";
import GPTAvatar from "@/components/shared/icons/GPTAvatar";
import styles from "@/styles/utils.module.css";
import Banner from "@/components/banner";
import Meta from "@/components/layout/meta";
import { CommentProps, ConversationProps } from "@/lib/types";
import useView from "@/lib/hooks/use-view";
import { Toaster } from "react-hot-toast";
import CommentBubbleGroup from "@/components/comments/bubble-group";
import { useCommentModal } from "@/components/comments/modal";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { getConvo } from "@/lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

interface ChatParams extends ParsedUrlQuery {
  id: string;
}
function formatTitle(title: string | undefined): string {
  if (!title || title === "New chat")
    return "Check out this ShareGPT conversation";
  else return `${title} -  A ShareGPT conversation`;
}

export default function ChatPage({
  id,
  content: { title, avatarUrl, items, model },
  comments: initialComments,
  views,
}: ConversationProps) {
  useView();

  const { data: comments } = useSWR<CommentProps[]>(
    `/api/conversations/${id}/comments`,
    fetcher,
    {
      fallbackData: initialComments,
    }
  );

  const router = useRouter();
  const { comment, position } = router.query;
  const { CommentModal, setShowCommentModal } = useCommentModal();

  useEffect(() => {
    if (comment || position) {
      setShowCommentModal(true);
    } else {
      setShowCommentModal(false);
    }
  }, [comment, position, setShowCommentModal]);

  const currentPosition = useMemo(() => {
    if (position) {
      return parseInt(position as string);
    } else if (comment) {
      return comments?.find((c) => c.id === comment)?.position || 1;
    } else {
      return null;
    }
  }, [comment, comments, position]);

  if (!items[0]) return null;

  return (
    <>
      <Meta
        title={formatTitle(title)}
        description={`This is a conversation between a human and a GPT-3 chatbot. The human first asks: ${items[0]?.value}. The GPT-3 chatbot then responds: ${items[1]?.value}`}
        image={`https://sharegpt.com/api/conversations/${id}/thumbnail`}
        imageAlt={`This is a preview image for a conversation betwen a human and a GPT-3 chatbot. The human first asks: ${items[0]?.value}. The GPT-3 chatbot then responds: ${items[1]?.value}`}
        canonical={`https://sharegpt.com/c/${id}`}
      />
      <CommentModal />
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
            <AnimatePresence>
              {currentPosition && currentPosition !== idx + 1 && (
                <motion.div
                  {...FADE_IN_ANIMATION_SETTINGS}
                  className="absolute w-full h-full z-10 bg-gray-300 dark:bg-black/30 bg-opacity-50 backdrop-blur-[2px] pointer-events-none"
                />
              )}
            </AnimatePresence>
            <div className="relative mx-auto max-w-screen-xl dark:text-gray-100 text-gray-700 w-full px-4 py-10">
              <div className="w-full max-w-screen-md flex flex-1 mx-auto gap-[1.5rem] leading-[1.75] whitespace-pre-wrap">
                {item.from === "human" ? (
                  <Image
                    className="mr-2 rounded-sm h-[28px]"
                    alt="Avatar of the person chatting"
                    width="28"
                    height="28"
                    src={avatarUrl || `https://avatar.vercel.sh/${id}`}
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
              <CommentBubbleGroup
                position={idx + 1}
                comments={comments?.filter(
                  (comment) => comment.position === idx + 1
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <Banner views={views} />
    </>
  );
}

export const getStaticPaths = async () => {
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
  return {
    paths: convos.map((convo: { id: string }) => ({
      params: {
        id: convo.id,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext & { params: ChatParams }
) => {
  const { id } = context.params;

  const props = await getConvo(id);

  if (props) {
    return { props, revalidate: 3600 };
  } else {
    return { notFound: true, revalidate: 1 };
  }
};
