import { CommentProps } from "@/lib/types";
import Comment from "./comment";

export default function CommentThread({ comment }: { comment: CommentProps }) {
  return (
    <div className="flex flex-1 flex-col space-y-5 px-3 py-6">
      {comment && <Comment key={comment.id} comment={comment} />}
    </div>
  );
}
