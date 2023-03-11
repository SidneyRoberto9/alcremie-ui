import { Flex } from '@chakra-ui/react';

import { LabelPageText } from './LabelPageText';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  contentTotalSize: number;
  isLoading: boolean;
  pageSize: number;
  actualPage: number;
  onChangePage: (page: number) => void;
}

export function Pagination({
  pageSize,
  isLoading,
  actualPage,
  onChangePage,
  contentTotalSize,
}: PaginationProps) {
  const totalPages =
    contentTotalSize == 0
      ? Math.ceil(1 / pageSize)
      : Math.ceil(contentTotalSize / pageSize);

  const isLastPage = actualPage === totalPages;

  const disabledNextButton = isLastPage || isLoading;
  const disabledPreviousButton = actualPage == 1 || isLoading;

  function handlePreviousPage() {
    onChangePage(-1);
  }

  function handleNextPage() {
    onChangePage(1);
  }

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
      <PaginationButton
        onClick={handlePreviousPage}
        isDisabled={disabledPreviousButton}
        label={'previous'}
      />

      <LabelPageText label={`${actualPage}/${totalPages || 1}`} />

      <PaginationButton
        onClick={handleNextPage}
        isDisabled={disabledNextButton}
        label={'next'}
      />
    </Flex>
  );
}
