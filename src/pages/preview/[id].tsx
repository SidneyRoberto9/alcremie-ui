import { Flex, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContextSelector } from 'use-context-selector';

import { galleryContext } from '../../context/useGallery';

export default function Preview() {
  const router = useRouter();
  const { id } = router.query;

  const content = useContextSelector(galleryContext, ({ content }) => content);
  const image = content?.find((image) => image.id === String(id));

  return (
    <Flex
      paddingTop={'3.75rem'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image display={'block'} width={'40rem'} src={image?.imgurUrl}></Image>
    </Flex>
  );
}
