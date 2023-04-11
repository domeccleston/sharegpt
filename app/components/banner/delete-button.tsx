import { fetcher } from "@/lib/utils";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { LoadingCircle } from "@/components/shared/icons";
import { Trash } from "lucide-react";
import { useRouter } from "next/router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shared/tooltip";

export default function DeleteButton() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data } = useSWR<{
    ttl: number;
  }>(`/api/conversations/${id}/delete`, fetcher);

  const [ttl, setTtl] = useState(data?.ttl || 0);

  useEffect(() => {
    if (ttl === 0) {
      return;
    }
    const timerId = setInterval(() => {
      setTtl((prevTtl) => prevTtl - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [ttl]);

  const [submitting, setSubmitting] = useState(false);
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => {
              setSubmitting(true);
              fetch(`/api/conversations/${id}/delete`, {
                method: "DELETE",
              }).then(() => {
                mutate(`/api/conversations/${id}/delete`);
                router.push("/");
              });
            }}
            disabled={submitting}
            className={`${
              submitting ? "cursor-not-allowed" : ""
            } p-2 flex flex-col space-y-1 items-center rounded-md w-12 hover:bg-gray-100 active:bg-gray-200 transition-all`}
          >
            {submitting ? (
              <LoadingCircle />
            ) : (
              <Trash className="h-4 w-4 text-gray-600" />
            )}
            <p className="text-center text-gray-600 text-sm">{ttl}s</p>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>You have {ttl}s remaining to delete this conversation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
