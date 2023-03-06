import { Box, Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { Barricade } from 'phosphor-react';

import { Content } from '../components/Content';
import { TextTitle } from '../components/TextTitle';

export default function Docs() {
  return (
    <>
      <NextSeo title="Docs | Alcremie" />

      <Content>
        <Box
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          bg={'gray.850'}
          borderRadius={'1rem'}
        >
          <Flex
            align={'center'}
            justify={'center'}
            flexDirection={'column'}
            padding={'3rem 5rem'}
          >
            <Barricade size={300} />
            <TextTitle>In Progress...</TextTitle>
          </Flex>
        </Box>
      </Content>
    </>
  );
}
