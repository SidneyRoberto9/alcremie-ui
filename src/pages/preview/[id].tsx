import { Box, Flex, Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { ImageDtoWithTags } from '../../@types/api/img';
import { Content } from '../../components/Content';
import { TagButton } from '../../components/TagButton';
import { getImageById } from '../../server/query/image.query';
import { getTagByIdList } from '../../server/query/tag.query';
import { imageToDtoWithTags } from '../../utils/converter-data';

interface PreviewProps {
  image: ImageDtoWithTags;
}

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
          gridTemplate={{
            base: `"img"
                  "tags"`,
            lg: `"tags img"`,
          }}
          gridTemplateColumns={{ base: '1fr', lg: '350px 1fr' }}
          h={'100%'}
        >
          <Image
            padding={'1rem'}
            display={'block'}
            width={'auto'}
            src={image.imgurUrl}
            gridArea={'img'}
          />

          <Box padding={'1rem 0'} gridArea={'tags'}>
            <Flex
              justifyContent={'flex-start'}
              direction={'column'}
              alignItems={'flex-start'}
            >
              <Box p={'0 1rem'}>
                {image.tags.map(({ id, name, description }) => (
                  <TagButton
                    key={id}
                    tag={name}
                    tooltipLabel={description}
                    m={'0.25rem'}
                  />
                ))}
              </Box>
            </Flex>
          </Box>
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

  const { tags, ...image } = ImgData;

  const tagsData = await getTagByIdList(tags);
  const returnedImage = imageToDtoWithTags(ImgData, tagsData);

  return {
    props: {
      image: returnedImage,
    },
  };
};
