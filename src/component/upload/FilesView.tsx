'use client';

import { X } from 'lucide-react';

import { useUpload } from '@/context/useUpload';

export function FilesView() {
  const { imagesToUpload, removeFromIndex } = useUpload();

  return (
    <div className="md:px-16 py-4">
      <div className="bg-lucide-800 rounded-md">
        {imagesToUpload.map((file, index) => (
          <div
            key={file.name}
            className="flex items-center justify-between px-2 py-3 border-b border-4 border-lucide-600 rounded-lg">
            <span className="text-zinc-50 text-sm line-clamp-1 leading-4">{file.name}</span>
            <X size={18} onClick={() => removeFromIndex(index)} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
}
