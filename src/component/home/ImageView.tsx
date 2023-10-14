'use client';
import { PhotoView } from 'react-photo-view';
import Image from 'next/image';

import { Image as IMG } from '@/@Types/Image';

interface ImageViewProps {
  image: IMG;
}

export function ImageView({ image }: ImageViewProps) {
  return (
    <PhotoView key={image.id} src={image.url || ''}>
      <Image
        key={image.id}
        src={image.url}
        width={1920}
        height={1080}
        alt="api"
        className="max-w-full w-full h-full object-cover rounded-lg cursor-pointer shadow-md"
      />
    </PhotoView>
  );
}
