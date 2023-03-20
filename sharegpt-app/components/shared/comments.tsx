"use client";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import CommentBubbleGroup from "../comments/bubble-group";
import { useCommentModal } from "../comments/modal";
import { fetcher } from "@/lib/utils";
import { CommentProps } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

export function Comments({
  id,
  idx,
  initialComments,
}: {
  id: string;
  idx: number;
  initialComments: CommentProps[];
}) {
  // TODO
  const searchParams = useSearchParams();
  // @ts-expect-error pages dir
  const comment = searchParams.get("comment");
  // @ts-expect-error pages dir
  const position = searchParams.get("position");
  const { CommentModal, setShowCommentModal } = useCommentModal();
  const { data: comments } = useSWR<CommentProps[]>(
    `/api/conversations/${id}/comments`,
    fetcher,
    {
      fallbackData: initialComments,
    }
  );

  useEffect(() => {
    if (comment || position) {
      setShowCommentModal(true);
    } else {
      setShowCommentModal(false);
    }
  }, [comment, position, setShowCommentModal]);

  const currentPosition = useMemo(() => {
    if (position) {
      return parseInt(position as string);
    } else if (comment) {
      return comments?.find((c) => c.id === comment)?.position || 1;
    } else {
      return null;
    }
  }, [comment, comments, position]);

  return (
    <>
      <CommentBubbleGroup
        position={idx + 1}
        comments={comments?.filter((comment) => comment.position === idx + 1)}
      />
      <CommentModal />
      <AnimatePresence>
        {currentPosition && currentPosition !== idx + 1 && (
          <motion.div
            {...FADE_IN_ANIMATION_SETTINGS}
            className="absolute w-full h-full z-10 bg-gray-300 dark:bg-black/30 bg-opacity-50 backdrop-blur-[2px] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
