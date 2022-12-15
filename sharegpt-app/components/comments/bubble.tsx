import { CommentProps } from "@/lib/types";
import Image from "next/image";
import HoverCard from "../shared/hover-card";
import Comment from "./comment";
import { motion } from "framer-motion";
import { FRAMER_MOTION_COMMENT_BUBBLE_VARIANTS } from "@/lib/constants";

export default function CommentBubble({ comment }: { comment: CommentProps }) {
  return (
    <HoverCard content={<Comment comment={comment} hoverCard />}>
      <motion.div
        variants={FRAMER_MOTION_COMMENT_BUBBLE_VARIANTS}
        className="inline-block h-8 w-8 rounded-full overflow-hidden ring-2 ring-white"
      >
        <Image
          src={comment.user.image}
          width={24}
          height={24}
          draggable="false"
          className="w-full h-full"
          alt={`Profile picture of ${comment.user.username}`}
        />
      </motion.div>
    </HoverCard>
  );
}
