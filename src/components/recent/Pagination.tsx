'use client';

import { useRecent } from '@/store/recent';

export function Pagination() {
  const { page, totalPage, setPage } = useRecent();

  const isFirstPage = page == 1;
  const isLastPage = totalPage == page;

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(totalPage);
  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  return (
    <div className="fixed flex flex-col bottom-2 left-[50vw] transform -translate-x-1/2 -translate-y-0 bg-lucide-800 rounded-lg h-auto">
      <div className="flex items-center justify-between px-1">
        <button
          className="w-16 min-w-[4rem] rounded h-7 m-1 text-sm font-medium cursor-pointer capitalize text-zinc-100 bg-violet-400 transition-all duration-200 ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-50"
          onClick={handleFirstPage}
          disabled={isFirstPage}>
          First
        </button>
        <button
          className="w-16 min-w-[4rem] rounded h-7 m-1 text-sm font-medium cursor-pointer capitalize text-zinc-100 bg-violet-400 transition-all duration-200 ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-50"
          onClick={handlePrevPage}
          disabled={isFirstPage}>
          Previous
        </button>

        <span className="inline-flex items-center justify-center px-2 py-3 text-sm text-zinc-100 select-none cursor-pointer w-full max-w-[10rem] min-w-[4rem]">
          {page} / {totalPage}
        </span>

        <button
          className="w-16 min-w-[4rem] rounded h-7 m-1 text-sm font-medium cursor-pointer capitalize text-zinc-100 bg-violet-400 transition-all duration-200 ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-50"
          onClick={handleNextPage}
          disabled={isLastPage}>
          Next
        </button>
        <button
          className="w-16 min-w-[4rem] rounded h-7 m-1 text-sm font-medium cursor-pointer capitalize text-zinc-100 bg-violet-400 transition-all duration-200 ease-in-out hover:brightness-90 disabled:cursor-not-allowed disabled:brightness-50"
          onClick={handleLastPage}
          disabled={isLastPage}>
          Last
        </button>
      </div>
    </div>
  );
}
