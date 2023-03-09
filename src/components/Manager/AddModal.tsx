import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';

import { tagsContext } from '../../context/useTags';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const createTagSchema = z.object({
  name: z.string().transform((value) => value.toLowerCase()),
  description: z.string(),
  nsfw: z.boolean().optional().default(false),
});

type CreateTagSchema = z.infer<typeof createTagSchema>;

export function AddModal({ isOpen, onClose }: AddModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
  });

  const { createTag, getTags } = useContextSelector(
    tagsContext,
    ({ createTag, getTags }) => ({ createTag, getTags }),
  );

  const toast = useToast();

  async function handleCreateTag({ name, nsfw, description }: CreateTagSchema) {
    try {
      await createTag(name, description, nsfw);
      onClose();
      toast({
        title: 'Tag created!',
        description: 'The tag was created successfully.',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating tag.',
        description: 'Tag Already Exists.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    } finally {
      reset();
      await getTags();
    }
  }

  function handleClose() {
    onClose();
    reset();
  }

  return (
    <>
      <Modal onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent
          bg={'gray.850'}
          borderRadius={'1rem'}
          as={'form'}
          onSubmit={handleSubmit(handleCreateTag)}
        >
          <ModalHeader>Add Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'0.875rem'}
              padding={'1.25rem 1.75rem'}
            >
              <FormControl>
                <FormLabel fontWeight={'bold'}>Name</FormLabel>
                <Input
                  placeholder="Tag Name"
                  type="text"
                  {...register('name')}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight={'bold'}>Description</FormLabel>
                <Textarea
                  spellCheck={false}
                  rows={6}
                  resize={'vertical'}
                  placeholder="Tag Description"
                  {...register('description')}
                />
              </FormControl>

              <InputGroup>
                <Checkbox
                  iconSize="2rem"
                  colorScheme={'whiteAlpha'}
                  {...register('nsfw')}
                >
                  NSFW
                </Checkbox>
              </InputGroup>

              {(errors.description || errors.name) && (
                <Text color={'red'}>Preencha os campos necessários...</Text>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter gap={'1rem'}>
            <Button onClick={handleClose} colorScheme={'whiteAlpha'}>
              Close
            </Button>
            <Button
              type="submit"
              variant={'default'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
