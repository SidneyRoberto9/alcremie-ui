'use client';

import { CheckCircle } from 'lucide-react';

import { useHome } from '@/store/home';

export function RandomImage() {
  const { anime } = useHome();

  return (
    <div className="min-w-[300px] w-full h-full flex flex-col items-center transition-all duration-200 ease-in-out hover:scale-105">
      <img
        key={anime.id}
        src={anime.url}
        alt="api"
        className="max-w-full w-full h-full object-cover rounded-lg cursor-pointer shadow-md"
      />

      <span className="flex items-center p-1 gap-1 text-emerald-400">
        <CheckCircle size={20} />
        <p className="text-zinc-100"> The API is currently online</p>
      </span>
    </div>
  );
}
