import { ReactNode } from 'react';

import { BoxProps, Box } from '@chakra-ui/react';

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
