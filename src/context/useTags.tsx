import { createContext } from 'use-context-selector';
import { ReactNode, useState, useCallback } from 'react';

import { api } from '../server/api';
import { Tag } from '../@types/api/tag';

interface TagsProps {
  data: Tag[];
  isLoading: boolean;
  setTags: (tags: Tag[]) => void;
  filterTag: (search: string) => void;
  getTags: () => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  createTag: (name: string, description: string, isNsfw: boolean) => Promise<void>;
}

interface ContextProps {
  children: ReactNode;
}

export const tagsContext = createContext({} as TagsProps);

export function TagsContextProvider({ children }: ContextProps) {
  const [InitialTags, setInitialTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterTag = useCallback(
    (search: string) => {
      if (search.length < 1) {
        return setTags(InitialTags);
      }

      setTags((state) => state.filter((tag) => tag.name.toLowerCase().includes(search)));
    },
    [tags, InitialTags],
  );

  const setTagContent = useCallback(
    (tags: Tag[]) => {
      setTags(tags);
      setInitialTags(tags);
    },
    [tags, InitialTags],
  );

  const getTags = useCallback(async () => {
    setIsLoading(true);
    const { data } = await api.get('/tag');
    setInitialTags(data.tags);
    setTags(data.tags);
    setIsLoading(false);
  }, [InitialTags, tags, isLoading]);

  const createTag = useCallback(
    async (name: string, description: string, isNsfw: boolean) => {
      setIsLoading(true);
      await api.post('/tag', {
        name,
        description,
        is_nsfw: isNsfw,
      });
    },
    [isLoading],
  );

  const deleteTag = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await api.delete(`/tag/${id}`);
    },
    [isLoading],
  );

  return (
    <tagsContext.Provider
      value={{
        data: tags,
        isLoading,
        getTags,
        createTag,
        deleteTag,
        filterTag,
        setTags: setTagContent,
      }}>
      {children}
    </tagsContext.Provider>
  );
}
