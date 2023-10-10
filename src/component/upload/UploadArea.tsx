'use client';
import { ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

import { useUpload } from '@/store/upload';

export function UploadArea() {
  const { setImagesToUpload } = useUpload();

  const handleChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { files } = e.target;
    const selectedFiles = Array.from(files as FileList);

    setImagesToUpload(selectedFiles);
  };

  const handleOnDropFile = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const lista = Array.from(e.dataTransfer.items);
    const fileList: File[] = [];

    lista.forEach((a) => {
      fileList.push(a.getAsFile() as File);
    });

    setImagesToUpload(fileList);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <div className="md:p-16 p-4">
      <label
        onDragOver={handleDragOver}
        onDrop={handleOnDropFile}
        htmlFor="image"
        className="w-full rounded-md border-2 flex flex-col items-center justify-center gap-0.5 py-6 select-none cursor-pointer bg-lucide-800 border-lucide-800">
        <Upload size={20} className="m-2 text-zinc-50" />
        <span className="text-zinc-5 text-md">Drop Images here</span>
        <span className="text-zinc-400 text-xs ">Accept only images</span>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleChangeFileInput}
        />
      </label>
    </div>
  );
}
