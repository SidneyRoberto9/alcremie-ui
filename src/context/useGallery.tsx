import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createContext } from 'use-context-selector';

import { GalleryFetchDataResponse, ImageData } from '../@types/gallery';
import { api } from '../server/api';

interface GalleryContextProps {
  content: ImageData[] | null;
  pageNumber: number;
  pageSize: number;
  contentTotalSize: number;
  loading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  setContent: Dispatch<SetStateAction<GalleryFetchDataResponse>>;
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
  const [loading, setLoading] = useState(false);

  async function getGalleryData(pageNumber: number) {
    setLoading(true);
    const { data } = await api.get(`/img/${pageNumber}?all=true`);

    setResponseData(data);
    setLoading(false);
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
        loading,
        onNextPage,
        onPreviousPage,
        setContent: setResponseData,
      }}
    >
      {children}
    </galleryContext.Provider>
  );
}
