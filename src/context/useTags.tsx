import { ReactNode, useState } from 'react';
import { createContext } from 'use-context-selector';

import { Tag } from '../@types/api/tag';
import { api } from '../server/api';

interface TagsProps {
  data: Tag[];
  isLoading: boolean;
  setTags: (tags: Tag[]) => void;
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

export const tagsContext = createContext({} as TagsProps);

export function TagsContextProvider({ children }: ContextProps) {
  const [InitialTags, setInitialTags] = useState<Tag[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function filterTag(search: string) {
    if (search.length < 1) {
      return setTags(InitialTags);
    }

    setTags((state) =>
      state.filter((tag) => tag.name.toLowerCase().includes(search)),
    );
  }

  function setTagContent(tags: Tag[]) {
    setTags(tags);
    setInitialTags(tags);
  }

  async function getTags() {
    setIsLoading(true);
    const { data } = await api.get('/tag');

    setInitialTags(data.tags);
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
  }

  async function deleteTag(id: string) {
    setIsLoading(true);
    await api.delete(`/tag/${id}`);
  }

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
      }}
    >
      {children}
    </tagsContext.Provider>
  );
}
