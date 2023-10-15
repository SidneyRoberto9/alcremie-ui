import { ImageView } from '@/component/ImageView';
import { Tag } from '@/@Types/Tag';

interface CardProps {
  url: string;
  id: string;
  tag: Tag[];
}

export function Card({ url, id, tag }: CardProps) {
  const tags = tag.map((item) => `#${item.name} `);
  return (
    <article className="max-w-xl w-full h-full rounded-lg overflow-hidden">
      <div className="flex flex-col bg-lucide-800 p-2">
        <ImageView
          id={id}
          url={url}
          width={1000}
          height={1000}
          className="block shadow-none"
          priority
        />
        <div className="flex flex-col gap-2 pt-2 ">
          <div className="flex flex-wrap gap-2 sm:text-sm text-xs text-zinc-400/80 select-none">
            {tags}
          </div>
        </div>
      </div>
    </article>
  );
}
