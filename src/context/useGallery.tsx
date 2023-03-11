import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createContext } from 'use-context-selector';

import {
  GalleryFetchDataResponse,
  GetGalleryDataParams,
  ImageData,
} from '../@types/gallery';
import { api } from '../server/api';

interface GalleryContextProps {
  content: ImageData[] | null;
  actualPage: number;
  pageSize: number;
  contentTotalSize: number;
  isLoading: boolean;
  getGalleryData: (page: number, params: GetGalleryDataParams) => Promise<void>;
  onChangePage: (page: number) => void;
  onSetContent: (data: GalleryFetchDataResponse) => void;
  setFilterParams: Dispatch<SetStateAction<GetGalleryDataParams>>;
}

interface ContextProps {
  children: ReactNode;
}

export const galleryContext = createContext({} as GalleryContextProps);

export function GalleryProvider({ children }: ContextProps) {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState<GalleryFetchDataResponse>(
    {} as GalleryFetchDataResponse,
  );
  const [filterParams, setFilterParams] = useState<GetGalleryDataParams>({
    all: false,
    included_tags: '',
    is_nsfw: false,
  });

  function onSetContent(data: GalleryFetchDataResponse) {
    setResponseData(data);
    setIsLoading(false);
    setPage(0);
  }

  async function getGalleryData(
    pageNumber: number,
    params: GetGalleryDataParams,
  ) {
    setIsLoading(true);
    const { data } = await api.get(`/img/${pageNumber}`, {
      params: {
        pageSize: 25,
        ...filterParams,
        ...params,
      },
    });

    setFilterParams(params);
    setResponseData(data);
    setPage(pageNumber);
    setIsLoading(false);
  }

  async function onChangePage(change: number) {
    await getGalleryData(page + change, filterParams);
  }

  return (
    <galleryContext.Provider
      value={{
        content: responseData.content,
        contentTotalSize: responseData.totalContent,
        pageSize: responseData.pageSize,
        actualPage: page + 1,
        isLoading,
        onChangePage,
        onSetContent,
        getGalleryData,
        setFilterParams,
      }}
    >
      {children}
    </galleryContext.Provider>
  );
}
