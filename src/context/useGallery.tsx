import { createContext } from 'use-context-selector';
import { UseMutateAsyncFunction, useQueryClient, useQuery, useMutation } from 'react-query';
import { SetStateAction, ReactNode, Dispatch, useState, useCallback } from 'react';

import { useToast } from '@chakra-ui/react';

import { api } from '../server/api';
import { GetGalleryDataParams, GalleryFetchDataResponse, CreateImg } from '../@types/gallery';

interface GalleryContextProps {
  contentData: GalleryFetchDataResponse | undefined;
  actualPage: number;
  isLoading: boolean;
  onChangePage: (page: number) => void;
  setFilterParams: Dispatch<SetStateAction<GetGalleryDataParams>>;
  filterData: (page: number, params: GetGalleryDataParams) => void;
  createImage: UseMutateAsyncFunction<null, unknown, CreateImg, unknown>;
}

interface ContextProps {
  children: ReactNode;
}

export const galleryContext = createContext({} as GalleryContextProps);

export function GalleryProvider({ children }: ContextProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [page, setPage] = useState(0);
  const [filterParams, setFilterParams] = useState<GetGalleryDataParams>({
    all: false,
    included_tags: '',
    is_nsfw: false,
  });

  const queryIdentifier = [
    'gallery',
    page,
    filterParams.all,
    filterParams.included_tags,
    filterParams.is_nsfw,
  ];

  const {
    data: contentData,
    isLoading,
    isFetching,
  } = useQuery(
    queryIdentifier,
    async () => {
      const { data } = await api.get<GalleryFetchDataResponse>(`/img/${page}`, {
        params: {
          pageSize: 25,
          ...filterParams,
        },
      });

      return data;
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      keepPreviousData: true,
    },
  );

  const { isLoading: isLoadingMutation, mutateAsync } = useMutation(
    async ({ file, nsfw, source, tags }: CreateImg) => {
      const document = JSON.stringify({
        source: source,
        is_nsfw: nsfw,
        tags: tags,
      });

      const formData = new FormData();
      formData.append('picture', file);
      formData.append('document', document);

      try {
        await api.post('/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast({
          title: 'Image uploaded!',
          description: 'The image was uploaded successfully.',
          status: 'success',
          duration: 3500,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Image not uploaded!',
          description: 'The image was not uploaded successfully.',
          status: 'error',
          duration: 3500,
          isClosable: true,
        });
      }

      return null;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

  const onChangePage = useCallback(
    async (change: number) => {
      setPage(page + change);
    },
    [page],
  );

  const filterData = useCallback(
    async (page: number, params: GetGalleryDataParams) => {
      setPage(page);
      setFilterParams(params);
    },
    [page, filterParams],
  );

  return (
    <galleryContext.Provider
      value={{
        contentData,
        actualPage: page + 1,
        isLoading: isLoading || isFetching || isLoadingMutation,
        filterData,
        onChangePage,
        setFilterParams,
        createImage: mutateAsync,
      }}>
      {children}
    </galleryContext.Provider>
  );
}
