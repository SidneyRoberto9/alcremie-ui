import { Box, CircularProgress } from '@chakra-ui/react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (isLoading) {
    return (
      <Box
        position={'fixed'}
        zIndex={1050}
        w={'100vw'}
        h={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'gray.900'}
      >
        <CircularProgress isIndeterminate color={'green.300'} size={150} />
      </Box>
    );
  }

  return null;
}
