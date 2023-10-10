'use client';
import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useRecent } from '@/store/recent';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/component/LoadingPage';
import { ImageFilter, ImageFetch } from '@/@Types/Image';

interface RecentProviderProps {
  children: ReactNode;
}

async function getTags(text: string) {
  const { data } = await api.get<ImageFetch>('tag', {
    params: {
      q: text,
    },
  });

  return data;
}

async function getImagesPaged({ page, nsfw, tagId }: ImageFilter) {
  const { data } = await api.get<ImageFetch>('image/' + page, {
    params: {
      nsfw: nsfw,
      q: tagId,
    },
  });

  return data;
}

export default function RecentProvider({ children }: RecentProviderProps) {
  const { filter, setHasNext, setImages, setTotalPage } = useRecent();

  const {
    isLoading: isLoadingFetchImage,
    data: fetchImage,
    refetch,
  } = useQuery({
    queryKey: 'fetch/image/' + filter.page + '/' + filter.tagId,
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
