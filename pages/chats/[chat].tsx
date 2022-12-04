import { GetServerSidePropsContext } from "next";
import Image from "next/image";

import { ParsedUrlQuery } from "node:querystring";
import { Redis } from "@upstash/redis";
import cn from "classnames";

import GPTAvatar from "../../components/GPTAvatar";

interface ChatParams extends ParsedUrlQuery {
  chat: string;
}

type ConversationItem = {
  from: "human" | "gpt";
  value: string;
};

type ChatProps = {
  gravatarUrl: string;
  page: {
    items: ConversationItem[];
    gravatarUrl: string;
  };
};

function ChatPage({ page }: ChatProps) {
  return (
    <div className="flex flex-col items-center">
      {page.items.map((item) => (
        <div
          key={item.value}
          className={cn(
            "w-full py-[2.5rem] flex justify-center border-solid border border-[(217, 217, 227)] border-t-0",
            {
              "bg-gray-100": item.from === "gpt",
            }
          )}
        >
          <div className="w-[48rem] flex gap-[1.5rem] text-gray-700 leading-[1.75]">
            {item.from === "human" ? (
              <Image
                className="mr-2 rounded-sm h-[28px]"
                alt="Avatar of the person chatting"
                width="28"
                height="28"
                src={page.gravatarUrl}
              />
            ) : (
              <GPTAvatar />
            )}
            <div className="flex flex-col">
              {item.value.split("\n").map((line, i) => (
                <p key={line.slice(0, 10)} className="pb-2">{line}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const redis = new Redis({
  url: "https://global-real-gibbon-30346.upstash.io",
  token:
    "AXaKACQgYTY3YTUwYjMtMWFlZC00ZTBhLWJlNTEtOGJmNmIyOTIwM2U0ZmYzNjVkYjk1NDNjNGVhNTk1MWJmM2NlOTcyYjlhYmQ=",
});

export const getServerSideProps = async (
  context: GetServerSidePropsContext & { params: ChatParams }
) => {
  const { chat } = context.params;
  const page = await redis.get(chat);
  if (page) {
    return { props: { page } };
  } else {
    return { notFound: true };
  }
};

export default ChatPage;
