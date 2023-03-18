import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useNumberInput,
} from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { galleryContext } from '../../context/useGallery';

interface GoToPageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoToPageModal({ isOpen, onClose }: GoToPageModalProps) {
  const { isLoading, actualPage, contentData, onChangePage } =
    useContextSelector(
      galleryContext,
      ({ isLoading, actualPage, contentData, onChangePage }) => ({
        isLoading,
        actualPage,
        contentData,
        onChangePage,
      }),
    );

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: actualPage,
      min: 1,
      max: contentData?.totalContent,
    });

  if (contentData == undefined) {
    return null;
  }

  const { content, totalContent, pageSize } = contentData;

  const totalPages =
    totalContent == 0
      ? Math.ceil(1 / pageSize)
      : Math.ceil(totalContent / pageSize);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  function handleGoToPage() {
    onChangePage(Number(input.value) - actualPage);
    onClose();
  }

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent
          w={'90%'}
          bg={'gray.850'}
          borderRadius={'1rem'}
          as={'form'}
        >
          <ModalHeader>Page Selector</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'0.875rem'}
              padding={{ base: '0.35rem', lg: '1rem 1.75rem' }}
            >
              <Text>
                You are on page {actualPage}/{totalPages || 1}
              </Text>
              <Text>
                There is {content?.length} images in this category and a maximum
                of {pageSize} images per page.
              </Text>

              <HStack maxW="20rem">
                <Button {...dec} color={'black'}>
                  -
                </Button>
                <Input
                  {...input}
                  textAlign={'center'}
                  _focus={{
                    borderColor: 'white',
                  }}
                />
                <Button {...inc} color={'black'}>
                  +
                </Button>
              </HStack>
            </Flex>
          </ModalBody>
          <ModalFooter gap={'1rem'}>
            <Button onClick={onClose} colorScheme={'whiteAlpha'}>
              Close
            </Button>
            <Button
              type="button"
              variant={'primary'}
              onClick={handleGoToPage}
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Go To Page
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
