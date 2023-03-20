import { CommentProps } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Comment({
  comment,
  hoverCard,
  fullComment,
}: {
  comment: CommentProps;
  hoverCard?: boolean;
  fullComment?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // @ts-expect-error pages dir
  const id = searchParams.get("id");
  const router = useRouter();
  return (
    <div
      className={`w-full ${
        hoverCard ? "sm:w-96 shadow-md" : "shadow-sm"
      } rounded-lg p-6 border border-gray-200 bg-white`}
    >
      <div className="flex space-x-3 items-center">
        <Image
          src={
            comment.user.image ||
            `https://avatar.vercel.sh/${comment.user.username}`
          }
          width={24}
          height={24}
          draggable="false"
          className="w-9 h-9 object-cover rounded-full overflow-hidden"
          alt={`Profile picture of ${comment.user.username}`}
        />
        <div>
          <p className="font-semibold leading-5">{comment.user.name}</p>
          <p className="text-gray-500 text-sm">
            @{comment.user.username} • <span>{timeAgo(comment.createdAt)}</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p
          className={`${
            fullComment ? "" : "line-clamp-5"
          } text-sm text-gray-600 whitespace-pre-line`}
        >
          {comment.content}
        </p>
      </div>
      {!fullComment && (
        <button
          onClick={() => {
            // TODO: fix this: below doesn't work
            // router.replace(`${pathname}?comment=${comment.id}`);
            // router.replace(
            //   {
            //     pathname: "/c/[id]",
            //     query: {
            //       id: router.query.id,
            //       comment: comment.id,
            //     },
            //   },
            //   undefined,
            //   { shallow: true, scroll: false }
            // );
          }}
          className="mt-3 bg-white text-black border border-gray-200 hover:bg-gray-50 text-center shadow-sm w-full text-sm h-8 rounded-md transition-all duration-75 focus:outline-none"
        >
          View Comment
        </button>
      )}
    </div>
  );
}
