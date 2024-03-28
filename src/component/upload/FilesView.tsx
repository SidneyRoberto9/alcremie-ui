'use client';

import { PreviewCard } from '@/component/upload/PreviewCard';
import { useUpload } from '@/context/useUpload';

export function FilesView() {
  const { imagesToUpload } = useUpload();

  return (
    <div className="md:px-16 py-4">
      <div className="rounded-md">
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {imagesToUpload.map((file, index) => (
            <PreviewCard key={file.name} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
