import { useContextSelector } from 'use-context-selector';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { galleryContext } from '../context/useGallery';
import { Pagination } from '../components/Recent/Pagination';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Content } from '../components/Content';
import { GetGalleryDataParams } from '../@types/gallery';

export default function Recent() {
  const filterData = useContextSelector(galleryContext, ({ filterData }) => filterData);

  const router = useRouter();

  const params: GetGalleryDataParams = {
    all: String(router.query.all) === 'true' ? true : false,
    included_tags: String(router.query.include_tags),
    is_nsfw: String(router.query.is_nsfw) === 'true' ? true : false,
  };

  useEffect(() => {
    filterData(0, params);
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
