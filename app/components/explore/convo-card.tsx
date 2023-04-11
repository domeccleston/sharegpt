import { motion } from "framer-motion";
import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from "@/lib/constants";
import { ConversationMeta } from "@/lib/types";
import Image from "next/image";
import { nFormatter, timeAgo } from "@/lib/utils";
import SaveButton from "../banner/save-button";
import Link from "next/link";
import { Eye, MessageCircle } from "lucide-react";

export default function ConvoCard({ data }: { data: ConversationMeta }) {
  let { id, title, avatar, creator, views, comments, createdAt } = data;
  if (avatar.includes("error")) avatar = "https://avatar.vercel.sh/${id};";
  return (
    <motion.li
      variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
      className="flex items-center justify-between space-x-5 rounded-md border border-gray-100 bg-white p-4 shadow-md"
    >
      <div className="grid gap-2 flex-1">
        <Link
          href={`/c/${id}`}
          className="font-medium text-sm sm:text-base line-clamp-2 sm:line-clamp-1 text-gray-700 hover:text-black"
        >
          <h3>{title}</h3>
        </Link>
        <div className="flex items-center space-x-2">
          <Image
            width="20"
            height="20"
            alt="Avatar"
            src={creator?.image || avatar || `https://avatar.vercel.sh/${id}`}
            className="rounded-full"
          />
          <Link href={`/c/${id}`}>
            <p className="sm:hidden text-gray-500 text-sm hover:text-gray-800">
              {timeAgo(createdAt, true)}
            </p>
            <p className="hidden sm:block text-gray-500 text-sm hover:text-gray-800">
              created {timeAgo(createdAt)}
            </p>
          </Link>
          <p className="text-gray-500 text-sm">|</p>
          <Link href={`/c/${id}`}>
            <div className="sm:hidden flex space-x-1 items-center">
              <Eye className="h-4 w-4 text-gray-600" />
              <p className="text-gray-500 text-sm">{nFormatter(views)}</p>
            </div>
            <p className="hidden sm:block text-gray-500 text-sm hover:text-gray-800">
              {nFormatter(views)} views
            </p>
          </Link>
          <p className="text-gray-500 text-sm">|</p>
          <Link href={`/c/${id}`}>
            <div className="sm:hidden flex space-x-1 items-center">
              <MessageCircle className="h-4 w-4 text-gray-600" />
              <p className="text-gray-500 text-sm">{nFormatter(0)}</p>
            </div>
            <p className="hidden sm:block text-gray-500 text-sm hover:text-gray-800">
              {nFormatter(comments)} comments
            </p>
          </Link>
        </div>
      </div>
      <SaveButton id={id} />
    </motion.li>
  );
}
