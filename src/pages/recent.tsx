import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Tag } from '../@types/api/tag';
import { GalleryFetchDataResponse } from '../@types/gallery';
import { Content } from '../components/Content';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Pagination } from '../components/Recent/Pagination';
import { galleryContext } from '../context/useGallery';
import { tagsContext } from '../context/useTags';
import { getImagesResponseData } from '../server/query/image.query';
import { getAllTags } from '../server/query/tag.query';
import { queryForFilterImagesSchemaType } from './api/img/[page]';

interface RecentProps {
  content: GalleryFetchDataResponse;
  tags: Tag[];
}

export default function Recent({ content, tags }: RecentProps) {
  const setContent = useContextSelector(
    galleryContext,
    ({ setContent }) => setContent,
  );

  const setTags = useContextSelector(tagsContext, ({ setTags }) => setTags);

  useEffect(() => {
    setContent(content);
    setTags(tags);
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

  const tags = await getAllTags();

  return {
    props: { content: data, tags },
  };
};
