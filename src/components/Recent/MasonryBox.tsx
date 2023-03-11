import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useContextSelector } from 'use-context-selector';

import { ImageDto } from '../../@types/api/img';
import { galleryContext } from '../../context/useGallery';
import { LoadingSpinner } from '../LoadingSpinner';
import { NoContentScreen } from '../Screens/NoContentScreen';
import { MasonryItem } from './MasonryItem';

const Breakpoints = {
  760: 2,
  900: 3,
  1366: 4,
  1440: 5,
  1920: 6,
  2144: 7,
};

interface MasonryBoxProps {
  data?: ImageDto[] | null;
}

export function MasonryBox({ data = null }: MasonryBoxProps) {
  const { content, isLoading } = useContextSelector(
    galleryContext,
    ({ content, isLoading }) => ({
      content,
      isLoading,
    }),
  );

  if (isLoading && data == null) {
    return <LoadingSpinner />;
  }

  if (content?.length == 0 || (content == null && data?.length == 0)) {
    return <NoContentScreen />;
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={Breakpoints}>
      <Masonry>
        {data == null
          ? content?.map(({ imgurUrl, id }) => (
              <MasonryItem url={imgurUrl} key={id} id={id} />
            ))
          : data.map(({ imgurUrl, id }) => (
              <MasonryItem url={imgurUrl} key={id} id={id} />
            ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
