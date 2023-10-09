import { create } from 'zustand';

import { Status, Image } from '@/@Types/Image';

interface HomeProps {
  image: Image;
  statistics: Status;
  setImage: (image: Image) => void;
  setStatistics: (statistics: Status) => void;
}

export const useHome = create<HomeProps>((set) => ({
  image: {} as Image,
  statistics: {} as Status,
  setImage: (image: Image) => set({ image }),
  setStatistics: (statistics: Status) => set({ statistics }),
}));
