import { useContextSelector } from 'use-context-selector';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';

import { getAllTags } from '../server/query/tag.query';
import { tagsContext } from '../context/useTags';
import { galleryContext } from '../context/useGallery';
import { Pagination } from '../components/Recent/Pagination';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Content } from '../components/Content';
import { GetGalleryDataParams } from '../@types/gallery';
import { Tag } from '../@types/api/tag';

interface RecentProps {
  tags: Tag[];
}

export default function Recent({ tags }: RecentProps) {
  const filterData = useContextSelector(galleryContext, ({ filterData }) => filterData);

  const setTags = useContextSelector(tagsContext, ({ setTags }) => setTags);
  const router = useRouter();

  const params: GetGalleryDataParams = {
    all: String(router.query.all) === 'true' ? true : false,
    included_tags: String(router.query.include_tags),
    is_nsfw: String(router.query.is_nsfw) === 'true' ? true : false,
  };

  useEffect(() => {
    filterData(0, params);
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
  const tags = await getAllTags();

  return {
    props: { tags },
  };
};
