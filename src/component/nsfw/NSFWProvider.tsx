'use client';
import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useNSFW } from '@/store/nsfw';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/component/LoadingPage';
import { ImageFilter, ImageFetch } from '@/@Types/Image';

interface NSFWProviderProps {
  children: ReactNode;
}

async function getImagesPaged({ page, tagId }: ImageFilter) {
  const { data } = await api.get<ImageFetch>('image/' + page, {
    params: {
      q: tagId,
      nsfw: true,
    },
  });

  return data;
}

export default function NsfwProvider({ children }: NSFWProviderProps) {
  const { filter, setHasNext, setImages, setTotalPage } = useNSFW();

  const {
    isLoading: isLoadingFetchImage,
    data: fetchImage,
    refetch,
  } = useQuery({
    queryKey: 'fetch/image/' + filter.page + '/' + filter.tagId + '/true',
    queryFn: () => getImagesPaged(filter),
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
    }
  }, [fetchImage]);

  useEffect(() => {
    if (filter) {
      refetch();
    }
  }, [filter]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
