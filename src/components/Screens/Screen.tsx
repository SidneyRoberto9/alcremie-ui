import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { TextTitle } from '../TextTitle';

interface ScreenProps extends FlexProps {
  icon: ReactNode;
  title: string;
}

export function Screen({ icon, title, ...rest }: ScreenProps) {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      flexDirection={'column'}
      padding={'3rem 5rem'}
      {...rest}
    >
      {icon}
      <TextTitle textAlign={'center'}>{title}</TextTitle>
    </Flex>
  );
}
