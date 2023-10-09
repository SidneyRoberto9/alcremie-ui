'use client';

import { Eczar } from 'next/font/google';

import { HeroMasonry } from '@/components/home/HeroMasonry';

const eczar = Eczar({ subsets: ['latin'], weight: ['400', '700'] });

export function Hero() {
  return (
    <div className="mt-16 relative w-full h-[95vh] overflow-hidden">
      <div className="absolute bg-lucide-800/80 top-0 left-0 w-screen h-screen"></div>
      <div className="absolute mt-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-zinc-200 text-center">
          <div className={eczar.className}>
            <h1 className="text-violet-300 font-bold sm:text-9xl text-5xl uppercase">Alcremie</h1>
          </div>

          <div className="flex flex-col gap-4 h-full w-full">
            <div className="max-w-[685px] w-full text-center my-4 sm:text-5xl text-xl">
              <p>The Api for your Anime and Waifu images</p>
            </div>
          </div>
        </div>
      </div>

      <HeroMasonry />
    </div>
  );
}
