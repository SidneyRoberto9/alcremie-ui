import { Text, TextProps } from '@chakra-ui/react';

interface LabelPageTextProps extends TextProps {
  label: string;
}

export function LabelPageText({ label, ...rest }: LabelPageTextProps) {
  return (
    <Text
      display={'inline-block'}
      padding={'0.3rem 0.75rem'}
      fontSize={'1rem'}
      color={'white.900'}
      lineHeight={'1.5'}
      userSelect={'none'}
      textAlign={'center'}
      cursor={'pointer'}
      w={'100%'}
      maxW={'10rem'}
      minW={'3.125rem'}
      {...rest}
    >
      {label}
    </Text>
  );
}
