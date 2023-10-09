'use client';
import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useRecent } from '@/store/recent';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/components/pages/LoadingPage';
import { ImageFetch } from '@/@Types/Image';

interface RecentProviderProps {
  children: ReactNode;
}

async function getImagesPaged(page: number) {
  const { data } = await api.get<ImageFetch>('image/' + page, {
    params: {
      nsfw: false,
    },
  });

  return data;
}

export default function RecentProvider({ children }: RecentProviderProps) {
  const { page, setHasNext, setImages, setPage, setTotalPage } = useRecent();

  const {
    isLoading: isLoadingFetchImage,
    data: fetchImage,
    refetch,
  } = useQuery({
    queryKey: 'fetch/image/' + page,
    queryFn: () => getImagesPaged(page),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const isLoading = isLoadingFetchImage || fetchImage == undefined;

  useEffect(() => {
    if (fetchImage) {
      const data = fetchImage.content;
      setImages(data.data);
      setTotalPage(data.totalPage);
      setHasNext(data.hasNext);
      setPage(page);
    }
  }, [fetchImage]);

  useEffect(() => {
    if (page) {
      refetch();
    }
  }, [page]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
