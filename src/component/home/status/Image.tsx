import { CheckCircle } from 'lucide-react';

import { ImageView } from '@/component/ImageView';
import { Image } from '@/@Types/Image';

interface ImageProps {
  data: Image;
}

export function Image({ data }: ImageProps) {
  return (
    <div className="h-[70vh] my-10 mx-2">
      <div className="min-w-[300px] w-full h-full flex flex-col items-center transition-all duration-200 ease-in-out hover:scale-105">
        <ImageView id={data.id} url={data.url} />

        <span className="flex items-center p-1 gap-1 text-emerald-400">
          <CheckCircle size={20} />
          <p className="text-zinc-100"> The API is currently online</p>
        </span>
      </div>
    </div>
  );
}
