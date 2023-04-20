import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "./copy-button";
import SaveButton from "@/components/banner/save-button";
import DeleteButton from "./delete-button";
import ViewCounter from "./view-counter";

export default function Banner({ views }: { views: number }) {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: { ttl } = {} } = useSWR<{
    ttl: number;
  }>(`/api/conversations/${id}/ttl`, fetcher);

  return (
    <AnimatePresence>
      {ttl && (
        <motion.div
          className="z-10 fixed bottom-5 inset-x-0 mx-auto max-w-fit rounded-lg px-3 py-2 bg-white border border-gray-100 shadow-md flex justify-between space-x-2 items-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <div className="w-40 flex flex-col items-center justify-center">
            <Link
              href="https://sharegpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-2 items-center justify-center font-medium text-gray-600 px-4 py-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all"
            >
              <Image
                alt="ShareGPT logo"
                src="/logo.svg"
                width={20}
                height={20}
                className="rounded-sm"
              />
              <p>ShareGPT</p>
            </Link>
            <Link
              href="https://vercel.com?utm_source=sharegpt&utm_campaign=oss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-800 px-3"
            >
              Powered by ▲Vercel
            </Link>
          </div>
          <div className="border-l border-gray-200 h-12 w-1" />
          <CopyButton />
          <SaveButton id={id} />
          {ttl > 0 && <DeleteButton />}
          <ViewCounter views={views} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
