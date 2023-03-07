import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createContext } from 'use-context-selector';

import { GalleryFetchDataResponse, GetGalleryDataParams, ImageData } from '../@types/gallery';
import { api } from '../server/api';

interface GalleryContextProps {
  content: ImageData[] | null;

  pageNumber: number;
  pageSize: number;
  contentTotalSize: number;
  isLoading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  setContent: Dispatch<SetStateAction<GalleryFetchDataResponse>>;
  getGalleryData: (
    pageNumber: number,
    params?: GetGalleryDataParams,
  ) => Promise<void>;
}

interface ContextProps {
  children: ReactNode;
}

export const galleryContext = createContext({} as GalleryContextProps);

export function GalleryProvider({ children }: ContextProps) {
  const [responseData, setResponseData] = useState<GalleryFetchDataResponse>(
    {} as GalleryFetchDataResponse,
  );

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function getGalleryData(
    pageNumber: number,
    params?: GetGalleryDataParams,
  ) {
    setIsLoading(true);
    const { data } = await api.get(`/img/${pageNumber}`, {
      params: {
        all: false,
        pageSize: 25,
        included_tags: '',
        is_nsfw: false,
        ...params,
      },
    });

    setResponseData(data);
    setIsLoading(false);
  }

  async function onNextPage() {
    setPage((state) => state + 1);
    await getGalleryData(page + 1);
  }

  async function onPreviousPage() {
    setPage((state) => state - 1);
    await getGalleryData(page - 1);
  }

  return (
    <galleryContext.Provider
      value={{
        content: responseData.content,
        contentTotalSize: responseData.totalContent,
        pageSize: responseData.pageSize,
        pageNumber: page + 1,
        isLoading,
        onNextPage,
        onPreviousPage,
        getGalleryData,
        setContent: setResponseData,
      }}
    >
      {children}
    </galleryContext.Provider>
  );
}
