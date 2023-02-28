import { createContext, ReactNode, useContext, useState } from 'react';
import { useEffect } from 'react';

import { Tag } from '../@types/gallery';
import { api } from '../server/api';

interface TagsProps {
  data: Tag[];
}

interface ContextProps {
  children: ReactNode;
}

const tagsContext = createContext({} as TagsProps);

export function TagsContextProvider({ children }: ContextProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  async function getTags() {
    const { data } = await api.get('/tag');
    setTags(data);
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <tagsContext.Provider
      value={{
        data: tags,
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
