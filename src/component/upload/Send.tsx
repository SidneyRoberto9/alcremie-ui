'use client';

import { RefreshCcw } from 'lucide-react';

import { useUpload } from '@/store/upload';

export function Send() {
  const { upload, imagesToUpload, isLoading } = useUpload();

  return (
    <>
      {imagesToUpload.length > 0 && (
        <div className="my-4 w-full flex items-center justify-center">
          <button
            onClick={upload}
            className="w-32 px-4 py-2 disabled:brightness-75 disabled:hover:bg-violet-400
        disabled:cursor-not-allowed bg-violet-400 hover:bg-violet-500 transition-all duration-200 ease-in-out cursor-pointer text-zinc-50 text-xl rounded-lg flex items-center justify-center gap-1"
            disabled={imagesToUpload.length === 0 || isLoading}>
            {isLoading ? <RefreshCcw size={22} className="animate-spin" /> : 'Send'}
          </button>
        </div>
      )}
    </>
  );
}
