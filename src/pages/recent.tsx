import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Tag } from '../@types/api/tag';
import {
  GalleryFetchDataResponse,
  GetGalleryDataParams,
} from '../@types/gallery';
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
  const {
    isLoading,
    contentTotalSize,
    pageSize,
    actualPage,
    onChangePage,
    onSetContent,
    setFilterParams,
  } = useContextSelector(
    galleryContext,
    ({
      contentTotalSize,
      isLoading,
      pageSize,
      actualPage,
      onChangePage,
      onSetContent,
      setFilterParams,
    }) => ({
      isLoading,
      contentTotalSize,
      pageSize,
      actualPage,
      onChangePage,
      onSetContent,
      setFilterParams,
    }),
  );

  const setTags = useContextSelector(tagsContext, ({ setTags }) => setTags);
  const router = useRouter();

  const params: GetGalleryDataParams = {
    all: String(router.query.all) === 'true' ? true : false,
    included_tags: String(router.query.included_tags),
    is_nsfw: String(router.query.is_nsfw) === 'true' ? true : false,
  };

  useEffect(() => {
    onSetContent(content);
    setTags(tags);
    setFilterParams(params);
  }, []);

  return (
    <>
      <NextSeo title="Recent | Alcremie" />

      <Content>
        <MasonryBox />
        <Pagination
          pageSize={pageSize}
          isLoading={isLoading}
          actualPage={actualPage}
          onChangePage={onChangePage}
          contentTotalSize={contentTotalSize}
        />
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
