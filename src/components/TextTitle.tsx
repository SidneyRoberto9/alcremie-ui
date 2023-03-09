import { Heading, HeadingProps, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TextTitleProps extends HeadingProps {
  children: ReactNode;
}

export function TextTitle({ children, ...rest }: TextTitleProps) {
  const [isLessThan800] = useMediaQuery('(max-width: 800px)');

  return (
    <Heading
      fontSize={isLessThan800 ? '1.5rem' : '1.75rem'}
      fontWeight={'bold'}
      color={'gray.300'}
      {...rest}
    >
      {children}
    </Heading>
  );
}
