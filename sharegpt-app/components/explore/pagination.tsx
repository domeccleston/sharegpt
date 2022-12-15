import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter, NextRouter } from "next/router";
import { PAGINATION_LIMIT } from "@/lib/constants";
import useScroll from "@/lib/hooks/use-scroll";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useDebounce } from "use-debounce";

const setPage = (router: NextRouter, page: number) => {
  router.replace(
    {
      query: {
        ...router.query,
        page: page,
      },
    },
    undefined,
    { shallow: true }
  );
};

const Button = ({ value }: { value: number }) => {
  const router = useRouter();
  const currentPage: number =
    router.query.page && typeof router.query.page === "string"
      ? parseInt(router.query.page)
      : 1;
  return (
    <button
      className={`${
        value === currentPage ? "text-black" : "text-gray-400"
      } font-semibold rounded-md min-w-[1.5rem] p-1 bg-white hover:bg-gray-100 transition-all`}
      onClick={() => setPage(router, value)}
    >
      {value}
    </button>
  );
};

const Divider = () => {
  return <div className="w-6 border border-gray-400 rounded-lg" />;
};

export default function Pagination({ count: initialCount }: { count: number }) {
  const router = useRouter();
  const { search } = router.query as { search?: string };
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: count } = useSWR<number>(
    `/api/conversations/count${
      debouncedSearch ? `?search=${debouncedSearch}` : ""
    }`,
    fetcher,
    {
      fallbackData: initialCount,
    }
  ) as { data: number };

  const paginatedCount = Math.ceil(count / PAGINATION_LIMIT);
  const paginationArray = !isNaN(paginatedCount)
    ? Array.from(Array(paginatedCount).keys())
    : [];

  const currentPage: number =
    router.query.page && typeof router.query.page === "string"
      ? parseInt(router.query.page)
      : 1;

  const show = useScroll(1500);

  return (
    <div
      className={`${
        show ? "bottom-5" : "-bottom-20"
      } sticky bottom-5 mt-2 rounded-md border border-gray-100 bg-white p-4 shadow-lg h-20 flex flex-col justify-center items-center space-y-2 transition-all`}
    >
      <div className="flex space-x-2 items-center">
        {currentPage > 1 && paginatedCount > 5 && (
          <button
            onClick={() => setPage(router, currentPage - 1)}
            className="flex items-center justify-center rounded-md min-w-[1.5rem] p-1 bg-white hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {paginationArray.length > 6 ? (
          currentPage > 3 && currentPage < paginationArray.length - 2 ? (
            <>
              <Button value={1} />
              <Divider />
              <Button value={currentPage - 1} />
              <Button value={currentPage} />
              <Button value={currentPage + 1} />
              <Divider />
              <Button value={paginationArray.length - 1} />
            </>
          ) : currentPage <= 3 ? (
            <>
              <Button value={1} />
              <Button value={2} />
              <Button value={3} />
              <Divider />
              <Button value={paginationArray.length - 1} />
            </>
          ) : (
            <>
              <Button value={1} />
              <Divider />
              <Button value={paginationArray.length - 3} />
              <Button value={paginationArray.length - 2} />
              <Button value={paginationArray.length - 1} />
            </>
          )
        ) : (
          paginationArray.map((i) => <Button key={i + 1} value={i + 1} />)
        )}
        {currentPage < paginatedCount && paginatedCount > 5 && (
          <button
            onClick={() => setPage(router, currentPage + 1)}
            className="flex items-center justify-center rounded-md min-w-[1.5rem] p-1 bg-white hover:bg-gray-100 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="text-gray-500 text-sm">
        Showing {(currentPage - 1) * PAGINATION_LIMIT + 1} -{" "}
        {Math.min(currentPage * PAGINATION_LIMIT, count)} of{" "}
        {Intl.NumberFormat("en-us").format(count)} conversations
      </p>
    </div>
  );
}
