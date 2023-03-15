import { Text } from '@chakra-ui/react';

interface LabelPageTextProps {
  label: string;
}

export function LabelPageText({ label }: LabelPageTextProps) {
  return (
    <Text
      display={'inline-block'}
      padding={'0.3rem 0.75rem'}
      fontSize={'1rem'}
      color={'white.900'}
      lineHeight={'1.5'}
      userSelect={'none'}
      pointerEvents={'none'}
      textAlign={'center'}
      w={'3.125rem'}
      maxW={'3.125rem'}
      minW={'3.125rem'}
    >
      {label}
    </Text>
  );
}
