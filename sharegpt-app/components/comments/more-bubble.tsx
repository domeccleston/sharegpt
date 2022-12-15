import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FRAMER_MOTION_COMMENT_BUBBLE_VARIANTS } from "@/lib/constants";
import { nFormatter } from "@/lib/utils";
import { useRouter } from "next/router";

export default function MoreCommentsBubble({
  position,
  count,
}: {
  position: number;
  count: number;
}) {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => {
        router.replace(
          {
            pathname: "/c/[id]",
            query: {
              id: router.query.id,
              position,
            },
          },
          undefined,
          { shallow: true, scroll: false }
        );
      }}
      variants={FRAMER_MOTION_COMMENT_BUBBLE_VARIANTS}
      className="h-9 w-9 flex items-center justify-center rounded-full overflow-hidden border border-gray-200 shadow-sm bg-white text-[11px] text-gray-500 font-medium"
    >
      {count > 0 ? (
        <p>
          +
          {
            nFormatter(Math.min(count, 99)) // show 99+ if there are more than 99 comments
          }
        </p>
      ) : (
        <MessageCircle className="w-4 h-4" />
      )}
    </motion.button>
  );
}
