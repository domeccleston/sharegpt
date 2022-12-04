import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { Redis } from "@upstash/redis";

interface ChatParams extends ParsedUrlQuery {
  chat: string;
}

type ChatProps = {
  page: string;
};

function ChatPage({ page }: ChatProps) {
  return <div>{JSON.stringify(page)}</div>;
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
