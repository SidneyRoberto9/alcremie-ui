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
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { z } from 'zod';

import { ImageDtoWithTags } from '../../@types/api/img';
import { Tag } from '../../@types/api/tag';
import { SelectOption } from '../../@types/gallery';
import { api } from '../../server/api';
import { uploadTagStyle } from '../../styles/react-select-tag';
import { Capitalize } from '../../utils/captalize';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageDtoWithTags;
  tags: Tag[];
}

const editImageSchema = z.object({
  source: z.string(),
  nsfw: z.boolean(),
});

type EditImageSchema = z.infer<typeof editImageSchema>;

export function EditModal({ isOpen, onClose, image, tags }: EditModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditImageSchema>({
    resolver: zodResolver(editImageSchema),
    defaultValues: {
      source: image.source,
      nsfw: image.isNsfw,
    },
  });
  const toast = useToast();
  const router = useRouter();

  const selectedRef = useRef<any>(null);
  const options: SelectOption[] = tags.map((tag) => {
    return { value: String(tag.id), label: Capitalize(tag.name) };
  });

  const selectedOptions: SelectOption[] = image.tags.map((tag) => {
    return { value: String(tag.id), label: Capitalize(tag.name) };
  });

  async function handleEditImage(data: EditImageSchema) {
    const formData = {
      source: data.source,
      nsfw: data.nsfw,
      tags: selectedRef.current
        .getValue()
        .map((tag: SelectOption) => tag.value),
      id: image.id,
    };

    try {
      await api.put('/img/update', formData);
      onClose();
      toast({
        title: 'Image updated.',
        description: 'Image updated successfully.',
        status: 'success',
        duration: 3500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'An error occurred while updating the image.',
        status: 'error',
        duration: 3500,
        isClosable: true,
      });
    } finally {
      reset();
      router.reload();
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <Modal onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />

      <ModalContent
        w={'80%'}
        bg={'gray.850'}
        borderRadius={'1rem'}
        as={'form'}
        onSubmit={handleSubmit(handleEditImage)}
      >
        <ModalHeader>Edit Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'0.875rem'}
            padding={{ base: '0.35rem', lg: '1.25rem 1.75rem' }}
          >
            <FormControl width={'100%'}>
              <FormLabel fontWeight={'bold'}>Source</FormLabel>
              <Input
                _focusVisible={{
                  borderColor: 'inherit',
                }}
                type="text"
                {...register('source')}
              />
            </FormControl>
            <FormControl width={'100%'}>
              <FormLabel fontWeight={'bold'}>Select your tags</FormLabel>

              <ReactSelect
                id={'select-box-3'}
                instanceId={'select-box-3'}
                defaultValue={selectedOptions}
                options={options}
                isMulti
                placeholder={'Select your tags'}
                styles={uploadTagStyle}
                closeMenuOnSelect={false}
                ref={selectedRef}
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
          </Flex>
        </ModalBody>
        <ModalFooter gap={'1rem'}>
          <Button onClick={handleClose} colorScheme={'whiteAlpha'}>
            Close
          </Button>
          <Button
            variant={'primary'}
            type={'submit'}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
