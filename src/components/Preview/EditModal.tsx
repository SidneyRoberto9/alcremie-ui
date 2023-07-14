import { z } from 'zod';
import AsyncSelect from 'react-select/async';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Modal,
  InputGroup,
  Input,
  FormLabel,
  FormControl,
  Flex,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react';
import { createSelectOptionWithTags } from '@/utils/create-select-option';
import { uploadTagStyle } from '@/styles/react-select-tag';
import { api } from '@/server/api';
import { SelectOption } from '@/@types/gallery';
import { ImageDtoWithTags } from '@/@types/api/img';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageDtoWithTags;
  onChangeImageData: (image: ImageDtoWithTags) => void;
}

const editImageSchema = z.object({
  source: z.string(),
  nsfw: z.boolean(),
});

type EditImageSchema = z.infer<typeof editImageSchema>;

export function EditModal({ isOpen, onClose, image, onChangeImageData }: EditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditImageSchema>({
    resolver: zodResolver(editImageSchema),
    defaultValues: {
      source: image.source,
      nsfw: image.isNsfw,
    },
  });

  const toast = useToast();
  const selectedRef = useRef<any>(null);
  const selectedOptions = createSelectOptionWithTags(image.tags);

  async function optionsFromApi(inputValue: string) {
    const { data } = await api.get(`/tag/search?text=${inputValue}`);

    return createSelectOptionWithTags(data.tags);
  }

  async function handleEditImage(data: EditImageSchema) {
    const selectedTagList: String[] = selectedRef.current
      .getValue()
      .map((tag: SelectOption) => tag.value);

    const formData = {
      id: image.id,
      nsfw: data.nsfw,
      source: data.source,
      tags: selectedTagList,
    };

    try {
      const { data } = await api.put<ImageDtoWithTags>('/img/update', formData);
      onChangeImageData(data);
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
        onSubmit={handleSubmit(handleEditImage)}>
        <ModalHeader>Edit Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDirection={'column'}
            alignItems={'flex-start'}
            gap={'0.875rem'}
            padding={{ base: '0.35rem', lg: '1.25rem 1.75rem' }}>
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

              <AsyncSelect
                id={'select-box-3'}
                instanceId={'select-box-3'}
                defaultValue={selectedOptions}
                cacheOptions
                defaultOptions
                loadOptions={optionsFromApi}
                isMulti
                placeholder={'Select your tags'}
                styles={uploadTagStyle}
                closeMenuOnSelect={false}
                ref={selectedRef}
              />
            </FormControl>

            <InputGroup>
              <Checkbox iconSize="2rem" colorScheme={'whiteAlpha'} {...register('nsfw')}>
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
            isDisabled={isSubmitting}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
