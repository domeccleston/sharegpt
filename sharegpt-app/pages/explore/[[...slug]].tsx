import ConvoCard from "@/components/explore/convo-card";
import ExploreLayout from "@/components/explore/layout";
import { getConvos } from "@/lib/api";
import prisma from "@/lib/prisma";
import { ConversationMeta } from "@/lib/types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import { PAGINATION_LIMIT } from "@/lib/constants";
import Pagination from "@/components/explore/pagination";
import { Search } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/icons";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Explore({
  type,
  totalConvos,
  convos,
}: {
  type: "new" | "top";
  totalConvos: number;
  convos: ConversationMeta[];
}) {
  const router = useRouter();
  const { page, search } = router.query as { page?: string; search?: string };
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: convosData, isValidating } = useSWR<ConversationMeta[]>(
    `/api/conversations?type=${type}${page ? `&page=${page}` : ""}${
      debouncedSearch && debouncedSearch.length > 2
        ? `&search=${debouncedSearch}`
        : ""
    }`,
    fetcher,
    {
      fallbackData: convos,
      keepPreviousData: true,
    }
  );

  const [focused, setFocused] = useState(false);

  return (
    <ExploreLayout type={type} totalConvos={totalConvos}>
      <div className="relative mt-10 rounded-md shadow-sm sm:max-w-screen-lg mx-2 lg:mx-auto">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          {focused && search && isValidating ? (
            <LoadingSpinner />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          name="search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={search || ""}
          onChange={(e) => {
            if (e.target.value === "") {
              delete router.query.search;
              router.replace(
                {
                  query: {
                    ...router.query,
                  },
                },
                undefined,
                { shallow: true }
              );
            } else {
              router.replace(
                {
                  query: {
                    ...router.query,
                    search: e.target.value,
                  },
                },
                undefined,
                { shallow: true }
              );
            }
          }}
          className="block w-full rounded-md text-gray-600 placeholder:text-gray-400 border-gray-200 pl-11 h-11 focus:border-black focus:ring-0 text-sm transition-all"
          placeholder="Search..."
        />
      </div>
      <div className="pb-20 px-2 lg:px-0 sm:max-w-screen-lg w-full mx-auto">
        {convosData?.length === 0 && (
          <div className="mt-2 h-96 flex flex-col items-center justify-center space-y-2 rounded-md border border-gray-100 bg-white p-4 shadow-md">
            <Image
              src="/illustrations/empty.svg"
              width={200}
              height={200}
              alt="No comments yet"
            />
            <p>No conversations found</p>
          </div>
        )}
        <motion.ul
          key={type}
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="mt-2 grid gap-2"
        >
          {convosData?.slice(0, 10).map((convo) => (
            <ConvoCard key={convo.id} data={convo} />
          ))}
        </motion.ul>
        <ul className="mt-2 grid gap-2">
          {convosData?.slice(10).map((convo) => (
            <ConvoCard key={convo.id} data={convo} />
          ))}
        </ul>
        {convosData && convosData.length > 0 && (
          <Pagination count={totalConvos} />
        )}
      </div>
    </ExploreLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: [],
        },
      },
      {
        params: {
          slug: ["new"],
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const type = slug && slug[0] === "new" ? "new" : "top";

  const totalConvos = await prisma.conversation.count();
  const convos = await getConvos({
    orderBy: type === "new" ? "createdAt" : "views",
    take: PAGINATION_LIMIT,
  });

  return {
    props: {
      type,
      totalConvos,
      convos,
    },
    revalidate: 60,
  };
}
