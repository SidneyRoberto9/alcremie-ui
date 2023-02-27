import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { GalleryFetchDataResponse } from '../@types/gallery';
import { Pagination } from '../components/Pagination';
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
        <title>Recent</title>
      </Head>

      <Box paddingTop={'3.75rem'}>
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
