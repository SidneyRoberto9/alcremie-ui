import { useContextSelector } from 'use-context-selector';
import { useState, useEffect, useCallback } from 'react';
import { Trash, Eye } from 'phosphor-react';
import { useRouter } from 'next/router';

import {
  Tr,
  Thead,
  Th,
  Text,
  Td,
  Tbody,
  TableContainer,
  Table,
  CircularProgress,
  Center,
  Button,
  Box,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import {
  PaginationPrevious,
  PaginationNext,
  PaginationContainer,
  Pagination,
  usePagination,
} from '@ajna/pagination';
import { Capitalize } from '@/utils/captalize';
import { tagsContext } from '@/context/useTags';
import { LoadingScreen } from '@/components/Screens/LoadingScreen';
import { DeleteModal } from '@/components/Manager/DeleteModal';
import { TagPaginationButton } from '@/components/Manager/tag/TagPaginationButton';

export function TagsTable({ isAdmin = false }) {
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const [isLessThan680] = useMediaQuery('(max-width: 680px)');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [tagId, setTagId] = useState<string | null>(null);
  const router = useRouter();

  const { data, isLoading, onChangePage, totalTags } = useContextSelector(
    tagsContext,
    ({ isLoading, createTag, data, deleteTag, onChangePage, totalTags }) => ({
      isLoading,
      totalTags,
      data,
      createTag,
      deleteTag,
      onChangePage,
    }),
  );

  const { pagesCount, currentPage, setCurrentPage, isDisabled, setPageSize } = usePagination({
    total: totalTags,
    limits: {
      outer: 1,
      inner: 1,
    },
    initialState: {
      pageSize: 15,
      isDisabled: false,
      currentPage: 1,
    },
  });

  const onDelete = useCallback(
    (id: string) => {
      setTagId(id);
      onOpenDelete();
    },
    [tagId],
  );

  const handlePageChange = (nextPage: number): void => {
    onChangePage(nextPage);
    setCurrentPage(nextPage);
  };

  function handleNavigateToTag(tag: string) {
    router.push(`/recent?include_tags=${tag}`);
  }

  const isLastPage = currentPage == totalTags / 10;
  const isFirstPage = currentPage == 0;
  const isFirstPageIndex = currentPage == 1;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <>
      <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} tagId={String(tagId)} />
      <TableContainer
        padding={'2rem'}
        margin={'0 3rem'}
        bg={'gray.850'}
        borderRadius={'1rem'}
        minH={'34rem'}
        h={'34rem'}
        maxH={'34rem'}>
        {isLoading ? (
          <Center h={'25.375rem'}>
            <CircularProgress isIndeterminate color={'green.300'} size={150} />
          </Center>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color={'gray.450'} width={'40rem'}>
                  Name
                </Th>
                <Th color={'gray.450'}>Description</Th>
                <Th color={'gray.450'}>Quantity</Th>
                <Th color={'gray.450'}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ id, name, description, image_size }) => (
                <Tr key={id}>
                  <Td>{Capitalize(name)}</Td>
                  <Td textOverflow={'ellipsis'}>{description}</Td>
                  <Td>{image_size}</Td>
                  <Td>
                    <Button
                      colorScheme={'linkedin'}
                      p={0}
                      mx={2}
                      onClick={() => handleNavigateToTag(String(name))}>
                      <Eye size={24} />
                    </Button>
                    {isAdmin && (
                      <Button colorScheme={'red'} p={0} mx={2} onClick={() => onDelete(String(id))}>
                        <Trash size={24} />
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Box display={'flex'} justifyContent={'center'} mt={10} position={'relative'}>
          <Box
            py={'0.25rem'}
            display={'flex'}
            gap={'0.75rem'}
            position={'absolute'}
            left={'0.75rem'}
            bottom={'0.25rem'}>
            <Text color={'gray.450'} display={'flex'} gap={'0.75rem'}>
              Total Tags: <Text color={'white'}> {totalTags}</Text>
            </Text>
            <Text color={'gray.450'} display={'flex'} gap={'0.75rem'}>
              Actual Page: <Text color={'white'}> {currentPage - 1}</Text>
            </Text>
          </Box>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={handlePageChange}>
            <PaginationContainer
              w={'7.5rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              <TagPaginationButton
                label="First"
                onClick={() => handlePageChange(1)}
                named
                isDisabled={isFirstPageIndex}
              />
              <TagPaginationButton label="<" component={PaginationPrevious} disabled={isLoading} />
              <TagPaginationButton label={isFirstPage ? currentPage : `${currentPage - 1}`} />
              <TagPaginationButton label={currentPage} />
              <TagPaginationButton label={isLastPage ? currentPage : `${currentPage + 1}`} />
              <TagPaginationButton label=">" component={PaginationNext} disabled={isLoading} />
              <TagPaginationButton
                label="Last"
                onClick={() => handlePageChange(totalTags / 10)}
                named
                isDisabled={isLastPage || isLoading}
              />
            </PaginationContainer>
          </Pagination>
        </Box>
      </TableContainer>
    </>
  ) : (
    <LoadingScreen isLoading />
  );
}
