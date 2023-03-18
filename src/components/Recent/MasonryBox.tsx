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
  const { contentData, isLoading } = useContextSelector(
    galleryContext,
    ({ contentData, isLoading }) => ({
      contentData,
      isLoading,
    }),
  );

  if ((isLoading && data == null) || contentData == undefined) {
    return <LoadingSpinner />;
  }

  if (
    contentData.content?.length == 0 ||
    (contentData.content == null && data?.length == 0)
  ) {
    return <NoContentScreen />;
  }

  return (
    <ResponsiveMasonry columnsCountBreakPoints={Breakpoints}>
      <Masonry>
        {data == null
          ? contentData.content?.map(({ imgurUrl, id }) => (
              <MasonryItem url={imgurUrl} key={id} id={id} />
            ))
          : data.map(({ imgurUrl, id }) => (
              <MasonryItem url={imgurUrl} key={id} id={id} />
            ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
