'use client';

import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useHome } from '@/store/home';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/component/LoadingPage';
import { Status, Image } from '@/@Types/Image';

interface HomeProviderProps {
  children: ReactNode;
}

interface StatusResponse {
  statistics: Status;
}

async function getRandomImage() {
  const { data } = await api.get<Image>('random-image');

  return data;
}

async function getStatus() {
  const { data } = await api.get<StatusResponse>('status');

  return data;
}

export function HomeProvider({ children }: HomeProviderProps) {
  const { setImage, setStatistics } = useHome();

  const { isLoading: isLoadingRandomImage, data: randomImage } = useQuery({
    queryKey: 'random/anime',
    queryFn: getRandomImage,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const { isLoading: isLoadingStatus, data: status } = useQuery({
    queryKey: 'status/anime',
    queryFn: getStatus,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const isLoading =
    isLoadingRandomImage || isLoadingStatus || randomImage == undefined || status == undefined;

  useEffect(() => {
    if (randomImage) {
      setImage(randomImage);
    }

    if (status) {
      setStatistics(status.statistics);
    }
  }, [randomImage, status]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
