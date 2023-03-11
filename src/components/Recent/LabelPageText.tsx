import { Text } from '@chakra-ui/react';

interface LabelPageTextProps {
  label: string;
}

export function LabelPageText({ label }: LabelPageTextProps) {
  return (
    <Text
      display={'inline-block'}
      padding={'0.375rem 0.75rem'}
      fontSize={'1.25rem'}
      color={'white.900'}
      lineHeight={'1.5'}
      userSelect={'none'}
      pointerEvents={'none'}
      minWidth={'3.5rem'}
      width={'3.5rem'}
    >
      {label}
    </Text>
  );
}
