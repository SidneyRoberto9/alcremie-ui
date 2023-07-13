import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';

import { Image as Img, Box, useDisclosure } from '@chakra-ui/react';

import { imageToDtoWithTags } from '../../utils/converter-data';
import { getTagByIdList, getAllTags } from '../../server/query/tag.query';
import { getImageById } from '../../server/query/image.query';
import { TagBox } from '../../components/Preview/TagBox';
import { OptionsBox } from '../../components/Preview/OptionsBox';
import { EditModal } from '../../components/Preview/EditModal';
import { Content } from '../../components/Content';
import { Tag } from '../../@types/api/tag';
import { ImageDtoWithTags } from '../../@types/api/img';

interface PreviewProps {
  image: ImageDtoWithTags;
  tags: Tag[];
}

const GridTemplate = {
  base: `"img"
        "option"
        "tags"`,
  lg: `"option img"
      "tags img"
    `,
};

export default function Preview({ image, tags }: PreviewProps) {
  const [imgData, setImgData] = useState<ImageDtoWithTags>(image);

  const { isOpen: isEditorOpen, onOpen: onOpenEditor, onClose: onCloseEditor } = useDisclosure();

  return (
    <>
      <NextSeo title="Preview | Alcremie" />

      <EditModal
        isOpen={isEditorOpen}
        onClose={onCloseEditor}
        onChangeImageData={setImgData}
        image={imgData}
        tags={tags}
      />

      <Content display={'flex'} h={'auto'} alignItems={'center'} justifyContent={'center'}>
        <Box
          display={'grid'}
          gridTemplate={GridTemplate}
          gridTemplateColumns={{ base: '1fr', lg: '350px 1fr' }}
          gridTemplateRows={{
            base: 'auto',
            lg: '6.25rem auto auto auto',
          }}
          h={'100%'}>
          <Img
            w={'100%'}
            h={'100%'}
            display={'block'}
            padding={'1rem'}
            gridArea={'img'}
            alt={imgData.imageAssetId}
            src={imgData.imageUrl}
          />

          <OptionsBox
            gridArea={'option'}
            padding={'1.15rem 0'}
            name={imgData.imageAssetId}
            url={imgData.imageUrl}
            source={imgData.source}
            handleEdit={onOpenEditor}
            deleteHashImageId={imgData.imageAssetId}
          />

          <TagBox tags={imgData.tags} padding={'1rem 0'} gridArea={'tags'} />
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
  const tags = await getAllTags();

  return {
    props: {
      image: returnedImage,
      tags,
    },
  };
};
