import { create } from 'zustand';

import { Status, Anime } from '@/@Types/Anime';

interface HomeProps {
  anime: Anime;
  statistics: Status;
  setAnime: (anime: Anime) => void;
  setStatistics: (statistics: Status) => void;
}

export const useHome = create<HomeProps>((set) => ({
  anime: {} as Anime,
  statistics: {} as Status,
  setAnime: (anime: Anime) => set({ anime }),
  setStatistics: (statistics: Status) => set({ statistics }),
}));
