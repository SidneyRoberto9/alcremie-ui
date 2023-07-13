import { ReactNode } from 'react';

import { BoxProps, Box } from '@chakra-ui/react';

interface AbsoluteProps extends BoxProps {
  children: ReactNode;
}

export function Absolute({ children, ...rest }: AbsoluteProps) {
  return (
    <Box
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      transform={'translate(-50%, -50%)'}
      bg={'gray.850'}
      borderRadius={'1rem'}
      {...rest}>
      {children}
    </Box>
  );
}
