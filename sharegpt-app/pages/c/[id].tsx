import { GetStaticPropsContext } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ParsedUrlQuery } from "node:querystring";
import cn from "classnames";
import GPTAvatar from "@/components/shared/icons/GPTAvatar";
import styles from "@/styles/utils.module.css";
import Banner from "@/components/layout/banner";
import Meta from "@/components/layout/meta";
import { ConversationProps } from "@/lib/types";
import useView from "@/lib/hooks/use-view";

interface ChatParams extends ParsedUrlQuery {
  id: string;
}

export default function ChatPage({
  id,
  content: { avatarUrl, items },
}: ConversationProps) {
  useView();
  return (
    <>
      <Meta
        title={`Check out this ShareGPT conversation`}
        image={`https://sharegpt.com/api/conversations/${id}/og`}
        imageAlt={`This is a preview image for a conversation betwen a human and a GPT-3 chatbot. The human first asks: ${items[0].value}. The GPT-3 chatbot then responds: ${items[1].value}`}
      />
      <div className="flex flex-col items-center pb-24">
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
                  src={avatarUrl}
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

export const getStaticPaths = async () => {
  const convos = await prisma.conversation.findMany({
    select: {
      id: true,
    },
    orderBy: {
      views: "desc",
    },
    take: 100, // pregenerate the top 100 most viewed conversations
  });
  return {
    paths: convos.map((convo) => ({
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

  const props = await prisma.conversation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
    },
  });

  if (props) {
    return { props };
  } else {
    return { notFound: true };
  }
};

export const config = {
  unstable_runtimeJS: false,
};
