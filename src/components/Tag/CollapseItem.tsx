import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CollapseItemProps {
  title: string;
  children: ReactNode;
}

export function CollapseItem({ title, children }: CollapseItemProps) {
  return (
    <AccordionItem>
      <h1>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" textTransform={'uppercase'}>
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel p={4}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={'2'}
          maxW={'80%'}
          margin={'0 auto'}
        >
          {children}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}
