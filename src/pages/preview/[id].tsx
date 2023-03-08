import { Box, Flex, Image } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import { ImageDto } from '../../@types/api/img';
import { Content } from '../../components/Content';
import { TagButton } from '../../components/TagButton';
import { getImageById } from '../../server/query/image.query';
import { getTagByIdList } from '../../server/query/tag.query';
import { imageToDto } from '../../utils/converter-data';

interface PreviewProps {
  image: ImageDto;
}

export default function Preview({ image }: PreviewProps) {
  console.log(image);
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
          gap={'1'}
        >
          <Image
            padding={'1rem 0'}
            display={'block'}
            width={'auto'}
            src={image.imgurUrl}
            gridArea={'img'}
          />

          <Box padding={'1rem 0'} gridArea={'tags'}>
            <Flex
              justifyContent={'flex-start'}
              direction={'column'}
              alignSelf={'flex-start'}
            >
              <Flex>
                {image.tags.map(({ id, name, description }) => (
                  <TagButton key={id} tag={name} tooltipLabel={description} />
                ))}
              </Flex>
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

  const { ImageTag, ...image } = ImgData;
  const tagIdList = ImageTag.map((tag) => tag.tagId);
  const tags = await getTagByIdList(tagIdList);
  const returnedImage = imageToDto(image, tags);

  return {
    props: {
      image: returnedImage,
    },
  };
};
