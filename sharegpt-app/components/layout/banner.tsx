import { Check, Copy, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import UpvoteButton from "@/components/shared/upvote-button";
import { useState } from "react";
import { nFormatter } from "@/lib/utils";

export default function Banner({ views }: { views: number }) {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [copied, setCopied] = useState(false);

  return (
    <div className="fixed bottom-5 inset-x-0 mx-auto max-w-fit rounded-lg px-3 py-2 bg-white border border-gray-100 shadow-md flex justify-between space-x-2 items-center">
      <Link
        href="/"
        className="flex space-x-3 items-center justify-center font-medium text-gray-600 px-3 h-14 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
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
      <div className="border-l border-gray-200 h-10 w-1" />
      <button
        onClick={() =>
          navigator.clipboard.writeText(`https://shareg.pt/${id}`).then(() => {
            toast.success("Link copied to clipboard");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
        }
        className="p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4 text-gray-600" />
        )}
        <p className="text-center text-gray-600 text-sm">Copy</p>
      </button>
      <UpvoteButton id={id} />
      <div className="cursor-default p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all">
        <Eye className="h-4 w-4 text-gray-600" />
        <p className="text-center text-gray-600 text-sm">{nFormatter(views)}</p>
      </div>
    </div>
  );
}
