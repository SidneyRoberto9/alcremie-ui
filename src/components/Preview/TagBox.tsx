import { Box, BoxProps, Flex } from '@chakra-ui/react';

import { Tag } from '../../@types/api/tag';
import { TagButton } from '../TagButton';

interface TagBoxProps extends BoxProps {
  tags: Tag[];
}

export function TagBox({ tags, ...rest }: TagBoxProps) {
  return (
    <Box {...rest}>
      <Flex
        justifyContent={'flex-start'}
        direction={'column'}
        alignItems={'flex-start'}
      >
        <Box p={'0 1rem'}>
          {tags.map(({ id, name, description }) => (
            <TagButton
              key={id}
              tag={name}
              tooltipLabel={description}
              m={'0.25rem'}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
