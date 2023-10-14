'use client';

import { ReactNode, useState, useContext, createContext } from 'react';

import { api } from '@/lib/axios';

interface UploadContextProps {
  imagesToUpload: File[];
  isLoading: boolean;
  upload: () => Promise<void>;
  removeFromIndex: (index: number) => void;
  setImages: (imagesToUpload: File[]) => void;
}

interface UploadContextProviderProps {
  children: ReactNode;
}

const initialContext: UploadContextProps = {
  imagesToUpload: [],
  isLoading: false,
  upload: () => Promise.resolve(),
  removeFromIndex: () => {},
  setImages: () => {},
};

const UploadContext = createContext<UploadContextProps>(initialContext);

export function UploadContextProvider({ children }: UploadContextProviderProps) {
  const [imagesToUpload, setImagesToUpload] = useState<File[]>(initialContext.imagesToUpload);
  const [isLoading, setIsLoading] = useState<boolean>(initialContext.isLoading);

  function setImages(images: File[]) {
    const list = new Set([...imagesToUpload, ...images]);
    setImagesToUpload(Array.from(list));
  }

  function removeFromIndex(index: number) {
    if (isLoading) {
      return;
    }

    const list = imagesToUpload;
    list.splice(index, 1);

    setImagesToUpload(list);
  }

  async function upload() {
    setIsLoading(true);

    const formData = new FormData();

    imagesToUpload.forEach((image) => formData.append('images', image));

    await api.post('/upload', formData);

    setImagesToUpload([]);
    setIsLoading(false);
  }

  return (
    <UploadContext.Provider
      value={{
        imagesToUpload,
        isLoading,
        upload,
        removeFromIndex,
        setImages,
      }}>
      {children}
    </UploadContext.Provider>
  );
}

export const useUpload = () => useContext(UploadContext);
