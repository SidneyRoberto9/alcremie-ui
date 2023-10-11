'use client';
import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useGallery } from '@/store/gallery';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/component/LoadingPage';
import { ImageFilter, ImageFetch } from '@/@Types/Image';

interface GalleryProviderProps {
  children: ReactNode;
}

async function getImagesPaged({ page, tagId }: ImageFilter) {
  const { data } = await api.get<ImageFetch>('image/' + page, {
    params: {
      q: tagId,
    },
  });

  return data;
}

export default function GalleryProvider({ children }: GalleryProviderProps) {
  const { filter, setHasNext, setImages, setTotalPage } = useGallery();

  const {
    isLoading: isLoadingFetchImage,
    data: fetchImage,
    refetch,
  } = useQuery({
    queryKey: 'fetch/image/' + filter.page + '/' + filter.tagId + '/false',
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
