'use client';

import { useQuery } from 'react-query';
import Drawer from 'react-modern-drawer';
import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

import { Combobox } from '@headlessui/react';
import { api } from '@/lib/axios';
import { useGallery } from '@/context/gallery';
import { Tag } from '@/@Types/Tag';

const compareTag = (a?: Tag, b?: Tag): boolean => a?.name.toLowerCase() === b?.name.toLowerCase();

async function getTags(text: string): Promise<Tag[]> {
  const { data } = await api.get('tag', {
    params: {
      q: text,
      limit: 30,
    },
  });

  return data.tag;
}

export function SideNavFilter() {
  const { search } = useGallery();

  const [selectedTag, setSelectedTag] = useState<Tag | undefined>(undefined);
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  const { data: tags } = useQuery({
    queryKey: 'tags/search/' + query,
    queryFn: () => getTags(query),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  const handleSearch = () => {
    let tagId = '';

    if (selectedTag != undefined) {
      tagId = selectedTag.id;
    }

    search({ page: 1, tagId: tagId });
    setIsOpen(false);
  };

  const handleClear = () => {
    search({ page: 1, tagId: '' });
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="fixed top-2 right-2 inline-flex items-center peer justify-center rounded-md py-1 px-2 text-lucide-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lucide-300 hover:bg-lucide-800 group z-20">
        <SlidersHorizontal size={36} />
      </button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right" size={400}>
        <div className="relative bg-lucide-600 h-full w-full">
          <X onClick={toggleDrawer} size={20} className="absolute top-2 right-2 cursor-pointer" />

          <div className="pt-14"></div>

          <div className="flex flex-col px-16 gap-4 ">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-zinc-100 text-sm font-bold mb-2">Tag</h1>
              <div className="shadow-xl focus-within:ring-1 focus-within:ring-zinc-100 rounded-lg border border-zinc-100 w-full">
                <Combobox value={selectedTag} by={compareTag} onChange={setSelectedTag}>
                  <div className="flex items-center bg-lucide-800 px-1 rounded-lg w-full">
                    <Combobox.Input
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(tag: Tag) => tag?.name || ''}
                      className=" bg-lucide-800 p-2 w-full outline-none rounded-lg "
                      spellCheck="false"
                    />
                  </div>

                  <Combobox.Options className="max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-lucide-600">
                    {tags?.map((tag) => (
                      <Combobox.Option
                        key={tag.id}
                        value={tag}
                        className="ui-active:bg-gray-500 ui-active:text-zinc-50 ui-not-active:bg-lucide-300 ui-not-active:text-zinc-100 py-2 px-3 capitalize">
                        {tag.name.replaceAll('_', ' ')}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleSearch}
                className="inline-flex justify-center px-4 py-2 text-sm text-zinc-100 bg-violet-400 border border-transparent rounded-md hover:bg-violet-500 duration-300">
                Search
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex justify-center px-4 py-2 text-sm text-zinc-100 bg-gray-500 border border-transparent rounded-md hover:bg-gray-600 duration-300">
                Clear
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
