'use client';
import { PhotoView } from 'react-photo-view';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Image as IMG } from '@/@Types/Image';

interface ImageViewProps {
  id: string;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ImageView({
  id,
  url,
  className = '',
  width = 1920,
  height = 1080,
  priority = false,
}: ImageViewProps) {
  return (
    <PhotoView key={id} src={url || ''}>
      <Image
        key={id}
        src={url}
        width={width}
        height={height}
        priority={priority}
        alt={id}
        className={cn(
          'max-w-full w-full h-full object-cover rounded-lg cursor-pointer shadow-md',
          className,
        )}
      />
    </PhotoView>
  );
}
