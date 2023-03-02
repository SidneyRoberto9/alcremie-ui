import { Flex, Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ImageProps } from '../../@types/api/img';
import { getImageById } from '../../utils/image-query';

interface PreviewProps {
  image: ImageProps;
}

export default function Preview({ image }: PreviewProps) {
  return (
    <>
      <Head>
        <title>Preview | Alcremie</title>
        <meta name="description" content="Image Preview" />
      </Head>

      <Flex
        paddingTop={'3.75rem'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image display={'block'} width={'40rem'} src={image.imgurUrl}></Image>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const image = await getImageById(String(context.params.id));

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
