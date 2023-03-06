import { Box, Flex } from '@chakra-ui/react';
import { SmileyXEyes } from 'phosphor-react';

import { TextTitle } from '../TextTitle';

export function NoContentScreen() {
  return (
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
        <SmileyXEyes size={300} />
        <TextTitle>No Result Found</TextTitle>
      </Flex>
    </Box>
  );
}