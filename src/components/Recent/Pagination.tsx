import { Button, Flex, Text } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { galleryContext } from '../../context/useGallery';

export function Pagination() {
  const {
    contentTotalSize,
    isLoading,
    pageSize,
    pageNumber,
    onNextPage,
    onPreviousPage,
  } = useContextSelector(
    galleryContext,
    ({
      contentTotalSize,
      isLoading,
      pageSize,
      pageNumber,
      onNextPage,
      onPreviousPage,
    }) => ({
      contentTotalSize,
      isLoading,
      pageSize,
      pageNumber,
      onNextPage,
      onPreviousPage,
    }),
  );

  const totalPages =
    contentTotalSize == 0
      ? Math.ceil(1 / pageSize)
      : Math.ceil(contentTotalSize / pageSize);

  const isLastPage = pageNumber === totalPages;

  const disabledNextButton = isLastPage || isLoading;
  const disabledPreviousButton = pageNumber == 1 || isLoading;

  return (
    <Flex
      position={'fixed'}
      bottom={'1.25rem'}
      left={'50%'}
      width={'15rem'}
      height={'2.5rem'}
      transform={'translate(-50%, 0%)'}
      bg={'gray.500'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'4px'}
    >
      <Button
        onClick={onPreviousPage}
        isDisabled={disabledPreviousButton}
        outline={'none'}
        border={'none'}
        width={'5.35rem'}
        borderRadius={'4px'}
        height={'2.35rem'}
        margin={'0.15rem'}
        fontSize={'1rem'}
        fontWeight={'500'}
        color={'green.300'}
        bg={'gray.700'}
        transition={'filter 200ms ease-in-out'}
        cursor={'pointer'}
        textTransform={'capitalize'}
        _hover={{
          filter: 'brightness(0.7)',
        }}
        _disabled={{
          cursor: 'not-allowed',
          filter: 'brightness(0.5)',
        }}
      >
        previous
      </Button>

      <Text
        display={'block'}
        padding={'0.375rem 0.75rem'}
        fontSize={'1.25rem'}
        color={'white.900'}
        lineHeight={'1.5'}
        userSelect={'none'}
        pointerEvents={'none'}
      >
        {`${pageNumber}/${totalPages || 1}`}
      </Text>

      <Button
        onClick={onNextPage}
        isDisabled={disabledNextButton}
        outline={'none'}
        border={'none'}
        width={'5.35rem'}
        borderRadius={'4px'}
        height={'2.35rem'}
        margin={'0.15rem'}
        fontSize={'1rem'}
        fontWeight={'500'}
        color={'green.300'}
        bg={'gray.700'}
        transition={'filter 200ms ease-in-out'}
        cursor={'pointer'}
        textTransform={'capitalize'}
        _hover={{
          filter: 'brightness(0.7)',
        }}
        _disabled={{
          cursor: 'not-allowed',
          filter: 'brightness(0.5)',
        }}
      >
        next
      </Button>
    </Flex>
  );
}
