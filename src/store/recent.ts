import { create } from 'zustand';

import { Image } from '@/@Types/Image';

interface RecentProps {
  images: Image[];
  page: number;
  hasNext: boolean;
  totalPage: number;
  setImages: (images: Image[]) => void;
  setPage: (page: number) => void;
  setHasNext: (hasNext: boolean) => void;
  setTotalPage: (totalPage: number) => void;
}

export const useRecent = create<RecentProps>((set) => ({
  images: [],
  page: 1,
  hasNext: false,
  totalPage: 1,
  setImages: (images) => set({ images }),
  setPage: (page) => set({ page }),
  setHasNext: (hasNext) => set({ hasNext }),
  setTotalPage: (totalPage) => set({ totalPage }),
}));
