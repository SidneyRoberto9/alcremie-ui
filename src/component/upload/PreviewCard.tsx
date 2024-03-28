'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

import { useUpload } from '@/context/useUpload';

interface PreviewCardProps {
  file: File;
}

export function PreviewCard({ file }: PreviewCardProps) {
  const { remove } = useUpload();

  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="max-h-[420px] bg-lucide-800 p-1.5 border-b border-4 border-lucide-600 rounded-lg relative">
      <Image
        src={fileUrl}
        alt={file.name}
        width={1920}
        height={1080}
        className="h-full  w-96 object-cover rounded-lg user-select-none select-none"
      />
      <X
        size={18}
        onClick={() => remove(file)}
        className="cursor-pointer absolute right-2 top-2 text-lucide-800"
      />
    </div>
  );
}
