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
      bottom={'2%'}
      left={'50vw'}
      transform={'translate(-50%, 0%)'}
      padding={'0.25rem'}
      height={'3rem'}
      bg={'gray.800'}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderRadius={'4px'}
    >
      <Button
        onClick={onPreviousPage}
        isDisabled={disabledPreviousButton}
        width={'5.35rem'}
        minWidth={'5.35rem'}
        borderRadius={'4px'}
        height={'2.35rem'}
        margin={'0.15rem 0.25rem'}
        fontSize={'1rem'}
        fontWeight={'500'}
        cursor={'pointer'}
        textTransform={'capitalize'}
        color={'white'}
        bg={'green.300'}
        transition={'filter 250ms ease-in-out'}
        _hover={{
          filter: 'brightness(0.8)',
        }}
        _disabled={{
          cursor: 'not-allowed',
          filter: 'brightness(0.5)',
        }}
      >
        previous
      </Button>

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
        {`${pageNumber}/${totalPages || 1}`}
      </Text>

      <Button
        onClick={onNextPage}
        isDisabled={disabledNextButton}
        width={'5.35rem'}
        minWidth={'5.35rem'}
        borderRadius={'4px'}
        height={'2.35rem'}
        margin={'0.15rem 0.25rem'}
        fontSize={'1rem'}
        fontWeight={'500'}
        cursor={'pointer'}
        textTransform={'capitalize'}
        color={'white'}
        bg={'green.300'}
        transition={'filter 250ms ease-in-out'}
        _hover={{
          filter: 'brightness(0.8)',
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
