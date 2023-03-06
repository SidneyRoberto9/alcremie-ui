import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { GalleryFetchDataResponse } from '../@types/gallery';
import { Content } from '../components/Content';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Pagination } from '../components/Recent/Pagination';
import { galleryContext } from '../context/useGallery';
import { getImagesResponseData } from '../server/query/image.query';
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

      <Content>
        <MasonryBox />
        <Pagination />
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, all, pageSize, is_nsfw, include_tags } = context.query;

  const parameters: queryForFilterImagesSchemaType = {
    page: Number(page) || 0,
    all: String(all) === 'true' ? true : false || false,
    pageSize: Number(pageSize) || 25,
    is_nsfw: String(is_nsfw) === 'true' ? true : false || false,
    included_tags: String(include_tags) || '',
  };

  const data = await getImagesResponseData(parameters);

  return {
    props: { content: data },
  };
};
