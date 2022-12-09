import { Copy, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { fetcher } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { LoadingCircle } from "@/components/shared/icons";

export default function Banner() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: session } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { data } = useSWR<{ upvoted: boolean }>(
    session?.user ? `/api/conversations/${id}/upvote` : null,
    fetcher
  );
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <SignInModal />
      <div className="fixed bottom-5 inset-x-0 mx-auto max-w-fit rounded-lg px-3 py-2 bg-white border border-gray-100 shadow-md flex justify-between space-x-2 items-center">
        <Link
          href="/"
          className="flex space-x-3 items-center justify-center font-medium text-gray-600 px-3 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
        >
          <Image
            alt="ShareGPT logo"
            src="/logo.svg"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <p>Shared via ShareGPT</p>
        </Link>
        <div className="border-l border-gray-200 h-8 w-1" />
        <button
          onClick={() =>
            navigator.clipboard
              .writeText(`https://shareg.pt/${id}`)
              .then(() => {
                toast.success("Link copied to clipboard");
              })
          }
          className="p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
        >
          <Copy className="h-4 w-4 text-gray-600" />
        </button>
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
                  setSubmitting(false)
                );
              });
            }
          }}
          disabled={submitting || !data}
          className={`${
            submitting || !data ? "cursor-not-allowed" : ""
          } p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all`}
        >
          {submitting || !data ? (
            <LoadingCircle />
          ) : data?.upvoted ? (
            <Heart className="h-4 w-4 text-red-500" fill="#EF4444" />
          ) : (
            <Heart className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
    </>
  );
}
