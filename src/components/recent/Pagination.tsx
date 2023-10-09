'use client';

import { useRecent } from '@/store/recent';
import SelectPageModal from '@/components/recent/SelectPageModal';

export function Pagination() {
  const { filter, setFilter, totalPage } = useRecent();

  const page = filter.page;
  const isFirstPage = page == 1;
  const isLastPage = totalPage == page;

  const onChangePage = (page: number) => setFilter({ ...filter, page: page });
  const handleFirstPage = () => onChangePage(1);
  const handleLastPage = () => onChangePage(totalPage);
  const handleNextPage = () => onChangePage(page + 1);
  const handlePrevPage = () => onChangePage(page - 1);

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

        <SelectPageModal />

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
