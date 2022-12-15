import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  SyntheticEvent,
  KeyboardEvent,
  useRef,
} from "react";
import Comment from "./comment";
import { CommentProps } from "@/lib/types";
import SideModal from "@/components/shared/side-modal";
import { useRouter } from "next/router";
import { ChevronLeft, Send, X } from "lucide-react";
import { LoadingDots } from "../shared/icons";
import { mutate } from "swr";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import { toast } from "react-hot-toast";

const CommentModal = ({
  showCommentModal,
  setShowCommentModal,
}: {
  showCommentModal: boolean;
  setShowCommentModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { id, comment, position } = router.query as {
    id: string;
    comment?: string;
    position?: string;
  };

  const { data: comments } = useSWR<CommentProps[]>(
    `/api/conversations/${id}/comments`,
    fetcher
  );

  const commentsBottomRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch(`/api/conversations/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // TODO - get the actual position id for parent comment
        position: position ? parseInt(position) : 1,
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        if (data.error) {
          toast.error(data.error);
        } else {
          mutate(`/api/conversations/${id}/comments`).then(() => {
            setContent("");
            commentsBottomRef.current?.scrollIntoView({ behavior: "smooth" });
          });
        }
      });
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      return await handleSubmit(e as any);
    }
  };

  return (
    <SideModal showModal={showCommentModal} setShowModal={setShowCommentModal}>
      <div className="relative flex flex-col w-full sm:w-[28rem] h-full bg-gray-50 rounded-lg border border-gray-300 shadow-md">
        <div className="flex justify-between items-center px-4 h-16 bg-white rounded-t-lg border-b border-gray-200">
          {comments && comment ? (
            <button
              onClick={() =>
                router.replace(
                  {
                    pathname: "/c/[id]",
                    query: {
                      id: router.query.id,
                      position:
                        comments.find((c) => c.id === comment)?.position || 1,
                    },
                  },
                  undefined,
                  { shallow: true, scroll: false }
                )
              }
              className="flex space-x-2 items-center rounded-lg hover:bg-gray-100 transition-all p-2"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
              <h2 className="font-medium text-gray-500">
                Back to all comments
              </h2>
            </button>
          ) : (
            <h2 className="text-xl font-medium text-gray-600 p-2">Comments</h2>
          )}
          <button
            onClick={() =>
              router.replace(
                {
                  pathname: "/c/[id]",
                  query: {
                    id: router.query.id,
                  },
                },
                undefined,
                { shallow: true, scroll: false }
              )
            }
            className="rounded-lg hover:bg-gray-100 transition-all p-2"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {comments && position && (
          <div className="flex flex-1 flex-col space-y-5 px-3 py-6 overflow-scroll">
            {comments.filter(
              (comment) => comment.position === parseInt(position)
            ).length > 0 ? (
              comments
                .filter((comment) => comment.position === parseInt(position))
                .map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center space-y-2">
                <Image
                  src="/illustrations/empty.svg"
                  width={200}
                  height={200}
                  alt="No comments yet"
                />
                <h2 className="text-xl font-medium text-gray-600">
                  No comments yet
                </h2>
                <p className="text-sm text-gray-500">
                  Be the first to comment on this conversation
                </p>
              </div>
            )}
            <div ref={commentsBottomRef} />
          </div>
        )}

        {comments && comment && (
          <div className="flex flex-1 flex-col space-y-5 px-3 py-6 overflow-scroll">
            {comment && (
              <Comment
                key={comment}
                comment={comments.find((c) => c.id === comment)!}
                fullComment
              />
            )}
          </div>
        )}

        {!comment && (
          <form
            onSubmit={handleSubmit}
            className="h-60 w-full border-t border-gray-200 p-4 bg-white rounded-b-lg"
          >
            <textarea
              name="comment"
              className="w-full h-full resize-none text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none border-none focus:ring-0"
              placeholder={position ? "Write a comment..." : "Write a reply..."}
              rows={6}
              required
              onKeyDown={handleKeyDown}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center border border-gray-300 bg-white rounded-full hover:scale-105 active:scale-100 transition-all">
              {submitting ? (
                <LoadingDots />
              ) : (
                <Send className="w-4 h-4 mt-0.5 mr-0.5 text-gray-400" />
              )}
            </button>
          </form>
        )}
      </div>
    </SideModal>
  );
};

export function useCommentModal() {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const CommentModalCallback = useCallback(() => {
    return (
      <CommentModal
        showCommentModal={showCommentModal}
        setShowCommentModal={setShowCommentModal}
      />
    );
  }, [showCommentModal, setShowCommentModal]);

  return useMemo(
    () => ({ setShowCommentModal, CommentModal: CommentModalCallback }),
    [setShowCommentModal, CommentModalCallback]
  );
}
