"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import CommentBubbleGroup from "../comments/bubble-group";
import { useCommentModal } from "../comments/modal";
import { fetcher } from "@/lib/utils";
import { CommentProps } from "@/lib/types";

export function Comments({ id, idx, initialComments }) {
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
  return (
    <>
      <CommentBubbleGroup
        position={idx + 1}
        comments={comments?.filter((comment) => comment.position === idx + 1)}
      />
    </>
  );
}
