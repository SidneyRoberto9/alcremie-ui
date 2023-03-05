import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContentProps extends BoxProps {
  children: ReactNode;
}

export function Content({ children, ...rest }: ContentProps) {
  return (
    <Box paddingTop={'3.75rem'} h={'100vh'} {...rest}>
      {children}
    </Box>
  );
}
