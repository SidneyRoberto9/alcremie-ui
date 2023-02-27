import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useContextSelector } from 'use-context-selector';

import { galleryContext } from '../context/useGallery';
import { LoadingSpinner } from './LoadingSpinner';
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

export function MasonryBox() {
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
