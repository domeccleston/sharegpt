import prisma from "@/lib/prisma";
import Layout from "@/components/layout";
import ConvoCard from "@/components/explore/convo-card";
import { ConversationMeta } from "@/lib/types";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Dashboard({ convos }: { convos: ConversationMeta[] }) {
  return (
    <Layout>
      <div className="flex flex-col items-center py-28 bg-gray-50">
        <div className="flex flex-col items-center space-y-5 text-center mx-5 sm:mx-auto">
          <h1 className="font-display tracking-tight font-bold text-3xl text-gray-800 transition-colors sm:text-5xl">
            Saved Conversations
          </h1>
          <p className="max-w-lg text-gray-600 transition-colors sm:text-lg">
            List of all your saved conversations on ShareGPT, sorted by saved
            date.
          </p>
        </div>
        <div className="py-4 px-2 sm:max-w-screen-lg w-full">
          <ul className="mt-8 grid gap-2">
            {convos.map((convo) => (
              <ConvoCard key={convo.id} data={convo} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  // @ts-expect-error
  if (!session?.user?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const convos = await prisma.save.findMany({
    where: {
      // @ts-expect-error
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      conversation: true,
    },
  });

  return {
    props: {
      convos: convos.map(({ conversation }) => ({
        ...conversation,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
      })),
    },
  };
}
