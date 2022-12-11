import { useRouter } from "next/router";
import { fetcher, nFormatter } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { LoadingCircle } from "@/components/shared/icons";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useSession } from "next-auth/react";
import { Triangle } from "lucide-react";

export default function Upvote({ id }: { id: string }) {
  const { data: session } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data, isValidating } = useSWR<{ upvoted: boolean }>(
    session?.user ? `/api/conversations/${id}/upvote` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  const { data: upvotesData } = useSWR<{ count: number }>(
    `/api/conversations/${id}/upvotes`,
    fetcher
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <>
      <SignInModal />
      <button
        onClick={() => {
          if (!session?.user) {
            setShowSignInModal(true);
          } else {
            setSubmitting(true);
            fetch(`/api/conversations/${id}/upvote`, {
              method: data?.upvoted ? "DELETE" : "POST",
            }).then(() => {
              mutate(`/api/conversations/${id}/upvote`).then(() =>
                mutate(`/api/conversations/${id}/upvotes`).then(() =>
                  setSubmitting(false)
                )
              );
            });
          }
        }}
        disabled={submitting || isValidating}
        className={`${
          submitting || isValidating ? "cursor-not-allowed" : ""
        } p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all`}
      >
        {submitting || isValidating ? (
          <LoadingCircle />
        ) : data?.upvoted ? (
          <Triangle className="h-4 w-4 text-orange-500" fill="#F97316" />
        ) : (
          <Triangle className="h-4 w-4 text-gray-600" />
        )}
        <p className="text-center text-gray-600 text-sm">
          {upvotesData?.count ? nFormatter(upvotesData.count, 1) : 0}
        </p>
      </button>
    </>
  );
}
