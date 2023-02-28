import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { GalleryFetchDataResponse } from '../@types/gallery';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Pagination } from '../components/Recent/Pagination';
import { galleryContext } from '../context/useGallery';
import { api } from '../server/api';

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
      <Head>
        <title>Recent | Alcremie</title>
        <meta name="description" content="Image Data View" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box paddingTop={'3.75rem'}>
        <MasonryBox />
        <Pagination />
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<GalleryFetchDataResponse>(`/img/0?all=true`);

  return {
    props: { content: data },
  };
};
