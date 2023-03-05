import { Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { ImageProps } from '../../@types/api/img';
import { Content } from '../../components/Content';
import { getImageById } from '../../server/query/image-query';

interface PreviewProps {
  image: ImageProps;
}

export default function Preview({ image }: PreviewProps) {
  return (
    <>
      <NextSeo title="Preview | Alcremie" />

      <Content display={'flex'} justifyContent={'center'} h={'auto'}>
        <Image display={'block'} width={'40rem'} src={image.imgurUrl} />
      </Content>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const image = await getImageById(String(params.id));

  if (!image) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const returnedImage: ImageProps = {
    id: image.id,
    imgurUrl: image.imgurUrl,
    imgurDeleteHash: image.imgurDeleteHash,
    imgurId: image.imgurId,
    isNsfw: image.isNsfw,
    source: image.source,
  };

  return {
    props: {
      image: returnedImage,
    },
  };
};
