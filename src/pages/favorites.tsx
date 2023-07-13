import { NextSeo } from 'next-seo';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import { getUserFavoritesImages } from '../server/query/image.query';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { Content } from '../components/Content';
import { ImageDto } from '../@types/api/img';

interface FavoritesProps {
  images: ImageDto[];
}

export default function Favorites({ images }: FavoritesProps) {
  return (
    <>
      <NextSeo title="Favorites | Alcremie" />

      <Content>
        <MasonryBox data={images} />
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (session.user.isAdmin === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const images = await getUserFavoritesImages(session.user.id);

  return {
    props: {
      images,
    },
  };
};
