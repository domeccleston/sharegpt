import Link from "next/link";
import { motion } from "framer-motion";
import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from "@/lib/constants";
import ConvoCard from "@/components/explore/convo-card";

type ConversationProps = {
  saves: number;
  comments: number;
  createdAt: string;
  _count: {
    saves: number;
    comments: number;
  };
  id: string;
  creator: {
    name: string | null;
    username: string | null;
    image: string | null;
  } | null;
  title: string;
  avatar: string | null;
  views: number;
}[];

export function Examples({
  topConvos,
  session,
}: {
  topConvos: ConversationProps;
  session: any;
}) {
  return (
    <>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
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
        {topConvos.map((convo) => (
          // @ts-expect-error
          <ConvoCard key={convo.id} data={convo} session={session} />
        ))}
        <motion.li variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}>
          <Link
            href="/explore"
            className="rounded-md p-3 w-full block text-center text-sm text-gray-600 hover:text-gray-800"
          >
            View More
          </Link>
        </motion.li>
      </motion.ul>
    </>
  );
}
