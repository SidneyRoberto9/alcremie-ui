import { Flex, BoxProps, Box } from '@chakra-ui/react';

import { TagButton } from '../TagButton';
import { Tag } from '../../@types/api/tag';

interface TagBoxProps extends BoxProps {
  tags: Tag[];
}

export function TagBox({ tags, ...rest }: TagBoxProps) {
  return (
    <Box {...rest}>
      <Flex justifyContent={'flex-start'} direction={'column'} alignItems={'flex-start'}>
        <Box p={'0 1rem'}>
          {tags.map(({ id, name, description }) => (
            <TagButton
              w={'full'}
              maxW={'18rem'}
              name={name}
              key={id}
              tag={name}
              tooltipLabel={description}
              m={'0.25rem'}
              mr={'0.5rem'}
              noLabel
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}
