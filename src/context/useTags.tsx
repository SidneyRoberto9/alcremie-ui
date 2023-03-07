import { createContext, ReactNode, useContext, useState } from 'react';
import { useEffect } from 'react';

import { Tag } from '../@types/api/tag';
import { api } from '../server/api';

interface TagsProps {
  data: Tag[];
  isLoading: boolean;
  filterTag: (search: string) => void;
  getTags: () => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  createTag: (
    name: string,
    description: string,
    isNsfw: boolean,
  ) => Promise<void>;
}

interface ContextProps {
  children: ReactNode;
}

const tagsContext = createContext({} as TagsProps);

export function TagsContextProvider({ children }: ContextProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function filterTag(search: string) {
    if (search.length < 2) {
      return getTags();
    }

    setTags((state) =>
      state.filter((tag) => tag.name.toLowerCase().includes(search)),
    );
  }

  async function getTags() {
    setIsLoading(true);
    const { data } = await api.get('/tag');

    setTags(data.tags);
    setIsLoading(false);
  }

  async function createTag(name: string, description: string, isNsfw: boolean) {
    setIsLoading(true);
    await api.post('/tag', {
      name,
      description,
      is_nsfw: isNsfw,
    });

    await getTags();
  }

  async function deleteTag(id: string) {
    setIsLoading(true);
    await api.delete(`/tag/${id}`);
    await getTags();
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <tagsContext.Provider
      value={{
        data: tags,
        isLoading,
        getTags,
        createTag,
        deleteTag,
        filterTag,
      }}
    >
      {children}
    </tagsContext.Provider>
  );
}

export function useTags() {
  const context = useContext(tagsContext);

  return context;
}
