import { createContext } from 'use-context-selector';
import { ReactNode, useState, useEffect, useCallback } from 'react';

import { api } from '../server/api';
import { TagWithImageCount, createTagDto } from '../@types/api/tag';

interface TagsProps {
  data: TagWithImageCount[];
  page: number;
  totalTags: number;
  isLoading: boolean;
  deleteTag: (id: number | string) => Promise<void>;
  createTag: (dto: createTagDto) => void;
  onChangePage: (nextPage: number) => void;
}

interface ContextProps {
  children: ReactNode;
}

export const tagsContext = createContext({} as TagsProps);

async function fetchCreateTag(dto: createTagDto) {
  return await api.post('/tag', {
    name: dto.name,
    description: dto.description,
    is_nsfw: dto.is_nsfw,
  });
}

export function TagsContextProvider({ children }: ContextProps) {
  const [totalTags, setTotalTags] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<TagWithImageCount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createTag = useCallback(async (dto: createTagDto) => {
    setIsLoading(true);
    await fetchCreateTag(dto);
    setIsLoading(false);
  }, []);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      setPage(nextPage);
    },
    [page],
  );

  const deleteTag = useCallback(async (id: number | string) => {
    setIsLoading(true);
    await api.delete(`/tag/${id}`);
    setIsLoading(false);
  }, []);

  const getTagsData = useCallback(async () => {
    setIsLoading(true);
    const { data } = await api.get('/tag', {
      params: {
        page,
      },
    });
    setTotalTags(data['size']);
    setData(data['tags']);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    getTagsData();
  }, [page]);

  return (
    <tagsContext.Provider
      value={{
        page,
        totalTags,
        data,
        isLoading,
        createTag,
        deleteTag,
        onChangePage: handlePageChange,
      }}>
      {children}
    </tagsContext.Provider>
  );
}
