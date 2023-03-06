import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useContextSelector } from 'use-context-selector';

import { ImageDto } from '../../@types/api/img';
import { galleryContext } from '../../context/useGallery';
import { LoadingSpinner } from '../LoadingSpinner';
import { MasonryItem } from './MasonryItem';

const Breakpoints = {
  380: 1,
  760: 2,
  900: 3,
  1366: 4,
  1440: 5,
  1920: 6,
  2144: 7,
};

interface MasonryBoxProps {
  data?: Omit<ImageDto, 'tags'>[] | null;
}

export function MasonryBox({ data = null }: MasonryBoxProps) {
  if (data == null) {
    const { content, isLoading } = useContextSelector(
      galleryContext,
      ({ content, isLoading }) => ({
        content,
        isLoading,
      }),
    );

    if (content == null || isLoading) {
      return <LoadingSpinner />;
    }

    return (
      <ResponsiveMasonry columnsCountBreakPoints={Breakpoints}>
        <Masonry>
          {content.map(({ imgurUrl, id }) => (
            <MasonryItem url={imgurUrl} key={id} id={id} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  }

  if (data == null) {
    return <LoadingSpinner />;
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={Breakpoints}>
      <Masonry>
        {data.map(({ imgurUrl, id }) => (
          <MasonryItem url={imgurUrl} key={id} id={id} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
