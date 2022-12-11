import ConvoCard from "@/components/explore/convo-card";
import ExploreLayout from "@/components/explore/layout";
import { getConvos } from "@/lib/api";
import prisma from "@/lib/prisma";
import { ConversationMeta } from "@/lib/types";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Explore({
  totalConvos,
  convos,
}: {
  totalConvos: number;
  convos: ConversationMeta[];
}) {
  const router = useRouter();
  return (
    <ExploreLayout totalConvos={totalConvos}>
      <div className="pb-20 px-2 sm:max-w-screen-lg w-full mx-auto">
        <motion.ul
          key={router.asPath} // need key or else inter page transitions won't work
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="mt-8 grid gap-2"
        >
          {convos.map((convo) => (
            <ConvoCard key={convo.id} data={convo} />
          ))}
        </motion.ul>
      </div>
    </ExploreLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: [],
        },
      },
      {
        params: {
          slug: ["new"],
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const totalConvos = await prisma.conversation.count();
  const convos = await getConvos({
    orderBy: slug && slug[0] === "new" ? "createdAt" : "views",
    take: 100,
  });

  return {
    props: {
      totalConvos,
      convos,
    },
    revalidate: 60,
  };
}
