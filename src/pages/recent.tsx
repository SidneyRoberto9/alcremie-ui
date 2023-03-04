import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { GalleryFetchDataResponse } from '../@types/gallery';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Pagination } from '../components/Recent/Pagination';
import { galleryContext } from '../context/useGallery';
import { getImagesResponseData } from '../utils/image-query';
import { queryForFilterImagesSchemaType } from './api/img/[page]';

interface RecentProps {
  content: GalleryFetchDataResponse;
}

export default function Recent({ content }: RecentProps) {
  const setContent = useContextSelector(
    galleryContext,
    ({ setContent }) => setContent,
  );

  useEffect(() => {
    setContent(content);
  }, []);

  return (
    <>
      <NextSeo title="Recent | Alcremie" />

      <Box paddingTop={'3.75rem'}>
        <MasonryBox />
        <Pagination />
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, all, pageSize, is_nsfw, include_tags } = context.query;

  const parameters: queryForFilterImagesSchemaType = {
    page: Number(page) || 0,
    all: Boolean(all) || false,
    pageSize: Number(pageSize) || 25,
    is_nsfw: Boolean(is_nsfw) || false,
    included_tags: String(include_tags) || '',
  };

  const data = await getImagesResponseData(parameters);

  return {
    props: { content: data },
  };
};
