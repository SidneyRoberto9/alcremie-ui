'use client';
import Masonry from 'react-layout-masonry';
import Image from 'next/image';

import { heroRandomImages } from '@/util/hero-home-images';

export function HeroMasonry() {
  const breakPoints = {
    400: 2,
    700: 4,
    800: 5,
    1100: 6,
  };

  return (
    <div className="-mt-80 w-full">
      <Masonry columns={breakPoints}>
        {heroRandomImages.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="home image"
            width={500}
            height={500}
            className="w-full h-full object-cover block"
            priority={true}
          />
        ))}
      </Masonry>
    </div>
  );
}
