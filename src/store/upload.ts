import { create } from 'zustand';

import { api } from '@/lib/axios';

interface UploadProps {
  imagesToUpload: File[];
  isLoading: boolean;
  upload: () => Promise<void>;
  removeFromIndex: (index: number) => void;
  setImagesToUpload: (imagesToUpload: File[]) => void;
}

export const useUpload = create<UploadProps>((set, get) => ({
  imagesToUpload: [],
  isLoading: false,
  setImagesToUpload: (imagesToUpload: File[]) => {
    const list = new Set([...get().imagesToUpload, ...imagesToUpload]);
    set({ imagesToUpload: Array.from(list) });
  },
  removeFromIndex: (index: number) => {
    if (get().isLoading) return;
    const list = [...get().imagesToUpload];
    list.splice(index, 1);
    set({ imagesToUpload: list });
  },
  upload: async () => {
    set({ isLoading: true });
    const files = get().imagesToUpload;
    const formData = new FormData();

    files.forEach((file) => formData.append('image', file));

    await api.post('/upload', formData);

    set({ imagesToUpload: [] });
    set({ isLoading: false });
  },
}));
