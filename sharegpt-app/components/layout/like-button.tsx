import { useState } from "react";
import cn from "classnames";

export default function LikeButton({
  upvotes,
  id,
}: {
  upvotes?: number;
  id: string;
}) {
  const [_likes, setLikes] = useState(upvotes);
  const [isLiked, setIsLiked] = useState(false);

  async function handleLike() {
    if (isLiked) return;
    setLikes(_likes + 1);
    setIsLiked(true);
    try {
      const res = await fetch(`/api/conversations/${id}/upvote`, {
        method: "POST",
      });
      const data = await res.json();
      console.log({ data })
      // setLikes(data);
    } catch (error) {
      setIsLiked(false);
      setLikes(_likes - 1);
    }
  }

  return (
    <div className="relative">
      <div className="fixed w-[200px] right-4 bottom-5 mx-auto max-w-fit rounded-lg bg-white border border-gray-100 shadow-lg flex justify-between items-center">
        <div className="flex justify-center items-center p-3">
          <button
            onClick={handleLike}
            className={cn({ "cursor-default": isLiked })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isLiked ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
        <span className="p-3 flex justify-center border-l border-l-gray-300 w-[52px]">
          {_likes}
        </span>
      </div>
    </div>
  );
}
