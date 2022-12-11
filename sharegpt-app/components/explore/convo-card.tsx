import { motion } from "framer-motion";
import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from "@/lib/constants";
import { ConversationMeta } from "@/lib/types";
import Image from "next/image";
import { nFormatter, timeAgo } from "@/lib/utils";
import Upvote from "../shared/upvote";
import Link from "next/link";

export default function ConvoCard({ data }: { data: ConversationMeta }) {
  const { id, title, avatar, creator, views, upvotes, createdAt } = data;
  return (
    <motion.li
      variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
      className="flex items-center justify-between space-x-5 rounded-md border border-gray-100 bg-white p-4 shadow-lg"
    >
      <div className="grid gap-2 flex-1">
        <Link
          href={`/c/${id}`}
          className="font-medium truncate text-gray-700 hover:text-black"
        >
          <h3>{title}</h3>
        </Link>
        <div className="flex items-center space-x-2">
          <Image
            width="20"
            height="20"
            alt="Avatar"
            src={avatar}
            className="rounded-full"
          />
          <Link href={`/c/${id}`}>
            <p className="text-gray-500 text-sm hover:text-gray-800">
              created {timeAgo(createdAt)}
            </p>
          </Link>
          <p className="text-gray-500 text-sm">|</p>
          <Link href={`/c/${id}`}>
            <p className="text-gray-500 text-sm hover:text-gray-800">
              {nFormatter(views)} views
            </p>
          </Link>
          <p className="text-gray-500 text-sm">|</p>
          <Link href={`/c/${id}`}>
            <p className="text-gray-500 text-sm hover:text-gray-800">
              {nFormatter(0)} comments
            </p>
          </Link>
        </div>
      </div>
      <Upvote id={id} />
    </motion.li>
  );
}
