import { Box, CircularProgress } from '@chakra-ui/react';

export function LoadingSpinner() {
  return (
    <Box
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      transform={'translate(-50%, -50%)'}
    >
      <CircularProgress isIndeterminate color={'green.300'} size={150} />
    </Box>
  );
}
