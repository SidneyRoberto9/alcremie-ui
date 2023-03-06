import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { ImageDto } from '../@types/api/img';
import { Content } from '../components/Content';
import { MasonryBox } from '../components/Recent/MasonryBox';
import { getUserFavoritesImages } from '../server/query/image.query';

interface FavoritesProps {
  images: Omit<ImageDto, 'tags'>[];
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
