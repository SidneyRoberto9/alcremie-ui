'use client';

import { useInfiniteQuery } from 'react-query';

import { api } from '@/lib/axios';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import { Loading } from '@/component/Loading';
import { Card } from '@/component/recent/Card';
import { ImageFetch, ImageContent } from '@/@Types/Image';

const LIMIT = 30;
const PAGE = 1;

async function fetchData(page: number = PAGE, limit: number = LIMIT) {
  const { data } = await api.get<ImageFetch>('image/' + page, {
    params: {
      limit,
    },
  });

  return data.content;
}

function fetchNextPage(lastPage: ImageContent) {
  const cursor = Number(lastPage.page) + 1;

  if (lastPage.hasNext) {
    return cursor;
  }
}

export function InfiniteFetch() {
  const reactQueryImages = useInfiniteQuery({
    queryKey: 'fetch/image',
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    getNextPageParam: fetchNextPage,
    select: (data) => ({
      ...data,
      pages: data.pages.map((item) => item.data),
    }),
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const lastProductRef = useIntersectionObserver<HTMLDivElement>(
    () => void reactQueryImages.fetchNextPage(),
    [reactQueryImages.hasNextPage],
  );

  return (
    <section className="mt-20 m-auto max-w-3xl">
      <div className="p-2 flex flex-wrap justify-center gap-4">
        {reactQueryImages.data?.pages.flat().map((item, index, items) => (
          <div key={index} ref={items.length - 1 === index ? lastProductRef : null}>
            <Card key={item.id} id={item.id} tag={item.tags} url={item.url} />
          </div>
        ))}
      </div>
      {reactQueryImages.isLoading && <Loading className="h-12 w-12 my-10" />}
    </section>
  );
}
