'use client';

import { useQuery } from 'react-query';
import { ReactNode, useEffect } from 'react';

import { useHome } from '@/store/home';
import { api } from '@/lib/axios';
import { LoadingPage } from '@/components/pages/LoadingPage';
import { Status, Anime } from '@/@Types/Anime';

interface HomeProviderProps {
  children: ReactNode;
}

interface StatusResponse {
  statistics: Status;
}

async function getRandomImage() {
  const { data } = await api.get<Anime>('random-image');

  return data;
}

async function getStatus() {
  const { data } = await api.get<StatusResponse>('status');

  return data;
}

export function HomeProvider({ children }: HomeProviderProps) {
  const { setAnime, setStatistics } = useHome();

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
      setAnime(randomImage);
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
