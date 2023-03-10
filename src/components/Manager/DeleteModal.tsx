import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';

import { tagsContext } from '../../context/useTags';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagId: string;
}

export function DeleteModal({ isOpen, onClose, tagId }: DeleteModalProps) {
  const { deleteTag, getTags, isLoading } = useContextSelector(
    tagsContext,
    ({ deleteTag, getTags, isLoading }) => ({ deleteTag, getTags, isLoading }),
  );

  const toast = useToast();

  async function handleDeleteTag() {
    try {
      await deleteTag(tagId);
      toast({
        title: 'Tag deleted.',
        description: 'The tag was deleted successfully.',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting tag.',
        description: 'An error occurred while deleting the tag.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    } finally {
      onClose();
      await getTags();
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <>
      <Modal onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent
          w={'80%'}
          bg={'gray.850'}
          borderRadius={'1rem'}
          as={'form'}
        >
          <ModalHeader>Delete Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'0.875rem'}
              padding={{ base: '0.35rem', lg: '1.25rem 1.75rem' }}
            >
              <Text> Are you sure you want to delete this tag? </Text>
            </Flex>
          </ModalBody>
          <ModalFooter gap={'1rem'}>
            <Button onClick={handleClose} colorScheme={'whiteAlpha'}>
              Close
            </Button>
            <Button
              type="button"
              colorScheme={'red'}
              onClick={handleDeleteTag}
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
