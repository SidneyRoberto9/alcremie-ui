import { create } from 'zustand';

import { ImageFilter, Image } from '@/@Types/Image';

interface NSFWProps {
  images: Image[];
  filter: ImageFilter;
  hasNext: boolean;
  totalPage: number;
  setImages: (images: Image[]) => void;
  setFilter: (filter: ImageFilter) => void;
  setHasNext: (hasNext: boolean) => void;
  setTotalPage: (totalPage: number) => void;
}

export const useNSFW = create<NSFWProps>((set) => ({
  images: [],
  filter: {
    tagId: '',
    page: 1,
  },
  hasNext: false,
  totalPage: 1,
  setImages: (images) => set({ images }),
  setFilter: (filter) => set({ filter }),
  setHasNext: (hasNext) => set({ hasNext }),
  setTotalPage: (totalPage) => set({ totalPage }),
}));
