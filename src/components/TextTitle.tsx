import { Heading, HeadingProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TextTitleProps extends HeadingProps {
  children: ReactNode;
}

export function TextTitle({ children, ...rest }: TextTitleProps) {
  return (
    <Heading
      fontSize={'1.75rem'}
      fontWeight={'bold'}
      color={'gray.300'}
      {...rest}
    >
      {children}
    </Heading>
  );
}
