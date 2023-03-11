import { Box, Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { ImageDtoWithTags } from '../../@types/api/img';
import { Content } from '../../components/Content';
import { OptionsBox } from '../../components/Preview/OptionsBox';
import { TagBox } from '../../components/Preview/TagBox';
import { getImageById } from '../../server/query/image.query';
import { getTagByIdList } from '../../server/query/tag.query';
import { imageToDtoWithTags } from '../../utils/converter-data';

interface PreviewProps {
  image: ImageDtoWithTags;
}

const GridTemplate = {
  base: `"img img"
        "tags option"`,
  lg: `"option img"
      "tags img"
    `,
};

export default function Preview({ image }: PreviewProps) {
  return (
    <>
      <NextSeo title="Preview | Alcremie" />

      <Content
        display={'flex'}
        h={'auto'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          display={'grid'}
          gridTemplate={GridTemplate}
          gridTemplateColumns={{ base: '1fr', lg: '350px 1fr' }}
          gridTemplateRows={{
            base: 'auto',
            lg: '4.5rem auto auto auto',
          }}
          h={'100%'}
        >
          <Image
            padding={'1rem'}
            display={'block'}
            width={'auto'}
            src={image.imgurUrl}
            gridArea={'img'}
          />

          <OptionsBox
            name={image.imgurId}
            url={image.imgurUrl}
            padding={'1.15rem 0'}
            gridArea={'option'}
          />

          <TagBox tags={image.tags} padding={'1rem 0'} gridArea={'tags'} />
        </Box>
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

  const ImgData = await getImageById(String(params.id));

  if (!ImgData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const tagsData = await getTagByIdList(ImgData.tags);
  const returnedImage = imageToDtoWithTags(ImgData, tagsData);

  return {
    props: {
      image: returnedImage,
    },
  };
};
