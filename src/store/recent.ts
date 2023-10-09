import { create } from 'zustand';

import { ImageFilter, Image } from '@/@Types/Image';

interface RecentProps {
  images: Image[];
  filter: ImageFilter;
  hasNext: boolean;
  totalPage: number;
  setImages: (images: Image[]) => void;
  setFilter: (filter: ImageFilter) => void;
  setHasNext: (hasNext: boolean) => void;
  setTotalPage: (totalPage: number) => void;
}

export const useRecent = create<RecentProps>((set) => ({
  images: [],
  filter: {
    tagId: '',
    nsfw: false,
    page: 1,
  },
  hasNext: false,
  totalPage: 1,
  setImages: (images) => set({ images }),
  setFilter: (filter) => set({ filter }),
  setHasNext: (hasNext) => set({ hasNext }),
  setTotalPage: (totalPage) => set({ totalPage }),
}));
