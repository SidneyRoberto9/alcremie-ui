'use client';
import Masonry from 'react-layout-masonry';
import Image from 'next/image';

import { useRecent } from '@/store/recent';

export function RecentMasonry() {
  const { images } = useRecent();

  const Breakpoints = {
    760: 2,
    900: 3,
    1366: 4,
    1440: 5,
    1920: 6,
    2144: 7,
  };
  return (
    <div className="mt-10 w-full">
      <Masonry columns={Breakpoints}>
        {images.map((item) => (
          <div className="cursor-pointer">
            <Image
              key={item.id}
              src={item.url}
              alt={item.id}
              width={500}
              height={500}
              className="w-full h-full object-cover block"
              priority={true}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
