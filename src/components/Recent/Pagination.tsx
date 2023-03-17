import { Flex, useDisclosure } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { galleryContext } from '../../context/useGallery';
import { GoToPageModal } from './GoToPageModal';
import { LabelPageText } from './LabelPageText';
import { PaginationButton } from './PaginationButton';

export function Pagination() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pageSize, isLoading, actualPage, onChangePage, contentTotalSize } =
    useContextSelector(
      galleryContext,
      ({
        pageSize,
        isLoading,
        actualPage,
        onChangePage,
        contentTotalSize,
      }) => ({
        pageSize,
        isLoading,
        actualPage,
        onChangePage,
        contentTotalSize,
      }),
    );

  const totalPages =
    contentTotalSize == 0
      ? Math.ceil(1 / pageSize)
      : Math.ceil(contentTotalSize / pageSize);

  const isFirstPage = actualPage == 1;
  const isLastPage = actualPage === totalPages;
  const disabledNextAndLastButton = isLastPage || isLoading;
  const disabledPreviousAndFirstButton = isFirstPage || isLoading;

  function handleFirstPage() {
    onChangePage(-actualPage + 1);
  }

  function handlePreviousPage() {
    onChangePage(-1);
  }

  function handleNextPage() {
    onChangePage(1);
  }

  function handleLastPage() {
    onChangePage(totalPages - actualPage);
  }

  return (
    <>
      <GoToPageModal isOpen={isOpen} onClose={onClose} />
      <Flex
        position={'fixed'}
        bottom={'2%'}
        left={'50vw'}
        transform={'translate(-50%, 0%)'}
        padding={'0.15rem'}
        bg={'gray.800'}
        borderRadius={'8px'}
        direction={'column'}
      >
        <Flex
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <PaginationButton
            onClick={handleFirstPage}
            isDisabled={disabledPreviousAndFirstButton}
            label={'first'}
          />

          <PaginationButton
            onClick={handlePreviousPage}
            isDisabled={disabledPreviousAndFirstButton}
            label={'previous'}
          />

          <LabelPageText
            label={`${actualPage}/${totalPages || 1}`}
            onClick={onOpen}
          />

          <PaginationButton
            onClick={handleNextPage}
            isDisabled={disabledNextAndLastButton}
            label={'next'}
          />

          <PaginationButton
            onClick={handleLastPage}
            isDisabled={disabledNextAndLastButton}
            label={'last'}
          />
        </Flex>
      </Flex>
    </>
  );
}
